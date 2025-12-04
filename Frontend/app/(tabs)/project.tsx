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

import Lottie from "lottie-react-native";
import { BlurView } from "expo-blur";
import { BASE_URL } from "../../constants/config";
import PartCard from "../../components/ui/cards/PartCard";
import { searchComponents } from "../../components/ui/utils/searchComponents";
import { searchStyles as style} from "../../components/ui/styles/searchStyles";
import { PartItem } from "../../components/ui/types/PartTypes";


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
        `${BASE_URL}/find_components_for_project?query=${encodeURIComponent(projectSearchQuery)}`
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

  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [showComponentPanel, setShowComponentPanel] = useState(false);
  const [componentQuery, setComponentQuery] = useState("");
  const [componentResults, setComponentResults] = useState<PartItem[]>([]);
  const [componentLoading, setComponentLoading] = useState(false);

  const handleComponentSearch = async (name: string) => {
    if (expandedItem === name) {
      // Collapse if already expanded
      setExpandedItem(null);
      return;
    }

    // Expand and fetch data
    setExpandedItem(name);
    setComponentLoading(true);
    setComponentResults([]);

    try {
      const results = await searchComponents(name);
      setComponentResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setComponentLoading(false);
    }
  };





const renderItem = ({ item }: { item: ComponentItem }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.partName}>{item.name}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>x{item.quantity}</Text>
      </View>
    </View>

    {/* Description section */}
    {item.description ? (
      <View style={styles.descriptionContainer}>
        <Text style={styles.partDescription}>{item.description}</Text>
      </View>
    ) : null}
    
    <TouchableOpacity
      style={styles.smallSearchButton}
      onPress={() => handleComponentSearch(item.name)}
    >
      <Text style={styles.smallButtonText}>Search Part</Text>
    </TouchableOpacity>

  </View>
);


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
              {projectLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Search</Text>
              )}
            </TouchableOpacity>

          </View>
        }
      />

      {/* --------------------------
          FULL SCREEN SEARCH OVERLAY
      --------------------------- */}
      {projectLoading && (
        <BlurView intensity={60} tint="light" style={styles.blurOverlay}>
          <Lottie
            source={require("../../assets/animations/brain.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />

          <Text style={styles.loadingText}>AI is thinking...</Text>
        </BlurView>
      )}
      {/* COMPONENT SEARCH PANEL */}
{showComponentPanel && (
  <View style={styles.panelContainer}>
    <View style={styles.panel}>
      
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setShowComponentPanel(false)}
      >
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Results for: {componentQuery}</Text>

      {/* Results List */}
      <FlatList
        data={componentResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <PartCard item={item} />}
        ListEmptyComponent={
          !componentLoading ? (
            <View style={{ alignItems: "center", marginTop: 60 }}>
              <Text style={{ fontSize: 18, color: "#666" }}>
                No components found.
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      {/* Lottie Overlay */}
      {componentLoading && (
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
  </View>
)}

    </View>
  );
}


// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 15,
    textAlign: "center",
    color: "#000",
  },

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
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  smallSearchButton: {
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    width: "50%",
    alignSelf: "center",
    backgroundColor: "#007bff",
  },
  smallButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  partName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    flex: 1,
    marginRight: 10,
  },
  badge: {
    backgroundColor: "#e1f5fe",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: "#0288d1",
    fontWeight: "bold",
    fontSize: 12,
  },
  descriptionContainer: {
    marginTop: 5,
  },
  partDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    fontStyle: "italic",
    color: "#999",
  },

  // FULL SCREEN LOADING OVERLAY
  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  panelContainer: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
},

  panel: {
    width: "90%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    elevation: 10,
    overflow: "hidden",
  },

  closeButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#eee",
    borderRadius: 8,
  },

  closeText: {
    fontWeight: "700",
    color: "#333",
  },

});
