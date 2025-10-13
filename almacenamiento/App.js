import React, { useEffect, useMemo, useState, useCallback } from "react";
import {SafeAreaView,View,Text,FlatList,ActivityIndicator,TextInput,RefreshControl,Linking,TouchableOpacity,StatusBar,Alert,Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const CACHE_USERS_KEY = "cache:users";
const PREF_COMPACT_KEY = "pref:compact";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [compactMode, setCompactMode] = useState(false);
  const [showCacheBadge, setShowCacheBadge] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [pref, cached] = await Promise.all([
          AsyncStorage.getItem(PREF_COMPACT_KEY),
          AsyncStorage.getItem(CACHE_USERS_KEY),
        ]);
        if (pref !== null) setCompactMode(pref === "true");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) {
            setUsers(parsed);
            setShowCacheBadge(true);
          }
        }
      } catch {
      } finally {
        fetchUsers();
      }
    })();
  }, []);

  const persistPreference = async (value) => {
    try {
      await AsyncStorage.setItem(PREF_COMPACT_KEY, String(value));
    } catch {
      Alert.alert(
        "No se pudo guardar",
        "La preferencia no se guardó correctamente. Debe conectarse a internet nuevamente e intentarlo otra vez."
      );
    }
  };

  const onToggleCompact = async () => {
    const next = !compactMode;
    setCompactMode(next);
    await persistPreference(next);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      setShowCacheBadge(false);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setUsers(data);

      try {
        await AsyncStorage.setItem(CACHE_USERS_KEY, JSON.stringify(data));
      } catch {
        Alert.alert(
          "No se pudo guardar",
          "Los datos no se guardaron correctamente. Debe conectarse a internet nuevamente e intentarlo otra vez."
        );
      }
    } catch (e) {
      setError(e?.message ?? "Error al obtener usuarios");
      try {
        const cached = await AsyncStorage.getItem(CACHE_USERS_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) {
            setUsers(parsed);
            setShowCacheBadge(true);
          }
        }
      } catch {
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await fetchUsers();
    } finally {
      setRefreshing(false);
    }
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      [u.name, u.username, u.email, u.phone, u.website, u?.address?.city]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [users, query]);

  const renderItem = ({ item }) => {
    const addr = item.address
      ? `${item.address.street}, ${item.address.suite}, ${item.address.city}`
      : "—";
    return (
      <View style={[styles.card, compactMode && styles.cardCompact]}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>@{item.username}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Correo: </Text>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.email}`)}>
            <Text style={styles.link}>{item.email}</Text>
          </TouchableOpacity>
        </View>

        {!compactMode && (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Tel: </Text>
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone}`)}>
                <Text style={styles.text}>{item.phone}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Web: </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    item.website.startsWith("http")
                      ? item.website
                      : `https://${item.website}`
                  )
                }
              >
                <Text style={styles.link}>{item.website}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Ciudad: </Text>
              <Text style={styles.text}>{item?.address?.city ?? "—"}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Dirección: </Text>
              <Text style={styles.text} numberOfLines={1}>
                {addr}
              </Text>
            </View>
          </>
        )}

        {item.company && !compactMode && (
          <View style={styles.companyBox}>
            <Text style={styles.companyName}>{item.company.name}</Text>
            {!!item.company.catchPhrase && (
              <Text style={styles.companyTagline} numberOfLines={2}>
                “{item.company.catchPhrase}”
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Directorio de Usuarios</Text>
        <Text style={styles.subtitle}>Fuente: jsonplaceholder.typicode.com/users</Text>

        <View style={styles.prefRow}>
          <Text style={styles.prefLabel}>Modo compacto</Text>
          <Switch value={compactMode} onValueChange={onToggleCompact} />
        </View>

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar por nombre, usuario, email, ciudad..."
          placeholderTextColor="#7c7c7c"
          style={styles.search}
        />

        {showCacheBadge && (
          <View style={styles.cacheBadge}>
            <Text style={styles.cacheText}>
              Mostrando datos en caché (offline).
            </Text>
          </View>
        )}

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
            <Text style={styles.help}>Cargando usuarios…</Text>
          </View>
        ) : error && !filtered.length ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>No se pudo cargar la lista</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={fetchUsers}>
              <Text style={styles.retryText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View style={styles.center}>
                <Text style={styles.help}>No hay resultados con “{query}”.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}