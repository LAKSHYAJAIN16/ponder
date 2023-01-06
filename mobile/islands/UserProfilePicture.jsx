import { View, Text, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

export default function UserProfilePicture({style}) {
  const [img, setImg] = useState(
    "https://cdn-icons-png.flaticon.com/512/456/456212.png"
  );
  useEffect(() => {}, []);

  return (
    <View style={{...styles.imageContainer, ...style}}>
      <Image source={{ uri: img }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 25,
    paddingLeft:4,
    paddingRight:4,
    paddingTop:4,
    paddingBottom:4,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  image: {
    width: 23,
    height: 23,
  },
});
