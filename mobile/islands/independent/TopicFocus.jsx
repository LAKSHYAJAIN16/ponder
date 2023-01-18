import { useEffect, useState, useRef } from "react";
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
import axios from "axios";
import api from "../../lib/api";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import ls from "../../lib/ls";
import AppButton, { convertNomenToColors } from "../../components/AppButton";
import queryGet from "../../lib/queryGet";

const width = Dimensions.get("window").width;
export default function TopicFocus({ route, navigation }) {
  const [topic, setTopic] = useState({ data: { temp: {} } });
  const [voteData, setVoteData] = useState({
    against: { num: 0 },
    for: { num: 0 },
    neutral: { num: 0 },
  });
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({ data: {} });
  const [stance, setStance] = useState("");
  const [stateOfInput, setStateOfInput] = useState(0);

  const textInput = useRef();

  useEffect(() => {
    const init = async () => {
      //Topicc
      const t = JSON.parse(route.params.topic);
      setTopic(t);

      //User
      const us = await ls.get("user", true);
      setUser(us);

      // Textual Data
      queryGet(
        (data) => {
          setPosts(data.data);
        },
        (data) => {
          setPosts(data.data);
        },
        `${t["data"]["id"]}~postTextualData`,
        `/votes/textual/get/topic?id=${t["data"]["id"]}`
      );

      //Votes
      queryGet(
        (data) => {
          console.log(data);
          setVoteData(data);
        },
        (data) => {
          console.log(data);
          setVoteData(data);
        },
        `${t["data"]["id"]}~voteData`,
        `/votes/get/topic?id=${t["data"]["id"]}`
      );

      //View
      const payload = {
        user: us["data"]["id"],
        topic: t["data"]["id"],
      };

      // const res = await axios.post(api.route + "/views/viewTopic", payload);
      // console.log("Registered View");
    };
    init();
  }, []);

  const post = async () => {
    textInput.current.clear();

    //Assemble payload
    const payload = {
      topicID: topic["data"]["id"],
      userID: user["data"]["id"],
      body: message,
      intent: stance,
      temp: {
        userPfpic: user["data"]["pfpic"],
        username: user["data"]["username"],
        topicName: topic["data"]["topic"],
      },
    };

    //Axios
    const res = await axios.post(api.route + "/votes/textual/post", payload);
    console.log(res.data);
  };

  const vote = async (stancey) => {
    setStance(stancey);
    setStateOfInput(2);

    //Cast Vote in favour of stance
    const payload = {
      intent: stancey,
      userID: user["data"]["id"],
      topicID: topic["data"]["id"],
      temp: {
        userPfpic: user["data"]["pfpic"],
        username: user["data"]["username"],
        topicName: topic["data"]["topic"],
      },
    };
    const res = await axios.post(api.route + "/votes/vote", payload);
    console.log(res.data);
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
          {/* <Image
            style={styles.userImage}
            source={{ uri: topic["data"]["temp"]["userPfpic"] }}
          />
          <Text style={styles.username}>
            {topic["data"]["temp"]["username"]} | started{" "}
            {moment(topic["data"]["toc"]).fromNow()}
          </Text> */}
        </View>

        {/* For and Against Text */}
        <Text style={styles.action}>
          <Text style={{ color: "green" }}>for {voteData.for.num} </Text>
          <Text>|</Text>
          <Text style={{ color: "grey" }}>
            {" "}
            neutral {voteData.neutral.num}{" "}
          </Text>
          <Text>|</Text>
          <Text style={{ color: "red" }}> against {voteData.against.num} </Text>
        </Text>

        {/* Actual Posts */}
        <View style={styles.postsMain}>
          {posts.map((e) => (
            <View style={styles.postAct}>
              {e["data"]["msg"]["voteType"] === "for" && (
                <>
                  <Image
                    style={styles.postPfpic}
                    source={{ uri: e["data"]["temp"]["userPfpic"] }}
                  />
                  <View style={styles.postRight}>
                    <Text style={styles.postName}>
                      {e["data"]["temp"]["username"]}
                    </Text>
                    <Text style={{ ...styles.postBody, color: "green" }}>
                      {e["data"]["msg"]["body"]}
                    </Text>
                  </View>
                </>
              )}
              {e["data"]["msg"]["voteType"] === "neutral" && (
                <>
                  <Image
                    style={styles.postPfpic}
                    source={{ uri: e["data"]["temp"]["userPfpic"] }}
                  />
                  <View style={styles.postRight}>
                    <Text style={styles.postName}>
                      {e["data"]["temp"]["username"]}
                    </Text>
                    <Text style={{ ...styles.postBody, color: "grey" }}>
                      {e["data"]["msg"]["body"]}
                    </Text>
                  </View>
                </>
              )}
              {e["data"]["msg"]["voteType"] === "against" && (
                <>
                  <View style={{ marginLeft: 0 }}>
                    <Text style={{ ...styles.postName, textAlign: "right" }}>
                      {e["data"]["temp"]["username"]}
                    </Text>
                    <Text
                      style={{
                        ...styles.postBody,
                        color: "red",
                        textAlign: "right",
                      }}
                    >
                      {e["data"]["msg"]["body"]}
                    </Text>
                  </View>
                  <Image
                    style={{ ...styles.postPfpic, marginLeft: 7 }}
                    source={{ uri: e["data"]["temp"]["userPfpic"] }}
                  />
                </>
              )}
            </View>
          ))}
        </View>

        {/* Vote / Write Your Opinion */}
        <View style={{ ...styles.bottom }}>
          <View style={{ ...styles.hFlex, left: "auto", right: "auto" }}>
            {stateOfInput === 0 && (
              <>
                <AppButton
                  color={convertNomenToColors("yellow")}
                  title="choose your stance"
                  onPress={() => setStateOfInput(1)}
                ></AppButton>
              </>
            )}
            {stateOfInput === 1 && (
              <View>
                <AppButton
                  color={convertNomenToColors("green")}
                  title="for"
                  onPress={() => vote("for")}
                  style={{ marginBottom: 10 }}
                ></AppButton>
                <AppButton
                  color={convertNomenToColors("grey")}
                  title="neutral"
                  onPress={() => vote("neutral")}
                  style={{ marginBottom: 10 }}
                ></AppButton>
                <AppButton
                  color={convertNomenToColors("red")}
                  title="against"
                  onPress={() => vote("against")}
                  style={{ marginBottom: 10 }}
                ></AppButton>
              </View>
            )}
            {stateOfInput === 2 && (
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
                    ref={textInput}
                    onChangeText={(text) => setMessage(text)}
                  ></TextInput>
                  <Text
                    style={styles.textInputPostButton}
                    onPress={() => post()}
                  >
                    Post
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
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
    position: "absolute",
    bottom: 0,
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
    minWidth: width * 0.7,
    width: width * 0.7,
    maxWidth: width * 0.7,
  },
  textInputPostButton: {
    fontFamily: "MulishBold",
    color: "black",
  },
  stance: {
    textAlign: "center",
    fontFamily: "MulishBold",
  },
  postAct: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  postPfpic: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  postsMain: {
    marginTop: 30,
  },
  postRight: {
    marginLeft: 10,
  },
  postName: {
    fontFamily: "MulishBold",
  },
  postBody: {
    fontFamily: "Mulish",
    fontSize: 17,
    width: width * 0.8,
  },
});
