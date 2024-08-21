import { View, Text, Alert } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import Button from "../../components/Button";
import { useAuth } from "../../Contexts/AuthContext";
import { supabase } from "../../lib/Supabase";

const Home = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Sign out Error", error.message);
    }
  };
  return (
    <ScreenWrapper>
      <Text>Home</Text>
      <Button title={"Logout"} onPress={logout} />
    </ScreenWrapper>
  );
};

export default Home;
