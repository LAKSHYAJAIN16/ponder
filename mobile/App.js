import { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import HomePage from "./pages/Home";
import SignupPage from "./pages/Signup";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };
export default function App() {
  const [currentNavigation, setCurrentNavigation] = useState("/home");
  const [fontsLoaded] = useFonts({
    Mulish: require("./assets/fonts/Mulish.ttf"),
    MulishBold : require("./assets/fonts/Mulish-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Getting Systems Ready....</Text>
      </View>
    );
  }

  // The heart of the navigation system
  function updateNavigation(payload) {
    setCurrentNavigation(payload);
  }

  return (
    <>
      <HomePage
        cur={currentNavigation}
        updateState={updateNavigation}
        path="/home"
      />
      <SignupPage
        cur={currentNavigation}
        updateState={updateNavigation}
        path="/signup"
      />
    </>
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
