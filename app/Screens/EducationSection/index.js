import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Members from "./Members.jsx";
import EducationDonators from "./Donators.jsx";
import EducationOrphans from "./EducationOrphans.jsx";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
export default function EducationSection({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Members"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "vertical",
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={slideFromRight}
        name="Members"
        component={Members}
      />
      <Stack.Screen
        options={slideFromRight}
        name="EducationDonators"
        component={EducationDonators}
      />
      <Stack.Screen
        options={slideFromRight}
        name="EducationOrphans"
        component={EducationOrphans}
      />

    </Stack.Navigator>
  );
}
