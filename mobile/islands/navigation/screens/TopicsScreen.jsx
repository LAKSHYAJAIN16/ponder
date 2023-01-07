import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CreateTopic from "../../independent/CreateTopic";
import MainTopicUI from "../../independent/MainTopicUI";
import TopicFocus from "../../independent/TopicFocus";

const Stack = createStackNavigator();
export default function TopicsScreen({ navigation }) {
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainTopicUI}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateModal"
            component={CreateTopic}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TopicFocus"
            component={TopicFocus}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
