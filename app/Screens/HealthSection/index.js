import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import HealthSectionBottomBar from "../../Navigation/HealthSectionBottomBar.js";
import Members from "./Members.jsx";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
export default function HealthSection({ navigation }) {
  return (
    <>
     <Stack.Navigator
      initialRouteName="HealthMembers"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "vertical",
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={slideFromRight}
        name="HealthMembers"
        component={Members}
      />
 
    </Stack.Navigator>
    </>
   
  );
}
