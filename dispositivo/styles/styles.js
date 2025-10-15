// styles/styles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
    backgroundColor: "#0b132b",
  },
  headerRow: {
    marginBottom: 12,
    gap: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 13,
    color: "#cbd5e1",
  },
  statusPillWrap: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#1c2541",
  },
  pillText: {
    color: "#cbd5e1",
    fontSize: 12,
  },
  card: {
    backgroundColor: "#1c2541",
    borderRadius: 14,
    padding: 14,
    marginVertical: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  coinLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  symbol: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#3a506b",
    alignItems: "center",
    justifyContent: "center",
  },
  symbolText: { color: "#fff", fontWeight: "800" },
  coinName: { color: "#e2e8f0", fontSize: 16, fontWeight: "600" },
  price: { color: "#e2e8f0", fontSize: 16, fontWeight: "700" },
  changePositive: { color: "#22c55e", fontWeight: "700" },
  changeNegative: { color: "#ef4444", fontWeight: "700" },
  footerMsg: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: 12,
    marginBottom: 20,
    fontSize: 12,
  },
  retryBtn: {
    alignSelf: "center",
    backgroundColor: "#3a506b",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 8,
  },
  retryText: { color: "#e2e8f0", fontWeight: "600" },
  emptyBox: {
    marginTop: 40,
    alignItems: "center",
    gap: 10,
  },
  emptyText: { color: "#cbd5e1", textAlign: "center" },
});
