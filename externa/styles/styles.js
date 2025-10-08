import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
    marginBottom: 12,
  },
  search: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 8,
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 14,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  username: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  label: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "600",
  },
  text: {
    fontSize: 13,
    color: "#1f2937",
    flexShrink: 1,
  },
  link: {
    fontSize: 13,
    color: "#2563eb",
    textDecorationLine: "underline",
    flexShrink: 1,
  },
  companyBox: {
    marginTop: 10,
    backgroundColor: "#F8FAFF",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e0e7ff",
  },
  companyName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e3a8a",
  },
  companyTagline: {
    fontSize: 12,
    color: "#334155",
    marginTop: 2,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  help: {
    marginTop: 8,
    color: "#6b7280",
  },
  errorBox: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  errorTitle: {
    color: "#991B1B",
    fontWeight: "700",
    marginBottom: 6,
  },
  errorText: {
    color: "#7F1D1D",
    marginBottom: 10,
  },
  retryBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#DC2626",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  retryText: {
    color: "white",
    fontWeight: "700",
  },
});
