import { StyleSheet } from "react-native";
import C from "./colors";
export default StyleSheet.create({
  h1: {
    color: C.text,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 12,
    textShadowColor: `${C.primary}20`,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  h2: {
    color: C.text,
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.3,
    marginBottom: 10,
  },
  h3: {
    color: C.text,
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.2,
    marginBottom: 8,
  },
  p: {
    color: C.sub,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
    marginBottom: 16,
  },
  caption: {
    color: C.sub,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontWeight: "500",
  },
  highlight: {
    color: C.primary,
    fontWeight: "600",
  },
});