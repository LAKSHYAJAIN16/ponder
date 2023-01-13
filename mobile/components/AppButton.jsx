import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function AppButton({ onPress, title, color, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.appButtonContainer,
        ...style,
        backgroundColor: color,
      }}
    >
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function convertNomenToColors(nomen) {
  switch (nomen) {
    case "turq":
      return "#86A873";
    case "yellow":
      return "#A03E99";
    case "green":
      return "green";
    case "red":
      return "red";
    case "grey":
      return "#808080"
    default:
      return "#009688";
  }
}
const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    textTransform: "lowercase",
    fontFamily: "MulishBold",
  },
});
