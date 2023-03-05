import { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomePage from "./pages/Home";
import SignupPage from "./pages/Signup";
import LandingPage from "./pages/Landing";
import MainPage from "./pages/Main";
import CreateTopic from "./islands/independent/CreateTopic";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Mulish: require("./assets/fonts/Mulish.ttf"),
    MulishBold: require("./assets/fonts/Mulish-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Getting Systems Ready....</Text>
      </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landing"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        {/* <HomePage
          cur={currentNavigation}
          updateState={updateNavigation}
          path="/home"
        />
        <SignupPage
          cur={currentNavigation}
          updateState={updateNavigation}
          path="/signup"
        />
        <LandingPage
          cur={currentNavigation}
          updateState={updateNavigation}
          path="/landing"
        />
        <MainPage
          cur={currentNavigation}
          updateState={updateNavigation}
          path="/main"
        />
        <CreateTopic
          cur={currentNavigation}
          updateState={updateNavigation}
          path="/create-topic"
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
