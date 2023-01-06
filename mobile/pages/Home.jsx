import { Button, Text, View, StyleSheet } from "react-native";
import AppButton, { convertNomenToColors } from "../components/AppButton";

export default function HomePage({ updateState, path, cur }) {
  useEffect(() => {
    //Check if we are logged in
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
