import { Button, Text, View, StyleSheet } from "react-native";
import AppButton, { convertNomenToColors } from "../components/AppButton";
import BreakLine from "../components/BreakLine";

export default function LandingPage({ updateState, path, cur }) {
  return (
    <>
      {cur === path && (
        <View style={styles.container}>
          <Text style={styles.text}>the internet is chaotic.</Text>
          <BreakLine />
          <Text style={styles.subText}>
            full of fake news, toxic stans, angry 60 year old grandpas and more.{" "}
          </Text>
          <BreakLine />
          <Text style={styles.subSubText}>
            Amidst all of this disorder, actual debate and content is getting
            lost.
          </Text>
          <BreakLine />
          <Text style={styles.textDown}>we're here to fix that</Text>
          <BreakLine />
          <AppButton
            color={convertNomenToColors("yellow")}
            title="continue"
            onPress={() => updateState("/signup")}
          />
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
    fontSize: 40,
    textAlign: "center",
  },
  textDown: {
    fontFamily: "MulishBold",
    fontSize: 20,
    textAlign: "center",
  },
  subText: {
    fontFamily: "Mulish",
    fontSize: 20,
    textAlign: "center",
  },
  subSubText: {
    fontFamily: "Mulish",
    fontSize: 17,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
  },
});
