import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  RefreshControl,
  Linking,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import styles from "./styles/styles";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      setError(e?.message ?? "Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>@{item.username}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Correo: </Text>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.email}`)}>
            <Text style={styles.link}>{item.email}</Text>
          </TouchableOpacity>
        </View>

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
                item.website.startsWith("http") ? item.website : `https://${item.website}`
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

        {item.company && (
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

        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar por nombre, usuario, email, ciudad..."
          placeholderTextColor="#7c7c7c"
          style={styles.search}
        />

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" />
            <Text style={styles.help}>Cargando usuarios…</Text>
          </View>
        ) : error ? (
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
                <Text style={styles.help}>
                  No hay resultados con “{query}”.
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
