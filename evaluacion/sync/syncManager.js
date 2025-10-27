
import {
  fetchPosts,
  createRemotePost,
  updateRemotePost,
  deleteRemotePost
} from "../api/api";
import {
  loadQueue,
  saveQueue,
  loadPostsLocal,
  savePostsLocal
} from "../storage/local";
import { markPostSynced, overwriteLocalPosts } from "./queue";

// Intenta hacer fetch a internet. Si truena => offline
async function hasConnection() {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts?_limit=1");
    return true;
  } catch (err) {
    return false;
  }
}

// Sube cambios locales pendientes al servidor
async function flushQueue() {
  let queue = await loadQueue();
  if (queue.length === 0) return;

  // procesar en orden FIFO
  const newQueue = [];
  for (const item of queue) {
    const { op, post } = item;
    try {
      if (op === "create") {
        const serverVersion = await createRemotePost(post);
        await markPostSynced(post.id, serverVersion);
      } else if (op === "update") {
        const serverVersion = await updateRemotePost(post);
        await markPostSynced(post.id, serverVersion);
      } else if (op === "delete") {
        await deleteRemotePost(post.id);
        // marca como borrado definitivo
        await markPostSynced(post.id, { _deleted: true });
      }
    } catch (err) {
      // si falla, se queda en cola
      newQueue.push(item);
    }
  }

  queue = newQueue;
  await saveQueue(queue);
}

// Baja posts del servidor y los fusiona con los locales usando LWW.
function lwwMerge(localPosts, remotePosts) {
  const map = new Map();

  // primero local
  for (const p of localPosts) {
    map.set(p.id, { ...p });
  }

  // luego remoto
  for (const r of remotePosts) {
    if (!map.has(r.id)) {
      map.set(r.id, { ...r, syncStatus: "synced" });
      continue;
    }
    const cur = map.get(r.id);
    // conflicto -> gana updatedAt más reciente
    if ((r.updatedAt || 0) >= (cur.updatedAt || 0)) {
      map.set(r.id, { ...cur, ...r, syncStatus: "synced" });
    } else {
      // local es más nuevo -> mantenemos local con pending si no synced
      map.set(r.id, { ...cur });
    }
  }

  // remover los que estén marcados _deleted
  const merged = Array.from(map.values()).filter(p => !p._deleted);
  // ordenar por updatedAt desc
  merged.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  return merged;
}

// Sincroniza todo: cola -> servidor -> merge
export async function syncAll({ pageSize = 10, maxPages = 2 } = {}) {
  const online = await hasConnection();
  if (!online) {
    return {
      status: "offline",
      posts: await loadPostsLocal()
    };
  }

  // 1. sube cola
  await flushQueue();

  // 2. baja posts remotos (varias páginas si quieres más items en cache)
  let remoteAll = [];
  for (let page = 1; page <= maxPages; page++) {
    const { items } = await fetchPosts(page, pageSize);
    remoteAll = remoteAll.concat(items);
  }

  // 3. merge con local
  const localBefore = await loadPostsLocal();
  const merged = lwwMerge(localBefore, remoteAll);

  await overwriteLocalPosts(merged);

  return {
    status: "synced",
    posts: merged
  };
}

// Helper para actualizar estado visual de un post a "syncing" antes de flush
export async function markSyncing(idList) {
  const posts = await loadPostsLocal();
  const updated = posts.map(p =>
    idList.includes(p.id)
      ? { ...p, syncStatus: "syncing" }
      : p
  );
  await savePostsLocal(updated);
  return updated;
}
