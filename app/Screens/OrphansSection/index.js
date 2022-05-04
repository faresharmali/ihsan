import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import OrpahnsDonators from "./Donators.jsx";
import Families from "./Families.jsx";
import Members from "./Members.jsx";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
const scaleFromCenter = { ...TransitionPresets.ScaleFromCenterAndroid };
export default function OrpahansSection({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="OrpahnsDonators"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "vertical",
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={slideFromRight}
        name="OrpahnsDonators"
        component={OrpahnsDonators}
      />
      <Stack.Screen
        options={slideFromRight}
        name="Families"
        component={Families}
      />
      <Stack.Screen
        options={slideFromRight}
        name="Members"
        component={Members}
      />
    </Stack.Navigator>
  );
}
