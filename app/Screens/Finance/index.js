import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import FinanceMembers from "./members";
import Income from "./income";
import Outcome from "./outcome";
import AddIncome from "../../Forms/AddIncome";
import AddOutcome from "../../Forms/AddOutcome";
import Hassalat from "./Hassalat";
import AddHassala from "../../Forms/AddHassala";
import Finance from "./Finance";
import AdminProfile from "../Profiles/adminProfile";
import Information from "../InformationsSection/information";
import UpdateInformation from "../../UpdateForms/UpdateInformation";
import Transaction from "../Profiles/Transaction";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
export default function FinanceSection({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="FinancePage"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "vertical",
        headerShown: false,
      }}
    >

<Stack.Screen options={slideFromRight} name="FinanceMembers">
        {(props) => <FinanceMembers {...props} drawer={navigation} />}
      </Stack.Screen>
<Stack.Screen options={slideFromRight} name="Income">
        {(props) => <Income {...props} drawer={navigation} />}
      </Stack.Screen>
<Stack.Screen options={slideFromRight} name="Outcome">
        {(props) => <Outcome {...props} drawer={navigation} />}
      </Stack.Screen>
<Stack.Screen options={slideFromRight} name="Hassalat">
        {(props) => <Hassalat {...props} drawer={navigation} />}
      </Stack.Screen>
<Stack.Screen options={slideFromRight} name="FinancePage">
        {(props) => <Finance {...props} drawer={navigation} />}
      </Stack.Screen>

      <Stack.Screen
        options={TransitionFromBottom}
        name="AddIncome"
        component={AddIncome}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="Transaction"
        component={Transaction}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddOutcome"
        component={AddOutcome}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddHassala"
        component={AddHassala}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="FinanceMemberProfile"
        component={AdminProfile}
      />
  
      <Stack.Screen options={TransitionFromBottom} name="InformationAdmin">
        {(props) => (
          <Information
            {...props}
            drawer={navigation}
            updatePath={"UpdateInformationFinance"}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="UpdateInformationFinance"
        component={UpdateInformation}
      />
    </Stack.Navigator>
  );
}
