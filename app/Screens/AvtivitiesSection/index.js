import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Members from "./Members.jsx";
import Widows from "./Widows.jsx";
import Reports from "./Reports.jsx";
import AddReport from "../../Forms/AddReport.jsx";
import WidowsDonators from "./Donators.jsx";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
import AddActivity from "../../Forms/AddActivity.jsx";
export default function  ActivitiesSection({ navigation }) {
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
        name="Widows"
        component={Widows}
      />
      <Stack.Screen
        options={slideFromRight}
        name="Reports"
        component={Reports}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddReport"
        component={AddReport}
      />
      <Stack.Screen
        options={slideFromRight}
        name="WidowsDonators"
        component={WidowsDonators}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddActivity"
        component={AddActivity}
      />


    </Stack.Navigator>
  );
}
