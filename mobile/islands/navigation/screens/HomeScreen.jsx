import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Badge from "../../../components/Badge";
import getTimeOfDay from "../../../lib/getTimeOfDay";

import ls from "../../../lib/ls";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState({ data: {}, ref: {} });
  useEffect(() => {
    const init = async () => {
      const user = await ls.get("user", true);
      console.log(user);
      setUser(user);
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.text}>
          good {getTimeOfDay()}, {user.data.username}
        </Text>

        {/* The Badges for trending and followers */}
        <View style={styles.badges}>
          <Badge color={"red"} text={"trending"} icon="flame-outline" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    marginTop: 50,
  },
  navbar: {
    display: "flex",
  },
  text: {
    fontFamily: "MulishBold",
    textTransform: "lowercase",
    fontSize: 20,
  },
  badges: {
    display: "flex",
    flexDirection: "row",
    marginTop: 4,
  },
});
