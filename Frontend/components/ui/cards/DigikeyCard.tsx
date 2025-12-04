import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Linking } from "react-native";
import { PartItemDigikey } from "../types/PartTypes";
import { searchStyles as styles } from "../styles/searchStyles";
import { BASE_URL } from "../../../constants/config";

export default function DigikeyCard({ item }: { item: PartItemDigikey }) {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!quantity || isNaN(Number(quantity))) {
      alert("Please enter a valid number!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/find_the_price_given_quantities?digikey_id=${item.digikey_id}&quantity=${Number(quantity)}`
      );
      const data = await response.json();
      setPrice(data.total_price);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.shopLabel}>{item.shop}</Text>
      <Image source={{ uri: item.image }} style={styles.partImage} resizeMode="contain" />
      <Text style={styles.partName}>{item.name}</Text>

      <TextInput
        value={quantity}
        onChangeText={(text) => {
          const clean = text.replace(/[^0-9]/g, "");
          setQuantity(clean);
          setPrice(null);
        }}
        keyboardType="numeric"
        placeholder="Enter quantity..."
        placeholderTextColor="#666"
        style={styles.input}
      />

      <TouchableOpacity onPress={handleCheck} style={styles.button}>
        <Text style={styles.buttonText}>{loading ? "Checking..." : "Check Price"}</Text>
      </TouchableOpacity>

      {price !== null && (
        <Text style={styles.priceText}>Total Price: {price ? price + " zł" : "Cannot be determined"} </Text>
      )}

      <Text style={styles.linkText} onPress={() => Linking.openURL(item.url)}>
        Open Product Page
      </Text>
    </View>
  );
}
