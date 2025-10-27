
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_POSTS = "posts_cache_v1";
const KEY_QUEUE = "sync_queue_v1";

export async function loadPostsLocal() {
  const raw = await AsyncStorage.getItem(KEY_POSTS);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function savePostsLocal(posts) {
  await AsyncStorage.setItem(KEY_POSTS, JSON.stringify(posts));
}

// Cola de operaciones pendientes [{op: 'create'|'update'|'delete', post, ts}]
export async function loadQueue() {
  const raw = await AsyncStorage.getItem(KEY_QUEUE);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveQueue(queue) {
  await AsyncStorage.setItem(KEY_QUEUE, JSON.stringify(queue));
}
