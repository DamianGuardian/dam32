
import React from "react";
import { Text, View } from "react-native";
import { colors, globalStyles } from "../styles/styles";

export default function SyncBadge({ status }) {
  let bgColor = colors.success;
  let label = "SYNCED";

  if (status === "pending") {
    bgColor = colors.pending;
    label = "PENDING";
  }
  if (status === "syncing") {
    bgColor = colors.primary;
    label = "SYNCING";
  }
  if (status === "error") {
    bgColor = colors.danger;
    label = "ERROR";
  }

  return (
    <View
      style={{
        backgroundColor: bgColor,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4
      }}
    >
      <Text
        style={[
          globalStyles.badge,
          { color: "#000", fontWeight: "700", fontSize: 10 }
        ]}
      >
        {label}
      </Text>
    </View>
  );
}
