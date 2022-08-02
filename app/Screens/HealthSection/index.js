import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import Members from "./Members.jsx";
import HealthDonators from "./Donators.jsx";
import AdminProfile from "../Profiles/adminProfile.jsx";
import Patients from "./patients.jsx";
import Reports from "./Reports.jsx";
import AddReport from "../../Forms/AddReport.jsx";
import Program from "./Program.jsx";
import AddProgramItem from "../../Forms/AddProgramItem.jsx";
import Report from "../Report.jsx";
import UpdateReport from "../../UpdateForms/UpdateReport.jsx";
import UpdateInformation from "../../UpdateForms/UpdateInformation.jsx";
import Information from "../InformationsSection/information.jsx";
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
        <Stack.Screen
          options={slideFromRight}
          name="HealthReports"
          component={Reports}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="HealthAddReport"
          component={AddReport}
        />
        <Stack.Screen
          options={slideFromRight}
          name="HealthProgram"
          component={Program}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="AddProgramItem"
          component={AddProgramItem}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="Report"
          component={Report}
        />
        <Stack.Screen name="UpdateReport" component={UpdateReport} />
        <Stack.Screen options={TransitionFromBottom} name="InformationAdmin">
          {(props) => (
            <Information
              {...props}
              drawer={navigation}
              updatePath={"UpdateInformationHealth"}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="UpdateInformationHealth"
          component={UpdateInformation}
        />
      </Stack.Navigator>
    </>
  );
}
