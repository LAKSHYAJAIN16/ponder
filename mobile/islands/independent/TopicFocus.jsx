import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import ls from "../../lib/ls";
import AppButton, { convertNomenToColors } from "../../components/AppButton";

const width = Dimensions.get("window").width;
export default function TopicFocus({ route, navigation }) {
  const [topic, setTopic] = useState({ data: { temp: {} } });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({ data: {} });
  const [stateOfInput, setStateOfInput] = useState(0);

  useEffect(() => {
    const init = async () => {
      console.log(route.params.topic);
      setTopic(JSON.parse(route.params.topic));
      const us = await ls.get("user", true);
      setUser(us);
    };
    init();
  }, []);

  const post = async () => {
    console.log(message);
  };

  const forOrAgainst = async () => {
    console.log("choose your stance");
  };

  return (
    <>
      <View style={styles.main}>
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
        <View style={{ ...styles.hFlex, marginTop: 3 }}>
          <Image
            style={styles.userImage}
            source={{ uri: topic["data"]["temp"]["userPfpic"] }}
          />
          <Text style={styles.username}>
            {topic["data"]["temp"]["username"]} | started{" "}
            {moment(topic["data"]["toc"]).fromNow()}
          </Text>
        </View>

        {/* For and Against Text */}
        <Text style={styles.action}>
          <Text style={{ color: "green" }}>for 1 </Text>
          <Text>|</Text>
          <Text style={{ color: "grey" }}> neutral 1 </Text>
          <Text>|</Text>
          <Text style={{ color: "red" }}> against 1 </Text>
        </Text>

        {/* Vote / Write Your Opinion */}
        {stateOfInput === 0 && (
          <View style={{ ...styles.bottom }}>
            <AppButton color={convertNomenToColors("yellow")} title="choose your stance"></AppButton>
          </View>
        )}
        {stateOfInput === 1 && (
          <View style={{ ...styles.bottom }}>
            <View style={styles.hFlex}>
              <Image
                source={{ uri: user["data"]["pfpic"] }}
                style={styles.userPfpic}
              />
              <View style={styles.hFlex}>
                <TextInput
                  placeholder="Share your views"
                  style={styles.textInputShare}
                  multiline={true}
                  onChangeText={(text) => setMessage(text)}
                ></TextInput>
                <Text style={styles.textInputPostButton} onPress={() => post()}>
                  Post
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 50,
    flex: 1,
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
    alignItems: "center",
  },
  username: {
    fontFamily: "Mulish",
    textTransform: "lowercase",
    paddingLeft: 3,
  },
  action: {
    fontFamily: "MulishBold",
    fontSize: 23,
    textAlign: "center",
    marginTop: 5,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 10,
    paddingRight: 10,
  },
  userPfpic: {
    width: 30,
    height: 30,
    borderRadius: 25,
  },
  textInputShare: {
    paddingLeft: 10,
    fontFamily: "MulishBold",
    color: convertNomenToColors("yellow"),
    minWidth: width * 0.6,
    width: width * 0.6,
    maxWidth: width * 0.6,
  },
  textInputPostButton: {
    fontFamily: "MulishBold",
    color: "blue",
  },
  stance : {
    textAlign:"center",
    fontFamily:"MulishBold",
  }
});
