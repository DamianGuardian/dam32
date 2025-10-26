import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  Pressable,
  StatusBar,
  Platform,
} from "react-native";

import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import SyncBadge from "../components/SyncBadge";

import { fetchPostsPage } from "../services/api";
import { loadPosts, savePosts } from "../storage/local";
import { processQueue, mergeRemoteFirstPage, tryOnline } from "../sync/syncManager";

import ws from "../styles/screens.list";

export default function PostsListScreen({ nav }) {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [compact, setCompact] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [syncState, setSyncState] = useState("synced");
  const [online, setOnline] = useState(true);

  // Conflictos (para el modal)
  const [conflictBanner, setConflictBanner] = useState(false);
  const [conflicts, setConflicts] = useState([]);
  const [conflictsVisible, setConflictsVisible] = useState(false);

  const LIMIT = 15;

  useEffect(() => {
    (async () => {
      const loc = await loadPosts();
      setPosts(loc);
      setLoading(false);

      setOnline(await tryOnline());
      await processQueue(setSyncState);

      const { merged, conflicts: found } = await mergeRemoteFirstPage();
      setPosts(merged);
      setConflicts(found);
      setConflictBanner(found.length > 0);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.author || "").toLowerCase().includes(q)
    );
  }, [query, posts]);

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const next = await fetchPostsPage(page, LIMIT);
      const merged = [...posts];
      next.forEach((n) => {
        if (!merged.find((p) => p.id === n.id)) merged.push(n);
      });
      setPosts(merged);
      await savePosts(merged);
      setPage(page + 1);
    } catch {
      Alert.alert("Error de red", "No se pudieron cargar más posts.");
    } finally {
      setLoading(false);
    }
  }, [loading, page, posts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const first = await fetchPostsPage(1, LIMIT);
      setPosts(first);
      await savePosts(first);
      setPage(2);
    } catch {
      Alert.alert("Modo offline", "Mostrando lo último guardado.");
    } finally {
      setRefreshing(false);
    }
  }, []);

  const statusBarSpacer = Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) : 0;

  return (
    <SafeAreaView style={ws.container}>
      {/* Barra de estado translúcida y espacio para evitar solape del header */}
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <View style={{ height: statusBarSpacer }} />

      <View style={ws.topBar}>
        <Text style={ws.title}>Posts</Text>
        <SyncBadge state={syncState} />
      </View>

      {conflictBanner && (
        <Pressable onPress={() => setConflictsVisible(true)}>
          <Text style={ws.conflict}>⚠ Se resolvieron conflictos por LWW (tocar para ver)</Text>
        </Pressable>
      )}

      <View style={ws.controls}>
        <SearchBar value={query} onChangeText={setQuery} />
        <View style={ws.switchRow}>
          <Text style={ws.switchLabel}>Compact</Text>
          <Switch value={compact} onValueChange={setCompact} />
        </View>
        <TouchableOpacity style={ws.btn} onPress={() => nav.openEditor()}>
          <Text style={ws.btnText}>Nuevo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => (
          <PostCard item={item} compact={compact} onPress={(p) => nav.openDetail(p)} />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={loading ? <ActivityIndicator style={{ marginVertical: 16 }} /> : null}
        ListEmptyComponent={!loading && <Text style={ws.empty}>No hay posts</Text>}
        contentContainerStyle={{ paddingBottom: 24 }}
      />

      {!online && (
        <Text style={ws.offline}>Estás offline. Los cambios se sincronizarán luego.</Text>
      )}

      {/* Modal de conflictos */}
      <Modal
        visible={conflictsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setConflictsVisible(false)}
      >
        <View style={ws.modalBackdrop}>
          <View style={ws.modalCard}>
            <Text style={ws.modalTitle}>Conflictos resueltos (LWW)</Text>
            <FlatList
              data={conflicts}
              keyExtractor={(c) => String(c.id)}
              renderItem={({ item }) => (
                <View style={ws.conflictItem}>
                  <Text style={ws.conflictId}>ID {item.id}</Text>
                  <Text style={ws.conflictLabel}>Local</Text>
                  <Text style={ws.conflictText} numberOfLines={2}>
                    {item.local?.title}
                  </Text>
                  <Text style={ws.conflictLabel}>Remoto</Text>
                  <Text style={ws.conflictText} numberOfLines={2}>
                    {item.remote?.title}
                  </Text>
                  <Text style={ws.conflictLabel}>Ganador</Text>
                  <Text style={ws.conflictWinner} numberOfLines={2}>
                    {item.winner?.title}
                  </Text>
                </View>
              )}
              ListEmptyComponent={<Text style={ws.empty}>No hubo conflictos.</Text>}
            />
            <TouchableOpacity style={ws.btn} onPress={() => setConflictsVisible(false)}>
              <Text style={ws.btnText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}