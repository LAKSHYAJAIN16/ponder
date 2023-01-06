import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Badge({ onPress, text, color, icon, selectedCol }) {
  const [selected, setSelected] = useState(false);

  const click = () => {
    setSelected(!selected);
    onPress();
  }

  return (
    <Pressable onPress={()=> click()}>
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
    justifyContent:"center",
    borderWidth: 1,
    borderRadius: 25,
    padding: 3,
    marginRight:7,
  },
  badgeText: {
    fontFamily: "MulishBold",
    fontSize: 10,
  },
});
