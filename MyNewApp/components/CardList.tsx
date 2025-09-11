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
import { globalStyle, primary } from "../styles";
import { useCards } from "../hooks/cards";
import { CardType } from "../schemas/cards";
import { useState, useEffect } from "react";

const Card = ({ id, name, desc, card_images }: CardType) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("CardDetails", { id, name, desc, card_images })
      }
    >
      <Image
        source={{ uri: card_images[0].image_url }}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export const CardList = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const { cards, isLoading, hasNextPage, fetchNextPage } = useCards({
    search: debouncedSearch,
    page: 0,
    pageSize: 25,
  });

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, globalStyle.shadow]}
        placeholder="Search a card..."
        value={search}
        onChangeText={setSearch}
      />
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator color={primary} size={"large"} />
        </View>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => <Card {...item} />}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.7}
          ListFooterComponent={
            hasNextPage ? (
              <ActivityIndicator style={{ margin: 16 }} color={primary} />
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
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
