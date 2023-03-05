import { Button, Text, View, StyleSheet } from "react-native";
import AppButton, { convertNomenToColors } from "../components/AppButton";
import BreakLine from "../components/BreakLine";

export default function LandingPage({ navigation }) {
  return (
    <>
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
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    fontFamily: "Mulish",
    paddingLeft:30,
    paddingRight:30,
  },
  text: {
    fontFamily: "MulishBold",
    fontSize: 40,
  },
  textDown: {
    fontFamily: "MulishBold",
    fontSize: 20,
  },
  subText: {
    fontFamily: "Mulish",
    fontSize: 20,
  },
  subSubText: {
    fontFamily: "Mulish",
    fontSize: 17,
  },
  button: {
    marginTop: 30,
  },
});
