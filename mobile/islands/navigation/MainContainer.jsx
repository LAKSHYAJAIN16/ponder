import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "./screens/HomeScreen";
import TopicsScreen from "./screens/TopicsScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import CreateTopic from "../independent/CreateTopic";
import UserScreen from "./screens/UserScreen";
import queryGet from "../../lib/queryGet";
import ls from "../../lib/ls";

//Screen names
const homeName = "home";
const createName = "debate";
const notificationsName = "notifications";
const userName = "user";

const Tab = createBottomTabNavigator();

function MainContainer() {
  const [unread, setUnread] = React.useState(0);
  React.useEffect(() => {
    const init = async() => {
      const f = await ls.get("user", true)
      const l = await ls.get("lastloggedin", true);
      console.log(l);
      console.log(f["ref"]["@ref"]["id"]);
      if(l){
        queryGet(
          (val) => {
            console.log(val);
            setUnread(val.count);
            ls.edit("lastloggedin", Date.now());
          },
          (val) => {
            console.log(val);
            setUnread(val.count);
            ls.edit("lastloggedin", Date.now());
          },
          `unread:${f["ref"]["@ref"]["id"]}`,
          `/notifications/unread?user=${f["ref"]["@ref"]["id"]}&last=${l}`
        )
      }
      else{
        ls.edit("lastloggedin", Date.now());
      }
    }
    init();
  }, [])
  
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        headerMode="none"
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home-outline" : "home-outline";
            } else if (rn === createName) {
              iconName = focused ? "chatbox-outline" : "chatbox-outline";
            } else if (rn === notificationsName) {
              iconName = focused
                ? "notifications-outline"
                : "notifications-outline";
            }

            if (route !== "createTopic") {
              return <Ionicons name={iconName} size={size} color={color} />;
            } else {
              return <></>;
            }
          },
          tabBarHideOnKeyboard: true,
        })}
        tabBarOptions={{
          activeTintColor: "#A03E99",
          inactiveTintColor: "grey",
          labelStyle: {
            paddingBottom: 0,
            fontSize: 10,
            fontFamily: "MulishBold",
          },
        }}
      >
        <Tab.Screen
          name={homeName}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name={createName}
          component={TopicsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={notificationsName}
          component={NotificationsScreen}
          options={{
            headerShown: false,
            tabBarBadge: unread,
            tabBarBadgeStyle: { fontFamily: "MulishBold", backgroundColor:"rgba(160, 62, 153, 0.1)", color:"rgb(160, 62, 153)", display:unread == 0 ? "none" : "flex"},
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
