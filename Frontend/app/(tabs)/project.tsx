import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Keyboard, 
} from "react-native";

import { BASE_URL } from "../../constants/config";
import PartCard from "../../components/ui/cards/PartCard";
import { searchComponents } from "../../components/ui/utils/searchComponents";
import { PartItem } from "../../components/ui/types/PartTypes";
import Lottie from "lottie-react-native";
import { BlurView } from "expo-blur";

// TYPES
type ComponentItem = {
  name: string;
  quantity: number;
  description: string;
};

type ApiResponse = {
  components: ComponentItem[];
};

// PROJECT SCREEN
export default function ProjectScreen() {
  const [projectSearchQuery, setProjectSearchQuery] = useState("");
  const [projectResults, setProjectResults] = useState<ComponentItem[]>([]);
  const [projectLoading, setProjectLoading] = useState(false);
  const [hasSearchedProject, setHasSearchedProject] = useState(false);

  const handleProjectSearch = async () => {
    if (!projectSearchQuery.trim()) return;

    Keyboard.dismiss();
    setProjectLoading(true);
    setHasSearchedProject(true);

    try {
      const response = await fetch(
        `${BASE_URL}/find_components_for_project?query=${encodeURIComponent(
          projectSearchQuery
        )}`
      );
      const json = (await response.json()) as ApiResponse;
      setProjectResults(json.components || []);
    } catch (error) {
      console.error("Api error:", error);
      alert("Error fetching search results");
    } finally {
      setProjectLoading(false);
    }
  };

  // States
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [componentResultsMap, setComponentResultsMap] = useState<{
    [key: string]: PartItem[];
  }>({});
  const [componentLoadingMap, setComponentLoadingMap] = useState<{
    [key: string]: boolean;
  }>({});

  const handleComponentSearch = async (name: string) => {
    if (expandedItem === name) {
      setExpandedItem(null);
      return;
    }


    setExpandedItem(name);
    setComponentLoadingMap((prev) => ({ ...prev, [name]: true }));
    setComponentResultsMap((prev) => ({ ...prev, [name]: [] }));

    try {
      const results = await searchComponents(name);
      setComponentResultsMap((prev) => ({ ...prev, [name]: results }));
    } catch (err) {
      console.error(err);
    } finally {
      setComponentLoadingMap((prev) => ({ ...prev, [name]: false }));
    }
  };

  const renderItem = ({ item }: { item: ComponentItem }) => {
    const isOpen = expandedItem === item.name;
    const isLoading = componentLoadingMap[item.name] || false;
    const results = componentResultsMap[item.name] || [];

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.partName}>{item.name}</Text>

          {/* Toggle Arrow  */}
          <TouchableOpacity onPress={() => handleComponentSearch(item.name)}>
            <Text style={styles.arrow}>{isOpen ? "v" : ">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Quantity Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>x{item.quantity}</Text>
        </View>

        {/* Description */}
        {item.description ? (
          <View style={styles.descriptionContainer}>
            <Text style={styles.partDescription}>{item.description}</Text>
          </View>
        ) : null}

        {/* Marketplace Results */}
        {isOpen && (
          <View style={{ marginTop: 10 }}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#007bff" />
            ) : results.length > 0 ? (
              results.map((result, index) => <PartCard key={index} item={result} />)
            ) : (
              <Text
                style={{
                  color: "#777",
                  textAlign: "center",
                  marginTop: 10,
                  fontStyle: "italic",
                }}
              >
                No marketplace results found.
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

return (
  <View style={styles.container}>
    <FlatList
      data={projectResults}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.name + index}
      contentContainerStyle={{ paddingBottom: 20 }}
      ListEmptyComponent={
        !projectLoading && hasSearchedProject ? (
          <Text style={styles.emptyText}>No components found.</Text>
        ) : null
      }
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Project Component Finder</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Describe your project..."
            placeholderTextColor="#666"
            value={projectSearchQuery}
            onChangeText={setProjectSearchQuery}
            returnKeyType="search"
            onSubmitEditing={handleProjectSearch}
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleProjectSearch}
            disabled={projectLoading}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      }
    />

    {projectLoading && (
      <BlurView intensity={40} tint="light" style={styles.blurOverlay}>
        <View style={styles.aiContent}>
          <Lottie
            source={require("../../assets/animations/brain.json")}
            autoPlay
            loop
            style={{ width: 220, height: 220 }}
          />
          <Text style={styles.aiText}>AI is thinking...</Text>
        </View>
      </BlurView>
    )}
  </View>
);

}

// STYLES
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerContainer: { marginBottom: 20, paddingHorizontal: 20, paddingTop: 20 },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 15, textAlign: "center", color: "#000" },
  searchInput: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    backgroundColor: "#f2f2f2",
    color: "#000",
    borderWidth: 1,
    borderColor: "transparent",
  },
  searchButton: {
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    width: "50%",
    alignSelf: "center",
    backgroundColor: "#007bff",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  partName: { fontSize: 16, fontWeight: "700", color: "#000", flex: 1, marginRight: 10 },
  badge: { backgroundColor: "#e1f5fe", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 5 },
  badgeText: { color: "#0288d1", fontWeight: "bold", fontSize: 12 },
  descriptionContainer: { marginTop: 5 },
  partDescription: { fontSize: 14, lineHeight: 20, color: "#555" },
  emptyText: { textAlign: "center", marginTop: 30, fontSize: 16, fontStyle: "italic", color: "#999" },
  arrow: { fontSize: 22, fontWeight: "900", color: "#007bff", paddingHorizontal: 10, paddingVertical: 4 },

  aiOverlay: {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.6)",
  zIndex: 999,
},

  aiText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  blurOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    backdropFilter: "blur(10px)", 
  },

  aiContent: {
    justifyContent: "center",
    alignItems: "center",
  },



});
