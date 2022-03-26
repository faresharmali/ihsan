import React from "react";
import WassetDashboard from "./WassetDashboard";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
const scaleFromCenter = { ...TransitionPresets.ScaleFromCenterAndroid };
export default function Wasseet({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Informations"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "vertical",
          headerShown: false,
        }}
      >
        <Stack.Screen
          options={TransitionFromBottom}
          name="Dashboard"
          component={WassetDashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
