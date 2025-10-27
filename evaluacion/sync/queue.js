
import { loadQueue, saveQueue, loadPostsLocal, savePostsLocal } from "../storage/local";

export async function enqueueOperation(op, post) {
  const queue = await loadQueue();
  const ts = Date.now();

  queue.push({
    op,           
    post,          
    ts            
  });

  await saveQueue(queue);

  // reflejar estado pending en el cache local
  const posts = await loadPostsLocal();
  let updated = posts;

  if (op === "delete") {
    // marcamos como deleted localmente (optimista)
    updated = posts.map(p =>
      p.id === post.id
        ? { ...p, _deleted: true, syncStatus: "pending", updatedAt: ts }
        : p
    );
  } else {
    // create or update
    const exists = posts.find(p => p.id === post.id);
    if (exists) {
      updated = posts.map(p =>
        p.id === post.id
          ? { ...p, ...post, syncStatus: "pending", updatedAt: ts }
          : p
      );
    } else {
      updated = [
        ...posts,
        { ...post, syncStatus: "pending", updatedAt: ts }
      ];
    }
  }

  await savePostsLocal(updated);
  return updated;
}

// Marca un post como sync completado (synced)
export async function markPostSynced(postId, serverVersion) {
  const posts = await loadPostsLocal();
  const merged = posts
    .filter(p => !(p.id === postId && serverVersion._deleted)) // si servidor confirmó delete, lo quitamos
    .map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        ...serverVersion,
        syncStatus: "synced"
      };
    });

  await savePostsLocal(merged);
}

// Reemplaza toda la lista local (por ejemplo después de sync full)
export async function overwriteLocalPosts(newPosts) {
  await savePostsLocal(newPosts);
}
