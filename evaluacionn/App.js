import React, { useEffect, useState, useCallback } from "react";
import { Alert } from "react-native";

import PostsListScreen from "./screens/PostsListScreen";
import PostDetailScreen from "./screens/PostDetailScreen";
import PostEditScreen from "./screens/PostEditScreen";

import { loadPosts, savePosts } from "./storage/local";
import { enqueue } from "./sync/queue";
import { processQueue, tryOnline } from "./sync/syncManager";


function useAppRouter() {
  const [route, setRoute] = useState({ name: "list", params: null });

  const goList = useCallback(() => {
    setRoute({ name: "list", params: null });
  }, []);

  const openDetail = useCallback((post) => {
    setRoute({ name: "detail", params: { post } });
  }, []);

  const openEditor = useCallback((post) => {
    setRoute({ name: "edit", params: { post } });
  }, []);

  const cancelEdit = useCallback(() => {
    setRoute({ name: "list", params: null });
  }, []);

  return {
    route,
    goList,
    openDetail,
    openEditor,
    cancelEdit,
    setRoute, 
  };
}


function usePostsStore(setSyncStateExternal) {
  const [posts, setPosts] = useState([]);
  const [syncState, setSyncState] = useState("synced");


  useEffect(() => {
    (async () => {
      const stored = await loadPosts();
      setPosts(stored || []);
    })();
  }, []);

  
  useEffect(() => {
    if (typeof setSyncStateExternal === "function") {
      setSyncStateExternal(syncState);
    }
  }, [syncState, setSyncStateExternal]);


  const flushIfOnline = useCallback(async () => {
    if (await tryOnline()) {
      await processQueue(setSyncState);
    }
  }, []);


  const upsertPost = useCallback(
    async (patch) => {
      const draft = [...posts];
      const idx = draft.findIndex((p) => p.id === patch.id);

      if (idx >= 0) {
        draft[idx] = { ...draft[idx], ...patch, _status: "pending" };
      } else {
        draft.unshift({ ...patch, _status: "pending" });
      }

      setPosts(draft);
      await savePosts(draft);

      await enqueue({
        op: idx >= 0 ? "update" : "create",
        post: patch,
      });

      await flushIfOnline();
    },
    [posts, flushIfOnline]
  );


  const removePost = useCallback(
    async (postId) => {
      const filtered = posts.filter((p) => p.id !== postId);
      setPosts(filtered);
      await savePosts(filtered);

      await enqueue({
        op: "delete",
        id: postId,
      });

      await flushIfOnline();
    },
    [posts, flushIfOnline]
  );

  return {
    posts,
    syncState,
    upsertPost,
    removePost,
    setPosts, 
  };
}

function AppRoot() {
  const [visibleSyncState, setVisibleSyncState] = useState("synced");


  const {
    route,
    goList,
    openDetail,
    openEditor,
    cancelEdit,
  } = useAppRouter();


  const {
    posts,
    upsertPost,
    removePost,
    syncState,
  } = usePostsStore(setVisibleSyncState);


  const nav = {
    goList,
    openDetail,
    openEditor,
    cancelEdit,

    savePost: async (patch) => {
      await upsertPost(patch);
      goList();
    },

    deletePost: async (post) => {
      Alert.alert(
        "Eliminar",
        "¿Seguro que deseas eliminar este post?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            style: "destructive",
            onPress: async () => {
              await removePost(post.id);
              goList();
            },
          },
        ]
      );
    },
  };


  switch (route.name) {
    case "detail":
      return (
        <PostDetailScreen
          post={route.params?.post}
          nav={nav}
          syncState={visibleSyncState}
        />
      );

    case "edit":
      return (
        <PostEditScreen
          post={route.params?.post}
          nav={nav}
          syncState={visibleSyncState}
        />
      );

    default:
    
      return (
        <PostsListScreen
          posts={posts}
          nav={nav}
          syncState={visibleSyncState}
        />
      );
  }
}

export default function App() {
  return <AppRoot />;
}
