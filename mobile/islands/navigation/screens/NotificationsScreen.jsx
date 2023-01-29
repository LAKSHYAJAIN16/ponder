import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import BreakLine from "../../../components/BreakLine";
import ls from "../../../lib/ls";
import queryGet from "../../../lib/queryGet";
import moment from "moment";

export default function NotificationsScreen({ navigation, route }) {
  const [notifs, setNotifs] = useState([]);
  useEffect(() => {
    const init = async () => {
      const f = await ls.get("user", true);
      console.log(f); 
      queryGet(
        (val) => {
          // setNotifs(sortNotifs(val.data));
        },
        (val) => {
          const sorted = sortNotifs(val.data);
          setNotifs(sorted);
        },
        `notifications~${f["data"]["id"]}`,
        `/notifications/get?user=${f["ref"]["@ref"]["id"]}`
      );
    };
    init();
  }, []);

  const sortNotifs = (notifs) => {
    const f = notifs.sort((a, b) => a["data"]["toc"] < b["data"]["toc"]);
    return f;
  }
  const redirect = (val) => {};
  return (
    <ScrollView style={styles.main}>
      <Text style={styles.txt}>notifications</Text>
      {/* <Text>{JSON.stringify(notifs)}</Text> */}

      <View style={styles.notifications}>
        {notifs.map((e) => (
          <Pressable onPress={() => redirect(e["data"]["id"])}>
            <View style={styles.nf}>
              <Image
                source={{ uri: e["data"]["temp"]["pfpic"] }}
                style={styles.nfp}
              />
              <View style={styles.nfr}>
                <Text style={styles.nftext}>{e["data"]["text"]}</Text>
                <Text style={styles.nfldata}>{moment(e["data"]["toc"]).fromNow()}</Text>
                <Text style={styles.nfltext}>
                  {e["data"]["temp"]["buf"].substring(0, 41) + "..."}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingLeft: 20,
    marginTop: 50,
  },
  txt: {
    fontFamily: "MulishBold",
    textTransform: "lowercase",
    fontSize: 22,
  },
  notifications: {
    marginTop: 20,
  },
  nf: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  nfp: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  nfr: {
    display: "flex",
    marginLeft: 10,
  },
  nftext: {
    fontFamily: "MulishBold",
  },
  nfltext: {
    fontFamily: "Mulish",
  },
  nfldata:{
    fontFamily:"MulishBold",
    fontSize:10,
    color:"#A03E99",
  }
});
