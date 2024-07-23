import { View, Text, Button } from "react-native";
import React from "react";
import { Redirect, useRouter } from "expo-router";
import ScreenWrapper from "../components/ScreenWrapper";

const index = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      {/* <Button title="Welcome" onPress={() => router.push("Welcome")} /> */}
      <Redirect href="Welcome" />
    </ScreenWrapper>
  );
};

export default index;
