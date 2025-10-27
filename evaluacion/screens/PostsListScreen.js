
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { globalStyles, colors } from "../styles/styles";

import { loadPostsLocal } from "../storage/local";
import { syncAll } from "../sync/syncManager";
import SearchBar from "../components/SearchBar";
import PostItem from "../components/PostItem";

export default function PostsListScreen({ navigation }) {
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [query, setQuery] = useState("");
  const [syncStatusMsg, setSyncStatusMsg] = useState("Cargando...");
  const [page, setPage] = useState(1);
  const [hasMoreLocal, setHasMoreLocal] = useState(true);
  const PAGE_SIZE = 10;

  // carga inicial inmediata (cache local)
  useEffect(() => {
    (async () => {
      const cached = await loadPostsLocal();
      setAllPosts(cached);
      setVisiblePosts(cached.slice(0, PAGE_SIZE));
      setHasMoreLocal(cached.length > PAGE_SIZE);
    })();
  }, []);

  // sincroniza con el servidor al montar
  useEffect(() => {
    (async () => {
      setSyncStatusMsg("Sincronizando...");
      const result = await syncAll({ pageSize: PAGE_SIZE, maxPages: 5 });
      setSyncStatusMsg(
        result.status === "offline"
          ? "Sin conexión (mostrando caché)"
          : "Sincronizado"
      );

      const updated = result.posts;
      setAllPosts(updated);
      setVisiblePosts(updated.slice(0, PAGE_SIZE));
      setHasMoreLocal(updated.length > PAGE_SIZE);
      setPage(1);
    })();
  }, []);

  // búsqueda local en memoria
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q === "") {
      const slice = allPosts.slice(0, PAGE_SIZE * page);
      setVisiblePosts(slice);
      setHasMoreLocal(slice.length < allPosts.length);
      return;
    }

    const filtered = allPosts.filter(
      p =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.author || "").toLowerCase().includes(q)
    );
    setVisiblePosts(filtered);
    setHasMoreLocal(false);
  }, [query, allPosts, page]);

  const loadMore = useCallback(() => {
    if (query !== "") return; // no paginar cuando hay filtro
    if (!hasMoreLocal) return;

    const nextPage = page + 1;
    const slice = allPosts.slice(0, PAGE_SIZE * nextPage);

    setVisiblePosts(slice);
    setPage(nextPage);
    setHasMoreLocal(slice.length < allPosts.length);
  }, [page, hasMoreLocal, allPosts, query]);

  const onRefresh = useCallback(async () => {
    setSyncStatusMsg("Sincronizando...");
    const result = await syncAll({ pageSize: PAGE_SIZE, maxPages: 5 });
    setSyncStatusMsg(
      result.status === "offline"
        ? "Sin conexión (mostrando caché)"
        : "Sincronizado"
    );
    const updated = result.posts;
    setAllPosts(updated);
    setVisiblePosts(updated.slice(0, PAGE_SIZE));
    setHasMoreLocal(updated.length > PAGE_SIZE);
    setPage(1);
  }, []);

  return (
    <View style={[globalStyles.container, { paddingBottom: 12 }]}>
      {/* Barra superior */}
      <View style={[globalStyles.headerBar, { paddingHorizontal: 0 }]}>
        <View style={globalStyles.rowBetween}>
          <Text style={globalStyles.headerTitle}>Publicaciones</Text>

          <TouchableOpacity
            style={globalStyles.buttonPrimary}
            onPress={() =>
              navigation.navigate("edit", {
                mode: "create"
              })
            }
          >
            <Text style={globalStyles.buttonPrimaryText}>Nuevo</Text>
          </TouchableOpacity>
        </View>

        <Text style={globalStyles.statusText}>{syncStatusMsg}</Text>
      </View>

      <SearchBar query={query} onChange={setQuery} />

      <FlatList
        data={visiblePosts.filter(p => !p._deleted)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PostItem
            post={item}
            onPress={() =>
              navigation.navigate("detail", {
                postId: item.id
              })
            }
          />
        )}
        onEndReachedThreshold={0.3}
        onEndReached={loadMore}
        refreshControl={
          <RefreshControl
            tintColor={colors.primary}
            refreshing={false}
            onRefresh={onRefresh}
          />
        }
        ListFooterComponent={
          hasMoreLocal ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : null
        }
      />
    </View>
  );
}
