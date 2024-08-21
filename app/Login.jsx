import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";

import { useRouter } from "expo-router";
import BackButton from "../components/BackButton";
import { hp, wp } from "../Helpers/Common";
import { theme } from "../constants/theme";
import Input from "../components/Input";
import Button from "../components/Button";
import { Home } from "../assets/icons/CustomeIcons";
import Icon from "../assets/icons/Index";
import { supabase } from "../lib/Supabase";

const Login = () => {
  const router = useRouter();
  const emailRef = useRef();
  const passRef = useRef();

  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    if (!emailRef.current || !passRef.current) {
      Alert.alert("Login", "Invalid Fields");
      return;
    }
    let email = emailRef.current.trim();
    let password = passRef.current.trim();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    console.log("Error", error);
    if (error) {
      Alert.alert("Login Error", error.message);
    }
  };
  return (
    <ScreenWrapper bg={"white"}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        <View style={styles.form}>
          {/* <Text
            style={{
              fontSize: hp(1.5),
              color: theme.colors.text,
              marginLeft: wp(1),
            }}
          >
            Please login to countinue
          </Text> */}
          <Input
            icon={
              <Icon
                name="mail"
                color={theme.colors.textLight}
                strokeWidth={1.6}
              />
            }
            placeholder="Enter Your email"
            onChangeText={(val) => (emailRef.current = val)}
          />
          <Input
            icon={
              <Icon
                name="lock"
                color={theme.colors.textLight}
                strokeWidth={1.6}
              />
            }
            placeholder="Enter Your Password"
            onChangeText={(val) => (passRef.current = val)}
            secureTextEntry
          />

          <Text style={styles.forgotPass}>Forgot Password??</Text>

          <Button title={"Login"} onPress={onSubmit} loading={loading} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Dont have an account?</Text>
          <Pressable onPress={() => router.push("SignUp")}>
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.primary,
                  fontWeight: theme.fonts.extraBold,
                },
              ]}
            >
              SignUp
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  welcomeText: {
    fontSize: hp(4),

    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },

  form: {
    gap: 25,
  },

  forgotPass: {
    textAlign: "center",
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});
