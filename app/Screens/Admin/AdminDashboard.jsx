import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Users from "./Users.jsx";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import AddUser from "../../Forms/AddUser.jsx";
import Families from "./Famillies.jsx";
import AddFamily from "../../Forms/AddFamily.jsx";
import FamilyScreen from "../Famillies/Family.jsx";
const Stack = createStackNavigator();
export default function AdminDashboard() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Famillies"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "vertical",
          headerShown: false,
        }}
      >
        <Stack.Screen
          options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
          name="AddUser"
          component={AddUser}
        />
        <Stack.Screen
          options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
          name="AddFamily"
          component={AddFamily}
        />
        <Stack.Screen
          options={{ ...TransitionPresets.SlideFromRightIOS }}
          name="Users"
          component={Users}
        />
        <Stack.Screen
          options={{ ...TransitionPresets.SlideFromRightIOS }}
          name="Famillies"
          component={Families}
        />
        <Stack.Screen
          options={{ ...TransitionPresets.ModalSlideFromBottomIOS }}
          name="Family"
          component={FamilyScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
