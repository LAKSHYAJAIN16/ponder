import { useState } from "react";
import { Button, Text, View, StyleSheet, TextInput, Image } from "react-native";
import axios from "axios";

import AppButton, { convertNomenToColors } from "../components/AppButton";
import BreakLine from "../components/BreakLine";
import api from "../lib/api";
import ls from "../lib/ls";

export default function SignupPage({ updateState, path, cur }) {
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [uiState, setUiState] = useState(0);

  async function verifyPhoneNumber() {
    //TODO : Add Verification
    //RN, there are no bots! Les go!
    setUiState(1);
  }

  async function finishSignup(){
    const payload = {
      username : username,
      phone : phone,
    }

    //Send to API!
    try{
      const res = await axios.post(`${api.route}/users/create`, payload);
      console.log(res.data);

      //Save to LocalStorage
      await ls.edit("user", res.data);

      //Forward to signup page
      updateState("/main");
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      {cur === path && (
        <View style={styles.container}>
          <Text style={styles.text}>signup</Text>
          <BreakLine />
          {uiState === 0 && (
            <>
              <TextInput
                placeholder="enter phone number"
                style={styles.input}
                onChangeText={(newText) => setPhone(newText)}
              ></TextInput>
              <BreakLine />
              <AppButton
                color={convertNomenToColors("yellow")}
                title="verify phone number"
                onPress={() => verifyPhoneNumber()}
              ></AppButton>
            </>
          )}

          {uiState === 1 && (
            <>
              <Image
                source={{
                  uri: `https://avatars.dicebear.com/api/adventurer-neutral/${phone}.png`,
                }}
                style={styles.profpic}
              ></Image>
              <TextInput
                placeholder="enter username"
                style={styles.input}
                onChangeText={(newText) => setUsername(newText)}
              ></TextInput>
              <BreakLine />
              <AppButton
                color={convertNomenToColors("yellow")}
                title="finish signup"
                onPress={() => finishSignup()}
              ></AppButton>
            </>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Mulish",
  },
  text: {
    fontFamily: "MulishBold",
    fontSize: 70,
  },
  subText: {
    fontFamily: "Mulish",
    fontSize: 15,
  },
  button: {
    marginTop: 30,
  },
  input: {
    height: 50,
    fontSize: 17,
    fontFamily: "Mulish",
  },
  profpic : {
    width: 100,
    height: 100,
    borderRadius:25,
  }
});