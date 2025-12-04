import { StyleSheet } from "react-native";

export const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#000",
  },

  searchInput: {
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#f2f2f2",
    color: "#000",
  },

  searchButton: {
    padding: 10,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 6,
    width: "50%",
    alignSelf: "center",
    backgroundColor: "#007bff",
  },

  card: {
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fafafa",
  },

  shopLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
    color: "#555",
  },

  partImage: {
    width: 120,
    height: 120,
    borderRadius: 6,
    marginBottom: 10,
    alignSelf: "center",
  },

  partName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
    color: "#000",
  },

  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#000",
  },

  button: {
    backgroundColor: "#007bff",
    padding: 6,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  priceText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  priceSmall: {
    fontSize: 12,
    marginBottom: 4,
    color: "#444",
  },

  linkText: {
    color: "blue",
    marginTop: 8,
  },

  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});


