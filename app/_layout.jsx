import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../Contexts/AuthContext";
import { supabase } from "../lib/Supabase";
import { getUserData } from "../Services/userService";

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session?.user);
      if (session) {
        // nav to home and setAuth session
        setAuth(session?.user);
        updateUserData(session?.user, session?.user?.email);
        router.replace("Home");
      } else {
        // move to welcome
        setAuth(null);
        router.replace("/Welcome");
      }
    });
  }, []);

  const updateUserData = async (user, email) => {
    let res = await getUserData(user?.id);

    if (res.success) {
      setUserData({ ...res.data, email });
    }
    // console.log("Got userData: ", res);
  };

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
    </>
  );
};

export default _layout;
