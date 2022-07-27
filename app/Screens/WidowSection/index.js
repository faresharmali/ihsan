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
import Bureau from "../Bureau/Bureau.jsx";
import AdminProfile from "../Profiles/adminProfile.jsx";
import Program from "./Program.jsx";
import AddProgramItem from "../../Forms/AddProgramItem.jsx";
import WidowProfile from "../Profiles/WidowProfile";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
export default function WidowSection({ navigation }) {
  return (
    <>
  
    <Stack.Navigator
      initialRouteName="Widows"
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
      <Stack.Screen
        options={TransitionFromBottom}
        name="WidowMembersProfile"
        component={AdminProfile}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddProgramItem"
        component={AddProgramItem}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="WidowProfile"
        component={WidowProfile}
      />
      <Stack.Screen
        options={slideFromRight}
        name="WidowProgram"
        component={Program}
      />

    </Stack.Navigator>
</>
  );
}
