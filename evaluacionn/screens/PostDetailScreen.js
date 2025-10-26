import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import s from "../styles/screens.detail";

export default function PostDetailScreen({ post, nav }) {
  if (!post) return null;

  const statusBarSpacer = Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) : 0;

  return (
    <SafeAreaView style={s.container}>
      {/* Evitar solape con la barra del teléfono */}
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <View style={{ height: statusBarSpacer }} />

      <Text style={s.title}>{post.title}</Text>
      <Text style={s.meta}>
        Autor: {post.author} · {new Date(post.updatedAt).toLocaleString()}
      </Text>
      <Text style={s.body}>{post.body}</Text>

      <View style={s.row}>
        <TouchableOpacity style={s.btn} onPress={() => nav.openEditor(post)}>
          <Text style={s.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.btn, s.btnDanger]} onPress={() => nav.deletePost(post)}>
          <Text style={s.btnText}>Eliminar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={s.secondary} onPress={() => nav.goList()}>
        <Text style={s.secondaryText}>← Volver</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}