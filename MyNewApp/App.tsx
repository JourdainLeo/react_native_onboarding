import { SafeAreaView, StyleSheet, Text } from "react-native";
import CardList from "./components/CardList";
import { StoreProvider } from "./services/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardDetails from "./components/CardDetails";

export type RootStackParamList = {
  CardList: undefined;
  CardDetails: { name: string; desc: string; card_images: any[] };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CardList">
          <Stack.Screen
            name="CardList"
            component={CardList}
            options={{ title: "Yu-Gi-Oh Database" }}
          />
          <Stack.Screen
            name="CardDetails"
            component={CardDetails}
            options={{ title: "Yu-Gi-Oh Database" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
