import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { Home, Plus, User } from "../../assets/icons/CustomeIcons";
import { theme } from "../../constants/theme";

const TabLayout = () => {
  const TabIcon = ({ icon, color, name, focused }) => {
    let iconComponent = null;

    if (name === "Home") {
      iconComponent = focused ? (
        <Home color={theme.colors.primary} strokeWidth={1.6} />
      ) : (
        <Home color={theme.colors.textLight} strokeWidth={1.6} />
      );
    } else if (name === "Profile") {
      iconComponent = focused ? (
        <User color={theme.colors.primary} strokeWidth={1.6} />
      ) : (
        <User color={theme.colors.textLight} strokeWidth={1.6} />
      );
    } else if (name === "Create") {
      iconComponent = focused ? (
        <Plus color={theme.colors.primary} strokeWidth={1.6} />
      ) : (
        <Plus color={theme.colors.textLight} strokeWidth={1.6} />
      );
    }

    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // padding: 3,
          marginTop: 5,
        }}
      >
        <View>{iconComponent}</View>
        <Text
          style={{
            color: !focused ? theme.colors.textLight : theme.colors.primary,
            fontWeight: focused ? theme.fonts.bold : theme.fonts.medium,
            textAlign: "center",
            marginTop: 3,
            fontSize: 8,

          }}
        >
          {name}
        </Text>
      </View>
    );
  };
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 73,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={Home}
              color={theme.colors.primary}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Add"
        options={{
          headerShown: false,
          title: "Create",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={Plus}
              color={theme.colors.primary}
              name="Create"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={User}
              color={theme.colors.primary}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
