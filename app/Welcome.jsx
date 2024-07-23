import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "../Helpers/Common";
import { theme } from "../constants/theme";
import Button from "../components/Button";

import { useRouter } from "expo-router";
const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <Image
          style={styles.welcomeImage}
          resizeMode="contain"
          source={require("../assets/images/Group 3.png")}
        />

        <View style={{ gap: 20 }}>
          <Text style={styles.title}>
            Start moving improve your Social Game !
          </Text>
          {/* <Text style={styles.subtitle}>Lets Connect</Text> */}
        </View>

        <View style={styles.footer}>
          <Button
            title={"Getting Started"}
            onPress={() => router.push("./SignUp")}
          />
        </View>

        <View style={styles.bootomTextContainer}>
          <Text style={styles.loginText}>Already Have an account?</Text>
          <Pressable onPress={() => router.push("./Login")}>
            <Text
              style={[
                styles.loginText,
                {
                  fontWeight: theme.fonts.extraBold,
                  color: theme.colors.primary,
                },
              ]}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "space-around",
    backgroundColor: "white",
    alignItems: "center",
  },
  welcomeImage: {
    height: hp(60),
    width: wp(100),
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: "center",
    fontWeight: theme.fonts.extraBold,
    marginTop: -20,
    paddingHorizontal: wp(5),
    marginBottom: hp(2),
  },

  loginText: {
    color: theme.colors.text,
    fontSize: hp(1.7),
    textAlign: "center",

    fontWeight: theme.fonts.medium,
  },
  footer: {
    gap: 30,
    width: "100%",
    paddingHorizontal: wp(6),
    marginBottom: hp(2),
  },
  bootomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(4),
    gap: 5,
  },
});
