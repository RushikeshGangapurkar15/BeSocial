import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../constants/theme";

const BackButton = ({ router }) => {
  return (
    <Pressable onPress={() => router.back()} style={styles.button}>
      <Text>Back</Text>
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: theme.radius.sm,

    backgroundColor: "rgba(0,0,0,0.07)",
  },
});
