import { Button, Text, View, StyleSheet } from "react-native";
import AppButton, { convertNomenToColors } from "../components/AppButton";

import Icon from "../components/Icon";
import UserProfilePicture from "../islands/UserProfilePicture";

export default function MainPage({ updateState, path, cur }) {
  return (
    <>
      {cur === path && (
        <View style={styles.container}>
          <View style={styles.navbar}>
            <Text
              style={styles.text}
              onPress={() => console.log("back to main")}
            >
              ponder
            </Text>
            <View style={styles.rightNav}>
                <Icon img={require("../assets/search.png")} size={23}/>
                <UserProfilePicture />
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    marginTop: 50,
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "Mulish",
    fontSize: 25,
  },
  subText: {
    fontFamily: "Mulish",
    fontSize: 15,
  },
  button: {
    marginTop: 30,
  },
  rightNav: {
    marginLeft: "auto",
    paddingRight: 30,
    display:"flex",
    flexDirection:"row",
  },
  icon: {},
});
