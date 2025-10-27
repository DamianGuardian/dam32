
import { StyleSheet } from "react-native";

export const colors = {
  bg: "#0F172A",
  card: "#1E2537",
  text: "#E5E7EB",
  subtext: "#94A3B8",
  border: "#334155",
  primary: "#22D3EE",
  danger: "#EF4444",
  success: "#22C55E",
  pending: "#EAB308"
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
    paddingTop: 12
  },
  headerBar: {
    paddingTop: 36,
    paddingBottom: 12
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 16
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.subtext
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 11,
    fontWeight: "600",
    overflow: "hidden",
    textTransform: "uppercase"
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonPrimaryText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600"
  },
  buttonDanger: {
    backgroundColor: colors.danger,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 8
  },
  buttonOutlineText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "500"
  },
  label: {
    color: colors.subtext,
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 4
  },
  textarea: {
    minHeight: 120,
    textAlignVertical: "top"
  },
  statusText: {
    fontSize: 12,
    color: colors.subtext,
    marginTop: 6
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    marginTop: 8
  }
});
