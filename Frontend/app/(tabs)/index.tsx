import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useTheme } from "../_layout"; // our theme hook

export default function HomeScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([
    { id: "1", name: "ESP32 Microcontroller" },
    { id: "2", name: "STM32F407 Discovery Board" },
    { id: "3", name: "Raspberry Pi 4 Model B" },
    { id: "4", name: "LIS3DH Accelerometer" },
  ]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filteredResults = results.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#000" : "#fff" },
      ]}
    >
      {/* Title */}
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
        Component Finder 🔍
      </Text>

      {/* Search bar */}
      <TextInput
        style={[
          styles.searchInput,
          {
            backgroundColor: isDark ? "#1a1a1a" : "#f2f2f2",
            color: isDark ? "#fff" : "#000",
          },
        ]}
        placeholder="Search for components..."
        placeholderTextColor={isDark ? "#888" : "#666"}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Results list */}
      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: isDark ? "#111" : "#fafafa",
                borderColor: isDark ? "#333" : "#ddd",
              },
            ]}
          >
            <Text style={{ color: isDark ? "#fff" : "#000", fontWeight: "600" }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ color: isDark ? "#888" : "#999", marginTop: 20 }}>
            No components found.
          </Text>
        }
        style={{ width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  searchInput: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
});
