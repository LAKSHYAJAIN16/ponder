import { useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import AppButton, { convertNomenToColors } from "../components/AppButton";
import ls from "../lib/ls";


export default function HomePage({ updateState, path, cur }) {
  useEffect(() => {
    //Check if we are logged in
    const init = async() => {
      //Get Loggedin variable
      const isLogged = await ls.get("logged");
      console.log(isLogged);

      if(isLogged){
        if(isLogged === "1"){
          //Move to main page!
          updateState("/main");
        }
        else{
          // pogchamp! we signed out!
        }
      }
      else{
        // we are not logged in, first instance
      }
    }

    init();
  }, [])
  
  return (
    <>
      {cur === path && (
        <View style={styles.container}>
          <Text style={styles.text}>ponder</Text>
          <Text style={styles.subText}>
            of the people, by the people and for the people
          </Text>

          <AppButton
            title={"Start Now"}
            color={convertNomenToColors("yellow")}
            style={styles.button}
            onPress={() => updateState("/landing")}
          ></AppButton>
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
    fontFamily: "Mulish",
    fontSize: 90,
  },
  subText: {
    fontFamily: "Mulish",
    fontSize: 15,
  },
  button: {
    marginTop: 30,
  },
});
