import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import {
  setStatusBarBackgroundColor,
  setStatusBarStyle,
} from "expo-status-bar";
import { useEffect } from "react";
import { theme } from "../constants/theme";
import { AuthProvider, useAuth } from "../Contexts/AuthContext";
import { supabase } from "../lib/Supabase";
import { getUserData } from "../Services/userService";

const _layout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Semibold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Kanit-Regular": require("../assets/fonts/Kanit-Regular.ttf"),
    "Kanit-Medium": require("../assets/fonts/Kanit-Medium.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setStatusBarStyle("light");
      setStatusBarBackgroundColor(theme.colors.text);
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

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
