import React from "react";
import { View, Text, Image, Linking } from "react-native";
import { PartItemMouser } from "../types/PartTypes";
import { searchStyles as styles } from "../styles/searchStyles";

export default function MouserCard({ item }: { item: PartItemMouser }) {
  return (
    <View style={styles.card}>
      <Text style={styles.shopLabel}>{item.shop}</Text>
      <Image source={{ uri: item.image }} style={styles.partImage} resizeMode="contain" />
      <Text style={styles.partName}>{item.name}</Text>

      <Text style={styles.priceSmall}>Price for 1: {item.price_for_one || "Not Provided"}</Text>
      <Text style={styles.priceSmall}>Price for 10: {item.price_for_ten || "Not Provided"}</Text>
      <Text style={styles.priceSmall}>Price for 100: {item.price_for_hundred || "Not Provided"}</Text>

      <Text style={styles.linkText} onPress={() => Linking.openURL(item.url)}>
        Open Product Page
      </Text>
    </View>
  );
}
