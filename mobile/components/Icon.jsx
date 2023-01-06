import { Image } from "react-native";

export default function Icon({ size, onPress, img }) {
  return (
    <Image source={img} style={{ width: size, height: size }}></Image>
  );
}
