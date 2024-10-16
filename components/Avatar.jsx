import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import { Image } from "expo-image";
import { hp } from "../Helpers/Common";
import { getUserImageSrc } from "../Services/imageService";

const Avatar = ({ uri, size = hp(4.5), rounded = theme.radius.md, style }) => {
  return (
    <Image
      source={getUserImageSrc(uri)}
      transition={100}
      style={[
        styles.avatar,
        { height: size, width: size, borderRadius: rounded },
        style,
      ]}
    />
  );
};

export default Avatar;
const styles = StyleSheet.create({
  avatar: {
    borderCurve: "circular",
    // borderColor: theme.colors.gray,
    // borderWidth: 1,
  },
});
