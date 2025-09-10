import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
  shadow: {
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    // Android
    elevation: 1,
  },
});

export const primary = "#ed2124";
