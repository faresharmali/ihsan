import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Members from "./Members.jsx";
import Widows from "./Widows.jsx";
import Reports from "./Reports.jsx";
import AddReport from "../../Forms/AddReport.jsx";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
export default function WidowSection({ navigation }) {
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


    </Stack.Navigator>
  );
}
