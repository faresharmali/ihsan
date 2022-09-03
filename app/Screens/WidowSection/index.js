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
import AddReservation from "../../Forms/AddReservation.jsx";
import AdminProfile from "../Profiles/adminProfile.jsx";
import Program from "./Program.jsx";
import AddProgramItem from "../../Forms/AddProgramItem.jsx";
import WidowProfile from "../Profiles/WidowProfile";
import Report from "../Report.jsx";
import UpdateReport from "../../UpdateForms/UpdateReport.jsx";
import Information from "../InformationsSection/information.jsx";
import UpdateInformation from "../../UpdateForms/UpdateInformation.jsx";
import WidowSectionBottomBar from "../../Navigation/WidowSectionBottomBar.js";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
export default function WidowSection({ navigation }) {
  return (
    <>
      <Stack.Navigator
        initialRouteName="WidowMembers"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "vertical",
          headerShown: false,
        }}
      >
        <Stack.Screen options={slideFromRight} name="WidowMembers">
          {(props) => <Members {...props} drawer={navigation} />}
        </Stack.Screen>
        <Stack.Screen options={slideFromRight} name="Widows">
          {(props) => <Widows {...props} drawer={navigation} />}
        </Stack.Screen>
        <Stack.Screen options={slideFromRight} name="WidowReports">
          {(props) => <Reports {...props} drawer={navigation} />}
        </Stack.Screen>

        <Stack.Screen
          options={TransitionFromBottom}
          name="WidowAddReport"
          component={AddReport}
        />

        <Stack.Screen options={slideFromRight} name="WidowsDonators">
          {(props) => <WidowsDonators {...props} drawer={navigation} />}
        </Stack.Screen>

        
        <Stack.Screen options={slideFromRight} name="WidowsBureau">
          {(props) => <Bureau {...props} drawer={navigation} BottomBar={WidowSectionBottomBar} />}
        </Stack.Screen>

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
          name="AddReservation"
          component={AddReservation}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="WidowProfile"
          component={WidowProfile}
        />

        <Stack.Screen options={slideFromRight} name="WidowProgram">
          {(props) => <Program {...props} drawer={navigation} />}
        </Stack.Screen>
        <Stack.Screen
          options={TransitionFromBottom}
          name="WidowReport"
          component={Report}
        />
        <Stack.Screen name="UpdateReport" component={UpdateReport} />

        <Stack.Screen options={TransitionFromBottom} name="InformationAdmin">
          {(props) => (
            <Information
              {...props}
              drawer={navigation}
              updatePath={"UpdateInformationWidow"}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="UpdateInformationWidow"
          component={UpdateInformation}
        />
      </Stack.Navigator>
    </>
  );
}
