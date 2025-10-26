import React from "react";
import { View, Text } from "react-native";
import s from "../styles/widgets";

export default function SyncBadge({ state }) {
  const label = state === "syncing" ? "Sincronizando…" :
                state === "pending" ? "Pendiente" :
                "Sincronizado";
  return (
    <View style={[s.badge, state === "pending" && s.badgePending, state === "syncing" && s.badgeSyncing]}>
      <Text style={s.badgeText}>{label}</Text>
    </View>
  );
}