import { StyleSheet } from "react-native";
import C from "./colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },

  topBar: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: C.bg,
    borderBottomWidth: 1,
    borderBottomColor: `${C.surface}50`,
  },
  title: {
    color: C.text,
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: `${C.surface}20`,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    backgroundColor: `${C.surface}30`,
    padding: 8,
    borderRadius: 10,
  },
  switchLabel: {
    color: C.text,
    marginRight: 8,
    fontSize: 14,
    fontWeight: "600",
  },

  btn: {
    backgroundColor: C.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginLeft: "auto",
    elevation: 3,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  btnText: {
    color: C.bg,
    fontWeight: "700",
    fontSize: 15,
  },

  empty: {
    color: C.sub,
    textAlign: "center",
    marginTop: 48,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  offline: {
    color: C.sub,
    textAlign: "center",
    padding: 12,
    backgroundColor: `${C.surface}30`,
    borderRadius: 8,
    margin: 16,
  },
  conflict: {
    color: "#f59e0b",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: `${C.surface}40`,
    fontSize: 14,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: C.surface,
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  modalTitle: {
    color: C.text,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  conflictItem: {
    backgroundColor: `${C.surface}80`,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: `${C.surface}90`,
  },
  conflictId: {
    color: C.sub,
    marginBottom: 8,
    fontSize: 13,
  },
  conflictLabel: {
    color: C.sub,
    fontSize: 13,
    marginTop: 6,
    fontWeight: "500",
  },
  conflictText: {
    color: C.text,
    lineHeight: 20,
  },
  conflictWinner: {
    color: C.primary,
    fontWeight: "700",
    fontSize: 14,
  },
});