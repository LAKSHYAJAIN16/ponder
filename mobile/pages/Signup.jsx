import { Button, Text, View } from "react-native";

export default function SignupPage({ updateState, path, cur }) {
  return (
    <View>
      {cur === path && (
        <>
          <Text>Wadup!</Text>
          <Button
            title="Change to Home Page"
            onPress={() => updateState("/home")}
          ></Button>
        </>
      )}
    </View>
  );
}
