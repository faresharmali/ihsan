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
import Bureau from "../Bureau/Bureau.jsx";
import AddReservation from "../../Forms/AddReservation.jsx";
import HealthSectionBottomBar from "../../Navigation/HealthSectionBottomBar.js";
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
        <Stack.Screen options={slideFromRight} name="HealthMembers">
        {(props) => <Members {...props} drawer={navigation} />}
      </Stack.Screen>
        <Stack.Screen options={slideFromRight} name="HealthDonators">
        {(props) => <HealthDonators {...props} drawer={navigation} />}
      </Stack.Screen>
        <Stack.Screen options={slideFromRight} name="Patients">
        {(props) => <Patients {...props} drawer={navigation} />}
      </Stack.Screen>
        <Stack.Screen options={slideFromRight} name="HealthReports">
        {(props) => <Reports {...props} drawer={navigation} />}
      </Stack.Screen>
        <Stack.Screen options={slideFromRight} name="HealthProgram">
        {(props) => <Program {...props} drawer={navigation} />}
      </Stack.Screen>

 
        <Stack.Screen
          options={TransitionFromBottom}
          name="MemberProfile"
          component={AdminProfile}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="AddReservation"
          component={AddReservation}
        />

        <Stack.Screen
          options={TransitionFromBottom}
          name="HealthAddReport"
          component={AddReport}
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
        <Stack.Screen options={slideFromRight} name="HealthBureau">
          {(props) => (
            <Bureau
              {...props}
              drawer={navigation}
              BottomBar={HealthSectionBottomBar}
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
