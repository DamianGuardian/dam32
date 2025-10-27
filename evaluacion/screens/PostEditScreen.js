
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { globalStyles, colors } from "../styles/styles";
import { loadPostsLocal } from "../storage/local";
import { enqueueOperation } from "../sync/queue";

export default function PostEditScreen({ route, navigation }) {
  const { mode, postId } = route.params || { mode: "create" };

  const isEdit = mode === "edit";

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("yo");
  const [syncStatus, setSyncStatus] = useState("pending");

  useEffect(() => {
    (async () => {
      if (isEdit && postId) {
        const posts = await loadPostsLocal();
        const p = posts.find(x => x.id === postId);
        if (p) {
          setTitle(p.title || "");
          setBody(p.body || "");
          setAuthor(p.author || "yo");
          setSyncStatus(p.syncStatus || "synced");
        }
      }
    })();
  }, [isEdit, postId]);

  async function handleSave() {
    if (title.trim() === "") {
      Alert.alert("Falta título", "El título es obligatorio");
      return;
    }

    const now = Date.now();
    const newPost = {
      id: isEdit ? postId : "local-" + now,
      title,
      body,
      author,
      updatedAt: now
    };

    const op = isEdit ? "update" : "create";
    await enqueueOperation(op, newPost);

    navigation.navigate("list");
  }

  return (
    <ScrollView style={globalStyles.container}>
      <View style={[globalStyles.headerBar, { paddingHorizontal: 0 }]}>
        <Text style={globalStyles.headerTitle}>
          {isEdit ? "Editar publicación" : "Nueva publicación"}
        </Text>
        {isEdit ? (
          <Text style={globalStyles.statusText}>
            Estado actual: {syncStatus}
          </Text>
        ) : null}
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={globalStyles.label}>Título</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Escribe un título..."
          placeholderTextColor="#64748B"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={globalStyles.label}>Autor</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Autor"
          placeholderTextColor="#64748B"
          value={author}
          onChangeText={setAuthor}
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={globalStyles.label}>Contenido</Text>
        <TextInput
          style={[globalStyles.input, globalStyles.textarea]}
          placeholder="Contenido del post..."
          placeholderTextColor="#64748B"
          multiline
          value={body}
          onChangeText={setBody}
        />
      </View>

      <TouchableOpacity
        style={[globalStyles.buttonPrimary, { marginBottom: 12 }]}
        onPress={handleSave}
      >
        <Text style={globalStyles.buttonPrimaryText}>
          {isEdit ? "Guardar cambios" : "Publicar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.buttonOutline}
        onPress={() => navigation.goBack()}
      >
        <Text style={globalStyles.buttonOutlineText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
