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
import AddProgramItem from "../../Forms/AddProgramItem.jsx";
import AdminProfile from "../Profiles/adminProfile.jsx";
import Program from "./program.jsx";
import UpdateActivity from "../../UpdateForms/UpdateActivity.jsx";
import Information from "../InformationsSection/information";
import UpdateInformation from "../../UpdateForms/UpdateInformation";
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
        options={TransitionFromBottom}
        name="ActivityMemberProfile"
        component={AdminProfile}
      />
      <Stack.Screen
        options={slideFromRight}
        name="ActivitiesProgram"
        component={Program}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddProgramItem"
        component={AddProgramItem}
      />
      <Stack.Screen
        name="UpdateActivity"
        component={UpdateActivity}
      />
            <Stack.Screen options={TransitionFromBottom} name="InformationAdmin">
        {(props) => (
          <Information
            {...props}
            drawer={navigation}
            updatePath={"UpdateInformationActivity"}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="UpdateInformationActivity"
        component={UpdateInformation}
      />
    </Stack.Navigator>
  );
}
