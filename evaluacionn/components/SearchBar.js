import React from "react";
import { View, TextInput } from "react-native";
import s from "../styles/widgets";

export default function SearchBar({ value, onChangeText, placeholder="Buscar por título o autor" }) {
  return (
    <View style={s.searchBox}>
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        onChangeText={onChangeText}
        style={s.searchInput}
        autoCorrect={false}
      />
    </View>
  );
}