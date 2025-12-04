import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import PartCard from "../../components/ui/cards/PartCard";
import { searchComponents } from "../../components/ui/utils/searchComponents";
import { searchStyles as styles } from "../../components/ui/styles/searchStyles";
import { PartItem } from "../../components/ui/types/PartTypes";
import Lottie from "lottie-react-native";
import { BlurView } from "expo-blur";


// SEARCH SCREEN

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<PartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const data = await searchComponents(searchQuery); // extracted logic call
      setResults(data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong with the search");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <PartCard item={item} />}

        ListHeaderComponent={
          <>
            <Text style={styles.title}>Component Finder 🔍</Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Search for components..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                {loading ? "Searching..." : "Search"}
              </Text>
            </TouchableOpacity>

            <View style={{ height: 20 }} />
          </>
        }

        ListEmptyComponent={
          !loading ? (
            <View style={{ alignItems: "center", marginTop: 100 }}>
              <Text style={{ fontSize: 20, color: "#666" }}>
                No components found.
              </Text>
            </View>
          ) : null
        }
      />

      {/* ------------------------ FULL SCREEN SEARCH OVERLAY ------------------------ */}
      {loading && (
        <BlurView intensity={60} tint="light" style={styles.blurOverlay}>
          <Lottie
            source={require("../../assets/animations/Searching.json")}
            autoPlay
            loop
            style={{ width: 180, height: 180 }}
          />
          <Text style={styles.loadingText}>
            Searching Through Marketplaces
          </Text>
        </BlurView>
      )}
    </View>
  );
}