
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles, colors } from "../styles/styles";
import SyncBadge from "./SyncBadge";

export default function PostItem({ post, onPress }) {
  return (
    <TouchableOpacity style={globalStyles.card} onPress={onPress}>
      <View style={globalStyles.rowBetween}>
        <Text style={globalStyles.cardTitle} numberOfLines={1}>
          {post.title || "(Sin título)"}
        </Text>
        <SyncBadge status={post.syncStatus || "synced"} />
      </View>

      <Text style={globalStyles.cardSubtitle} numberOfLines={2}>
        {post.body || "(Sin contenido)"}
      </Text>

      <View style={[globalStyles.rowBetween, { marginTop: 8 }]}>
        <Text style={[globalStyles.cardSubtitle, { fontSize: 12 }]}>
          {post.author || "desconocido"}
        </Text>
        <Text style={[globalStyles.cardSubtitle, { fontSize: 12 }]}>
          {new Date(post.updatedAt || 0).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
