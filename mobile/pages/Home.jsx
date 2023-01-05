import { Button, Text, View, StyleSheet } from "react-native";
import AppButton, { convertNomenToColors } from "../components/AppButton";

export default function HomePage({ updateState, path, cur }) {
  return (
    <>
      {cur === path && (
        <View style={styles.container}>
          <Text style={styles.text}>ponder</Text>
          <Text style={styles.subText}>the only sane debating platform</Text>

          <AppButton
            title={"Start Now"}
            color={convertNomenToColors("yellow")}
            style={styles.button}
            onPress={() => updateState("/signup")}
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
    fontSize: 70,
  },
  subText: {
    fontFamily: "Mulish",
    fontSize: 20,
  },
  button: {
    marginTop: 30,
  },
});
