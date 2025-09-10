import { Image } from "react-native";
import { CardList } from "./components/CardList";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardDetails } from "./components/CardDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CardType } from "./schemas/cards";
import { primary } from "./styles";

export type RootStackParamList = {
  CardList: undefined;
  CardDetails: CardType;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="CardList"
          screenOptions={{ headerTintColor: primary }}
        >
          <Stack.Screen
            name="CardList"
            component={CardList}
            options={{
              headerTitle: () => (
                <Image
                  source={require("./assets/logo.jpg")}
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
                  source={require("./assets/logo.jpg")}
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
    </QueryClientProvider>
  );
}
