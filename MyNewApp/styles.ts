import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
  shadow: {
    // ombre iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    // ombre Android
    elevation: 1,
  },
});
