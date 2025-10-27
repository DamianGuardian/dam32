
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet
} from "react-native";
import { globalStyles, colors } from "../styles/styles";
import { loadPostsLocal } from "../storage/local";
import { enqueueOperation } from "../sync/queue";

export default function PostDetailScreen({ route, navigation }) {
  // route.params.postId viene del router casero
  const { postId } = route.params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      const posts = await loadPostsLocal();
      const p = posts.find((x) => x.id === postId);
      setPost(p || null);
    })();
  }, [postId]);

  if (!post) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.headerTitle}>Cargando...</Text>
      </View>
    );
  }

  async function handleDelete() {
    Alert.alert(
      "Eliminar publicación",
      "¿Seguro que quieres eliminarla?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const updated = await enqueueOperation("delete", post);
            navigation.goBack(); 
          },
        },
      ]
    );
  }

  return (
    <ScrollView style={globalStyles.container}>

   
      <View style={[styles.topBar]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>⟵ Volver</Text>
        </TouchableOpacity>
      </View>

      <View style={[globalStyles.headerBar, { paddingHorizontal: 0, paddingTop: 0 }]}>
        <Text style={globalStyles.headerTitle} numberOfLines={2}>
          {post.title || "(Sin título)"}
        </Text>
        <Text style={globalStyles.statusText}>
          {post.author || "desconocido"} ·{" "}
          {new Date(post.updatedAt || 0).toLocaleString()}
        </Text>
      </View>

      <Text
        style={{
          color: colors.text,
          fontSize: 16,
          lineHeight: 22,
          marginBottom: 24,
        }}
      >
        {post.body || "(Sin contenido)"}
      </Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[globalStyles.buttonPrimary, { flex: 1 }]}
          onPress={() =>
            navigation.navigate("edit", {
              mode: "edit",
              postId: post.id,
            })
          }
        >
          <Text style={globalStyles.buttonPrimaryText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.buttonDanger, { flex: 1, marginLeft: 8 }]}
          onPress={handleDelete}
        >
          <Text
            style={[
              globalStyles.buttonPrimaryText,
              { color: "#fff", fontWeight: "600" },
            ]}
          >
            Eliminar
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={globalStyles.statusText}>
        Estado de sincronización: {post.syncStatus || "synced"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  backButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
});
