import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MotiView, MotiText } from "moti";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Title Animation */}
      <MotiText
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 600 }}
        style={styles.title}
      >
        Welcome to Component Finder 👋
      </MotiText>

      {/* Subtitle Animation */}
      <MotiText
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 300, duration: 600 }}
        style={styles.subtitle}
      >
        Find the components you need for your project  from different sources.
      </MotiText>

      {/* How It Works Card */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 500, duration: 600 }}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>How does search tab works ?</Text>
        <Text style={styles.step}>1. Describe your component as you do in a marketplace search.</Text>
        <Text style={styles.step}>2. 3 different sources will be scanned.</Text>
        <Text style={styles.step}>3. View names, prices and links.</Text>
        <Text style={styles.step}>4. From Digikey check price for specific quantity.</Text>
      </MotiView>

      {/* ProjectAI Card */}
      <MotiView
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 500, duration: 600 }}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>How does ProjectAI tab works ?</Text>
        <Text style={styles.step}>1. Think about a cool project you want to build.</Text>
        <Text style={styles.step}>2. Explain it to our AI with details.</Text>
        <Text style={styles.step}>3.Enjoy!</Text>
      </MotiView>

      {/* Animated Button */}
      <MotiView
        from={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1000, type: "spring" }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/search")}
        >
          <Text style={styles.buttonText}>Start Searching</Text>
        </TouchableOpacity>
      </MotiView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  step: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
  },
  example: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
