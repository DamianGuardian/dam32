
const API_BASE = "https://jsonplaceholder.typicode.com";

export async function fetchPosts(page = 1, limit = 10) {
  const res = await fetch(`${API_BASE}/posts`);
  const all = await res.json();

  // Paginación fake en cliente porque jsonplaceholder no pagina
  const start = (page - 1) * limit;
  const slice = all.slice(start, start + limit);

  // Mapear a formato interno uniforme
  const normalized = slice.map(p => ({
    id: String(p.id),
    title: p.title,
    body: p.body,
    author: `user-${p.userId}`,
    updatedAt: Date.now() // jsonplaceholder no da timestamps reales
  }));

  return { items: normalized, hasMore: start + limit < all.length };
}

// Obtiene un solo post
export async function fetchPostById(id) {
  const res = await fetch(`${API_BASE}/posts/${id}`);
  const p = await res.json();
  return {
    id: String(p.id),
    title: p.title,
    body: p.body,
    author: `user-${p.userId}`,
    updatedAt: Date.now()
  };
}

// Estas llamadas "simulan" create / update / delete.
// En una API real harías POST/PUT/DELETE y obtendrías la versión final del servidor.
export async function createRemotePost(draft) {
  const res = await fetch(`${API_BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft)
  });
  const p = await res.json();
  return {
    ...draft,
    id: String(p.id || draft.id),
    updatedAt: Date.now()
  };
}

export async function updateRemotePost(post) {
  const res = await fetch(`${API_BASE}/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post)
  });
  const p = await res.json();
  return {
    ...post,
    ...p,
    id: String(post.id),
    updatedAt: Date.now()
  };
}

export async function deleteRemotePost(id) {
  await fetch(`${API_BASE}/posts/${id}`, { method: "DELETE" });
  return true;
}
