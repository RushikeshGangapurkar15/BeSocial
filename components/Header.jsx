import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import BackButton from "./BackButton";
import { FONTFAMILY, theme } from "../constants/theme";
import { hp } from "../Helpers/Common";

const Header = ({ title, showButton = true, mb = 30 }) => {
  const router = useRouter();
  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {showButton && (
        <View style={styles.backButton}>
          <BackButton router={router} />
        </View>
      )}
      <Text style={styles.title}>{title || ""}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    gap: 10,
  },
  title: {
    fontSize: hp(2.7),
    color: theme.colors.textDark,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
});
