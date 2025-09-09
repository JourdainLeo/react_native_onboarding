import { Image } from "react-native";
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
            options={{
              headerTitle: () => (
                <Image
                  source={require("./assets/logo.jpg")} // ton image locale
                  style={{
                    width: "100%",
                    height: 40,
                    resizeMode: "contain",
                    marginBottom: 20,
                  }}
                />
              ),
            }}
          />
          <Stack.Screen
            name="CardDetails"
            component={CardDetails}
            options={{
              headerTitle: () => (
                <Image
                  source={require("./assets/logo.jpg")} // ton image locale
                  style={{
                    width: "100%",
                    height: 40,
                    resizeMode: "contain",
                    marginBottom: 20,
                  }}
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}
