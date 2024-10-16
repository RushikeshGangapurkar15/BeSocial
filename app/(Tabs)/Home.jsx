import { View, Text, Alert, StyleSheet, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import Button from "../../components/Button";
import { useAuth } from "../../Contexts/AuthContext";
import { supabase } from "../../lib/Supabase";
import { hp, wp } from "../../Helpers/Common";
import { theme } from "../../constants/theme";
import Icon from "../../assets/icons/Index";
import { useRouter } from "expo-router";

const Home = () => {
  const { setAuth } = useAuth();
  const router = useRouter();

  return (
    <ScreenWrapper bg={"white"}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Be Social</Text>
          <View style={styles.icons}>
            <Pressable onPress={() => router.push("Notifications")}>
              <Icon
                name="bell"
                size={hp(3.4)}
                strokeWidth={2}
                color={theme.colors.textLight}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    color: theme.colors.textLight,
    fontSize: hp(3.8),
    fontWeight: theme.fonts.extraBold,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPost: {
    fontSize: hp(2),
    // paddingHorizontal:wp(4)
    alignItems: "center",
    color: theme.colors.text,
  },
  pill: {
    position: "absolute",
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: theme.colors.roseLightRed,
  },
  pillText: {
    color: "white",
    fontSize: hp(1.2),
    fontWeight: theme.fonts.bold,
  },
});
