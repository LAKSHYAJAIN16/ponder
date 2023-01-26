import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import queryGet from "../../lib/queryGet";

export default function MainTopicUI({ navigation }) {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    //Query API to get all of the documents
    fetch();
  }, []);

  const fetch = async () => {
    queryGet(
      (data) => {
        setTopics(data["data"]);
      },
      (data) => {
        setTopics(data["data"]);
      },
      "main-topics",
      "/topics/getAll"
    );
  };

  const focus = (e) => {
    navigation.navigate("TopicFocus", {
      topic: JSON.stringify(e),
    });
  };

  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      {/* Top */}
      <View style={styles.nav}>
        <Text style={styles.text}>discussions</Text>
        <View style={styles.add}>
          <TouchableOpacity onPress={() => fetch()} style={{ marginLeft: 10 }}>
            <Ionicons name="refresh-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom */}
      {topics.map((e) => (
        <Pressable onPress={() => focus(e)}>
          <View style={styles.mainSingle}>
            <Image
              source={{ uri: e["data"]["img"] }}
              style={styles.singleImage}
            />
            <View style={styles.single}>
              <View style={{ paddingLeft: 5 }}>
                <Text style={styles.singleText}>{e["data"]["topic"]}</Text>
                <Text style={styles.singleDesc}>
                  {e["data"]["description"]}
                </Text>

                <Text style={styles.singleVotes}>
                  <Text style={{ color: "green" }}>5 for | </Text>
                  <Text style={{ color: "red" }}>5 against</Text>
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
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
    marginBottom: 30,
  },
  text: {
    fontFamily: "MulishBold",
    textTransform: "lowercase",
    fontSize: 22,
  },
  add: {
    marginLeft: "auto",
    paddingRight: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  single: {
    marginBottom: 40,
    display: "flex",
    flexDirection: "row",
  },
  singleImage: {
    width: "100%",
    height: 200,
    borderRadius:10,
  },
  singleText: {
    fontFamily: "MulishBold",
    fontSize: 20,
  },
  singleDesc: {
    fontFamily: "Mulish",
    fontSize: 17,
  },
  singleVotes: {
    marginTop: 5,
    fontFamily: "Mulish",
    fontSize: 16,
  },
  mainSingle: {
    display: "flex",
    paddingRight: 20,
  },
});
