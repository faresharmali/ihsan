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
import ActivitiesSectionBottomBar from "../../Navigation/ActivitiesSectionBottomBar.js";
import Bureau from "../Bureau/Bureau.jsx";
import AddReservation from "../../Forms/AddReservation.jsx";
import FinanceView from "../FinanceViews/Finance.jsx";
import AddIncomeView from "../FinanceViews/addIncome.jsx";
import AddOutcomeView from "../FinanceViews/addOutCome.jsx";
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
      <Stack.Screen options={slideFromRight} name="ActivitiesMembers">
        {(props) => <Members {...props} drawer={navigation} />}
      </Stack.Screen>
      <Stack.Screen options={slideFromRight} name="Activities">
        {(props) => <Activities {...props} drawer={navigation} />}
      </Stack.Screen>
      <Stack.Screen options={slideFromRight} name="ActivityDonators">
        {(props) => <ActivityDonators {...props} drawer={navigation} />}
      </Stack.Screen>
      <Stack.Screen options={slideFromRight} name="ActivitiesProgram">
        {(props) => <Program {...props} drawer={navigation} />}
      </Stack.Screen>
   
      <Stack.Screen options={slideFromRight} name="ActivitiesFinanceView">
        {(props) => <FinanceView {...props} drawer={navigation} />}
      </Stack.Screen>
   
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddActivity"
        component={AddActivity}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddReservation"
        component={AddReservation}
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
        options={TransitionFromBottom}
        name="AddProgramItem"
        component={AddProgramItem}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddIncomeActivities"
        component={AddIncomeView}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddOutcomeActivities"
        component={AddOutcomeView}
      />
      <Stack.Screen name="UpdateActivity" component={UpdateActivity} />
      <Stack.Screen options={TransitionFromBottom} name="InformationAdmin">
        {(props) => (
          <Information
            {...props}
            drawer={navigation}
            updatePath={"UpdateInformationActivity"}
          />
        )}
      </Stack.Screen>
      <Stack.Screen options={slideFromRight} name="ActivityBureau">
        {(props) => (
          <Bureau
            {...props}
            drawer={navigation}
            BottomBar={ActivitiesSectionBottomBar}
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
