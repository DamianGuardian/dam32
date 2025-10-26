import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import s from "../styles/widgets";

export default function PostCard({ item, compact, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress?.(item)}>
      <View style={[s.card, compact && s.cardCompact]}>
        <Text style={s.cardTitle} numberOfLines={compact ? 1 : 2}>{item.title}</Text>
        {!compact && <Text style={s.cardBody} numberOfLines={3}>{item.body}</Text>}
        <Text style={s.meta}>Autor: {item.author} · {new Date(item.updatedAt).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );
}