import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import Members from "./Members.jsx";
import HealthDonators from "./Donators.jsx";
import AdminProfile from "../Profiles/adminProfile.jsx";
import Patients from "./patients.jsx";
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
        <Stack.Screen
          options={slideFromRight}
          name="HealthDonators"
          component={HealthDonators}
        />
        <Stack.Screen
          options={slideFromRight}
          name="Patients"
          component={Patients}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="MemberProfile"
          component={AdminProfile}
        />
      </Stack.Navigator>
    </>
  );
}
