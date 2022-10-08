import { StyleSheet, Button, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Administration from "./Administration";
import DrawerContent from "../../Navigation/DrawerContent";
import { NavigationContainer } from "@react-navigation/native";
import AdminDashboard from "./AdminDashboard";
import OrpahansSection from "../OrphansSection";
import EducationSection from "../EducationSection";
import HealthSection from "../HealthSection";
import KofaSection from "../KofaSection";
import WidowSection from "../WidowSection";
import ActivitiesSection from "../AvtivitiesSection";
import InformationSection from "../InformationsSection";
import FinanceSection from "../Finance";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { RegisterToken } from "../../api/user";
import { useSelector } from "react-redux";
const Drawer = createDrawerNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Dashboard(props) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const user=useSelector((state) => state.Auth).id
  useEffect(() => {
    registerForPushNotificationsAsync(user).then((token) => {
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <React.Fragment>
      <NavigationContainer>
        <Drawer.Navigator
          drawerPosition="right"
          drawerContent={(prop) => (
            <DrawerContent {...prop} pageHandler={props.PageHandler} />
          )}
          screenOptions={{ headerShown: false }}
          initialRouteName="ActivitiesSection"
        >
          <Drawer.Screen name="Home">
            {(props) => (
              <AdminDashboard {...props} pageHandler={props.pageHandler} />
            )}
          </Drawer.Screen>
          <Drawer.Screen name="Administration">
            {(props) => (
              <Administration {...props} pageHandler={props.pageHandler} />
            )}
          </Drawer.Screen>
          <Drawer.Screen name="OrpahansSection">
            {(props) => (
              <OrpahansSection {...props} pageHandler={props.pageHandler} />
            )}
          </Drawer.Screen>
          <Drawer.Screen name="EducationSection">
            {(props) => (
              <EducationSection {...props} pageHandler={props.pageHandler} />
            )}
          </Drawer.Screen>
          <Drawer.Screen name="HealthSection">
            {(props) => (
              <HealthSection {...props} pageHandler={props.pageHandler} />
            )}
          </Drawer.Screen>
          <Drawer.Screen name="KofaSection">
            {(props) => (
              <KofaSection {...props} pageHandler={props.pageHandler} />
            )}
          </Drawer.Screen>
          <Drawer.Screen name="WidowSection">
            {(props) => (
              <WidowSection {...props} pageHandler={props.pageHandler} />
            )}
          </Drawer.Screen>
          <Drawer.Screen name="ActivitiesSection">
            {(props) => (
              <ActivitiesSection {...props} pageHandler={props.pageHandler} />
            )}
          </Drawer.Screen>
          <Drawer.Screen name="InformationSection">
            {(props) => (
              <InformationSection {...props} pageHandler={props.pageHandler} />
            )}
          </Drawer.Screen>
          <Drawer.Screen name="FinanceSection">
            {(props) => (
              <FinanceSection {...props} pageHandler={props.pageHandler} />
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 35,
    backgroundColor: "#232e42",
  },
  sidebar: {},
});

async function registerForPushNotificationsAsync(user) {
  console.log("tokeen user",user)
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    RegisterToken(token, user);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
