import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Members from "./Members.jsx";
import AddActivity from "../../Forms/AddActivity";
import Activities from "./Activities.jsx";
import ActivityDonators from "./Donators.jsx";
import Activity from "./Activity.jsx";
import ActivitiesProgram from "./program.jsx";
import AddProgramItem from "../../Forms/AddProgramItem.jsx";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
export default function ActivitiesSection({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="ActivitiesMembers"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "vertical",
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={slideFromRight}
        name="ActivitiesMembers"
        component={Members}
      />
      <Stack.Screen
        options={slideFromRight}
        name="Activities"
        component={Activities}
      />

      <Stack.Screen
        options={TransitionFromBottom}
        name="AddActivity"
        component={AddActivity}
      />
      <Stack.Screen
        options={slideFromRight}
        name="ActivityDonators"
        component={ActivityDonators}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="Activity"
        component={Activity}
      />
      <Stack.Screen
        options={slideFromRight}
        name="ActivitiesProgram"
        component={ActivitiesProgram}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddProgramItem"
        component={AddProgramItem}
      />
    </Stack.Navigator>
  );
}
