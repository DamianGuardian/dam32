import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import s from "../styles/screens.edit";

export default function PostEditScreen({ post, nav }) {
  const isEdit = !!post;
  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");
  const [author, setAuthor] = useState(post?.author || "User 1");

  const statusBarSpacer = Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) : 0;

  return (
    <SafeAreaView style={s.container}>
      {/* Evitar solape con la barra del teléfono */}
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <View style={{ height: statusBarSpacer }} />

      <Text style={s.header}>{isEdit ? "Editar post" : "Nuevo post"}</Text>

      <TextInput
        style={s.input}
        placeholder="Título"
        placeholderTextColor="#94A3B8"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[s.input, s.area]}
        placeholder="Contenido"
        placeholderTextColor="#94A3B8"
        value={body}
        onChangeText={setBody}
        multiline
      />

      <TextInput
        style={s.input}
        placeholder="Autor"
        placeholderTextColor="#94A3B8"
        value={author}
        onChangeText={setAuthor}
      />

      <TouchableOpacity
        style={s.btn}
        onPress={() =>
          nav.savePost({
            ...(post ?? { id: -Date.now() }), 
            title,
            body,
            author,
            updatedAt: new Date().toISOString(),
          })
        }
      >
        <Text style={s.btnText}>{isEdit ? "Guardar" : "Crear"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.secondary} onPress={() => nav.cancelEdit()}>
        <Text style={s.secondaryText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}