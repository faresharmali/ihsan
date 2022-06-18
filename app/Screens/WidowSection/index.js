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
import WidowSectionBottomBar from "../../Navigation/WidowSectionBottomBar.js";
import Bureau from "../Bureau/Bureau.jsx";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
export default function WidowSection({ navigation }) {
  return (
    <>
  
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
        name="WidowMembers"
        component={Members}
      />
      <Stack.Screen
        options={slideFromRight}
        name="Widows"
        component={Widows}
      />
      <Stack.Screen
        options={slideFromRight}
        name="WidowReports"
        component={Reports}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="WidowAddReport"
        component={AddReport}
      />
      <Stack.Screen
        options={slideFromRight}
        name="WidowsDonators"
        component={WidowsDonators}
      />
      <Stack.Screen
        options={slideFromRight}
        name="WidowsBureau"
        component={Bureau}
      />

    </Stack.Navigator>
<WidowSectionBottomBar />
</>
  );
}
