import React from "react";
import renderer, { act } from "react-test-renderer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CardDetails from "../components/CardDetails";

const Stack = createNativeStackNavigator();

test("renders correctly", async () => {
  let tree;
  await act(async () => {
    tree = renderer.create(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CardDetails"
            component={CardDetails}
            initialParams={{
              name: "Test Card",
              desc: "Test Description",
              card_images: [{ id: 1, image_url: "http://example.com/image.png" }],
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  });
  expect(tree.toJSON()).toMatchSnapshot();
});
