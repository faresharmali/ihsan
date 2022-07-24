import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Members from "./Members.jsx";
import EducationDonators from "./Donators.jsx";
import EducationOrphans from "./EducationOrphans.jsx";
import KafalaFekriya from "./kafalaFekriya.jsx";
import AddEducationMember from "../../Forms/AddEducationGroupe.jsx";
import AdminProfile from "../Profiles/adminProfile.jsx";
import Program from "./program.jsx";
import AddProgramItem from "../../Forms/AddProgramItem.jsx";
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
      <Stack.Screen
        options={slideFromRight}
        name="KafalaFekriya"
        component={KafalaFekriya}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddEducationMember"
        component={AddEducationMember}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="EducationMemberProfile"
        component={AdminProfile}
      />

      <Stack.Screen
        options={slideFromRight}
        name="EducationProgram"
        component={Program}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddProgramItem"
        component={AddProgramItem}
      />

    </Stack.Navigator>
  );
}
