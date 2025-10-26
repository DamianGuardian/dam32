import { StyleSheet } from "react-native";
import C from "./colors";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
    padding: 20,
    borderRadius: 15,
  },
  title: {
    color: C.text,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  meta: {
    color: C.sub,
    marginVertical: 8,
    fontSize: 14,
  },
  body: {
    color: C.text,
    marginTop: 12,
    lineHeight: 24,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    gap: 15,
    marginTop: 20,
    alignItems: "center",
  },
  btn: {
    backgroundColor: C.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  btnDanger: {
    backgroundColor: C.danger,
    shadowColor: C.danger,
  },
  btnText: {
    color: C.bg,
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  secondary: {
    marginTop: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: C.surface,
  },
  secondaryText: {
    color: C.sub,
    fontSize: 14,
  },
});