import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";
import axios from "axios";

import AppButton, { convertNomenToColors } from "../components/AppButton";
import ls from "../lib/ls";

export default function CreateTopic({ updateState, path, cur }) {
  const [user, setUser] = useState({data : {}});
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    //Get the User
    const init = async() => {
      const f = await ls.get("user", true);
      console.log(f);
      setUser(f);
    }
    init();
  }, [])
  
  function back(){
    updateState("/main");
  }

  async function create() {
    //Assemble Payload
    const payload = {
      user : user.ref["@ref"].id,
      topic : topic,
      description : description,
      username : user.data.username,
      userProfilePic : user.data.pfpic,
    }
    
    //Send to Backend boiz!
    try{
      const res = await axios.post(`${api.route}/topics/create`, payload);
      console.log(res.data);
    }
    catch(err){

    }
  }

  return (
    <>
      {cur === path && (
        <View style={styles.main}>
          <View style={styles.nav}>
            <Pressable onPress={()=>back()}>
              <Ionicons name="arrow-back-outline" size={30} />
            </Pressable>
            <Text style={styles.text}>create discussion</Text>
          </View>

          <Text style={styles.catHead}>Enter topic for discussion</Text>
          <TextInput
            placeholder="Enter Topic"
            style={styles.textInput}
            onChangeText={(text) => setTopic(text)}
          ></TextInput>

          <Text style={styles.catHead}>Enter description for discussion</Text>
          <TextInput
            placeholder="Enter Description"
            style={styles.textInput}
            onChangeText={(text) => setDescription(text)}
          ></TextInput>

          <AppButton
            color={convertNomenToColors("yellow")}
            title="next"
            style={{ marginTop: 40 }}
            onPress={() => create()}
          ></AppButton>
        </View>
      )}
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
    fontSize: 25,
  },
  nav: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  catHead: {
    fontFamily: "MulishBold",
    textTransform: "lowercase",
    fontSize: 15,
    marginBottom: 10,
    marginTop: 30,
  },
  textInput: {
    height: 30,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    fontFamily: "MulishBold",
    color: "#A03E99",
  },
});
