import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Badge({ onPress, text, color, icon }) {
  return (
    <Pressable onPress={onPress}>
      <View style={{ ...styles.badge, borderColor: color }}>
        <Ionicons name={icon} size={15} color={color} />
        <Text style={{ ...styles.badgeText, color: color }}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: {
    display: "flex",
    flexDirection: "row",
    alignitems: "center",
    borderWidth: 1,
    borderRadius: 25,
    padding: 3,
  },
  badgeText: {
    fontFamily: "MulishBold",
    fontSize: 13,
  },
});
