import AsyncStorage from "@react-native-async-storage/async-storage";

const K_POSTS = "cache:posts:v1";
const K_QUEUE = "cache:queue:v1";

export async function loadPosts() {
  const raw = await AsyncStorage.getItem(K_POSTS);
  return raw ? JSON.parse(raw) : [];
}
export async function savePosts(posts) {
  await AsyncStorage.setItem(K_POSTS, JSON.stringify(posts));
}
export async function loadQueue() {
  const raw = await AsyncStorage.getItem(K_QUEUE);
  return raw ? JSON.parse(raw) : [];
}
export async function saveQueue(q) {
  await AsyncStorage.setItem(K_QUEUE, JSON.stringify(q));
}