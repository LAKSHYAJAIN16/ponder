import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";

export default function CreateScreen({ navigation, route }) {
  function goToAdd(){
    console.log(route);
    const { updateState }= route.params;
    updateState("/create-topic");
  }
  
  return (
    <View style={styles.main}>
      {/* Top */}
      <View style={styles.nav}>
        <Text style={styles.text}>topics</Text>
        <TouchableOpacity style={styles.add} onPress={()=>goToAdd()}>
          <Ionicons name="add-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingLeft: 20,
    marginTop: 50,
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom:20,
  },
  text: {
    fontFamily: "MulishBold",
    textTransform: "lowercase",
    fontSize: 22,
  },
  add: {
    marginLeft: "auto",
    paddingRight: 20,
  },
});
