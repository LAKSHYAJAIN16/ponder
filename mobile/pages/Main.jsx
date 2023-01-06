import { Button, Text, View, StyleSheet } from "react-native";
import AppButton, { convertNomenToColors } from "../components/AppButton";

import Icon from "../components/Icon";
import MainContainer from "../islands/navigation/MainContainer";
import UserProfilePicture from "../islands/UserProfilePicture";

export default function MainPage({ updateState, path, cur }) {
  return (
    <>
      {cur === path && (
        <MainContainer />
      )}
    </>
  );
}
