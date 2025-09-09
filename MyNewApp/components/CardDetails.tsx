import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { globalStyle } from "../styles";

type CardDetailsRouteProp = RouteProp<RootStackParamList, "CardDetails">;

const CardDetails: React.FC = () => {
  const route = useRoute<CardDetailsRouteProp>();
  const { name, desc, card_images } = route.params;

  return (
    <View>
      <View style={[styles.container, globalStyle.shadow]}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <Image
        source={{ uri: card_images[0]?.image_url }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  desc: {
    fontSize: 16,
    color: "#555",
  },
  image: {
    height: 400,
    borderRadius: 10,
  },
});

export default CardDetails;
