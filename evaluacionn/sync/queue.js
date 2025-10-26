import { loadQueue, saveQueue } from "../storage/local";

export async function enqueue(opItem) {
  const q = await loadQueue();
  q.push({ ...opItem, status: "pending", ts: Date.now(), attempt: 0 });
  await saveQueue(q);
  return q;
}

export function hasConflict(localPost, remotePost) {
  if (!localPost || !remotePost) return false;

  return new Date(localPost.updatedAt) > new Date(remotePost.updatedAt);
}

export function applyLWW(local, incoming) {

  return new Date(local.updatedAt) >= new Date(incoming.updatedAt) ? local : incoming;
}