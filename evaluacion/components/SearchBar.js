
import React from "react";
import { View, TextInput } from "react-native";
import { globalStyles } from "../styles/styles";

export default function SearchBar({ query, onChange }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <TextInput
        style={globalStyles.input}
        placeholder="Buscar por título o autor..."
        placeholderTextColor="#64748B"
        value={query}
        onChangeText={onChange}
      />
    </View>
  );
}
