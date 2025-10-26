import { createRemote, updateRemote, deleteRemote, fetchPostsPage } from "../services/api";
import { loadPosts, savePosts, loadQueue, saveQueue } from "../storage/local";
import { applyLWW } from "./queue";

export async function tryOnline() {
  try {
    const p = await fetchPostsPage(1, 1);
    return Array.isArray(p);
  } catch {
    return false;
  }
}

export async function processQueue(setSyncState) {
  let queue = await loadQueue();
  if (!queue.length) {
    setSyncState?.("synced");
    return;
  }

  setSyncState?.("syncing");

  const posts = await loadPosts();
  const nextQueue = [];

  for (const item of queue) {
    try {
      if (item.op === "create") {
        const synced = await createRemote(item.post);
        const idx = posts.findIndex((p) => p.id === item.post.id);
        if (idx >= 0) posts[idx] = { ...synced, _status: "synced" };
      } else if (item.op === "update") {
        const synced = await updateRemote(item.post);
        const idx = posts.findIndex((p) => p.id === item.post.id);
        if (idx >= 0) posts[idx] = { ...applyLWW(posts[idx], synced), _status: "synced" };
      } else if (item.op === "delete") {
        await deleteRemote(item.id);
        const idx = posts.findIndex((p) => p.id === item.id);
        if (idx >= 0) posts.splice(idx, 1);
      }
    } catch (e) {

      nextQueue.push({
        ...item,
        status: "error",
        attempt: (item.attempt ?? 0) + 1,
        error: String(e),
      });
    }
  }

  await savePosts(posts);
  await saveQueue(nextQueue);
  setSyncState?.(nextQueue.length ? "pending" : "synced");
}

export async function mergeRemoteFirstPage() {
  const [remote, local] = await Promise.all([fetchPostsPage(1, 20), loadPosts()]);
  const map = new Map(local.map((p) => [p.id, p]));
  const conflicts = [];

  for (const r of remote) {
    if (map.has(r.id)) {
      const l = map.get(r.id);
      // Si timestamps difieren, registramos conflicto y aplicamos LWW
      if (new Date(l.updatedAt).toISOString() !== new Date(r.updatedAt).toISOString()) {
        const winner = applyLWW(l, r);
        conflicts.push({ id: r.id, local: l, remote: r, winner });
        map.set(r.id, winner);
      } else {
        map.set(r.id, l);
      }
    } else {
      map.set(r.id, r);
    }
  }

  const merged = Array.from(map.values());
  await savePosts(merged);
  return { merged, conflicts };
}