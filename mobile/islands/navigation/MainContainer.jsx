import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "./screens/HomeScreen";
import TopicsScreen from "./screens/TopicsScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import CreateTopic from "../independent/CreateTopic";

//Screen names
const homeName = "home";
const createName = "debate";
const notificationsName = "notifications";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        headerMode="none"
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home-outline" : "home-outline";
            } else if (rn === createName) {
              iconName = focused ? "chatbox-outline" : "chatbox-outline";
            } else if (rn === notificationsName) {
              iconName = focused
                ? "notifications-outline"
                : "notifications-outline";
            }

            if (route !== "createTopic") {
              return <Ionicons name={iconName} size={size} color={color} />;
            } else {
              return <></>;
            }
          },
          tabBarHideOnKeyboard: true
        })}
        tabBarOptions={{
          activeTintColor: "#A03E99",
          inactiveTintColor: "grey",
          labelStyle: {
            paddingBottom: 0,
            fontSize: 10,
            fontFamily: "MulishBold",
          },
        }}

      >
        <Tab.Screen
          name={homeName}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={createName}
          component={TopicsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={notificationsName}
          component={NotificationsScreen}
          options={{
            headerShown: false,
            // tabBarBadge: 4,
            // tabBarBadgeStyle: { fontFamily: "Mulish", backgroundColor:"rgba(0, 0, 0, 0.1)", color:"rgb(160, 62, 153)" },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
