import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function TopicFocus({ route, navigation }) {
  const [topic, setTopic] = useState({ data: { temp: {} } });
  useEffect(() => {
    console.log(route.params.topic);
    setTopic(JSON.parse(route.params.topic));
  }, []);

  return (
    <>
      <ScrollView style={styles.main}>
        {/* Navbar boring */}
        <View style={styles.nav}>
          <Pressable onPress={() => navigation.navigate("Main")}>
            <Ionicons name="arrow-back-outline" size={30} />
          </Pressable>
          <Text style={styles.text}>discussion</Text>
        </View>

        {/* Main UI */}
        <Text style={styles.head}>{topic["data"]["topic"]}</Text>
        <Text style={styles.subHead}>{topic["data"]["description"]}</Text>
        <View style={styles.hFlex}>
          <Image
            style={styles.userImage}
            source={{ uri: topic["data"]["temp"]["userPfpic"] }}
          />
          <Text>{topic["data"]["temp"]["username"]}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 50,
  },
  text: {
    fontFamily: "MulishBold",
    textTransform: "lowercase",
    fontSize: 20,
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  head: {
    fontFamily: "MulishBold",
    textTransform: "lowercase",
    fontSize: 30,
    marginTop: 30,
  },
  subHead: {
    fontFamily: "Mulish",
    textTransform: "lowercase",
    fontSize: 20,
    marginTop: 3,
  },
  userImage: {
    marginTop: 2,
    width: 20,
    height: 20,
    borderRadius: 25,
  },
  hFlex: {
    display: "flex",
    flexDirection: "row",
  },
});
