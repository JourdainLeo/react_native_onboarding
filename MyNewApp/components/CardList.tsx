import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useStore } from "../services/store";
import PaginationControls from "./PaginationControls";

type CardProps = {
  name: string;
  desc: string;
  card_images: {
    image_url: string;
    image_url_cropped: string;
    image_url_small: string;
  }[];
};

const Card: React.FC<CardProps> = ({ name, desc, card_images }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("CardDetails", { name, desc, card_images })
      }
    >
      <Image
        source={{ uri: card_images[0]?.image_url }}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const CardList: React.FC = () => {
  const { cards, loading, search, setSearch } = useStore();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search a card..."
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          numColumns={3}
          renderItem={({ item }) => <Card {...item} />}
        />
      )}
      <PaginationControls />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    alignItems: "center",
  },
  input: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    width: "100%",
    marginBottom: 12,
  },
  card: {
    width: Dimensions.get("window").width / 3 - 16,
    margin: 4,
  },
  image: {
    width: "100%",
    height: 180,
  },
});

export default CardList;
