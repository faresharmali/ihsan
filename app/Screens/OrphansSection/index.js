import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import OrpahnsDonators from "./Donators.jsx";
import Families from "./Families.jsx";
import Members from "./Members.jsx";
import Bureau from "../Bureau/Bureau.jsx";
import AddReservation from "../../Forms/AddReservation.jsx";
import Family from "../AdministrationSection/Famillies/Family";
import AdminProfile from "../Profiles/adminProfile";
import OrpahnsSectionBottomBar from "../../Navigation/OrpahansSectionBottomBar.js";
import DonationsStatus from "./Donationstatus.jsx";
import Donations from "./Donations.jsx";
import AddDonation from "../../Forms/AddDonation.jsx";
import Program from "./Program.jsx";
import AddProgramItem from "../../Forms/AddProgramItem.jsx";
import Information from "../InformationsSection/information.jsx";
import UpdateInformation from "../../UpdateForms/UpdateInformation.jsx";
import Kafala from "../Profiles/Kafala.jsx";
import FinanceView from "../FinanceViews/Finance.jsx";
import AddIncomeView from "../FinanceViews/addIncome.jsx";
import AddOutcomeView from "../FinanceViews/addOutCome.jsx";
import Transaction from "../Profiles/Transaction.jsx";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
export default function OrpahansSection({ navigation }) {
  return (
    <>
      <Stack.Navigator
        initialRouteName="OrpahnsMembers"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "vertical",
          headerShown: false,
        }}
      >
        <Stack.Screen options={slideFromRight} name="OrpahnsDonators">
          {(props) => <OrpahnsDonators {...props} drawer={navigation} />}
        </Stack.Screen>

        <Stack.Screen options={slideFromRight} name="OrpahnsFamilies">
          {(props) => <Families {...props} drawer={navigation} />}
        </Stack.Screen>
        <Stack.Screen options={slideFromRight} name="OrpahnsMembers">
          {(props) => <Members {...props} drawer={navigation} />}
        </Stack.Screen>
        <Stack.Screen options={slideFromRight} name="OrpahnsBureau">
          {(props) => (
            <Bureau
              {...props}
              drawer={navigation}
              BottomBar={OrpahnsSectionBottomBar}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          options={TransitionFromBottom}
          name="AddReservation"
          component={AddReservation}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="FamilyInfos"
          component={Family}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="MemberProfile"
          component={AdminProfile}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="DonationsStatus"
          component={DonationsStatus}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="AddDonation"
          component={AddDonation}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="Kafala"
          component={Kafala}
        />

        <Stack.Screen options={slideFromRight} name="Donations">
          {(props) => <Donations {...props} drawer={navigation} />}
        </Stack.Screen>
        <Stack.Screen
          options={TransitionFromBottom}
          name="AddProgramItem"
          component={AddProgramItem}
        />

        <Stack.Screen options={slideFromRight} name="OrphansProgram">
          {(props) => <Program {...props} drawer={navigation} />}
        </Stack.Screen>
        <Stack.Screen options={TransitionFromBottom} name="InformationAdmin">
          {(props) => (
            <Information
              {...props}
              drawer={navigation}
              updatePath={"UpdateInformationOrphan"}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="UpdateInformationOrphan"
          component={UpdateInformation}
        />
        
<Stack.Screen options={slideFromRight} name="OrphansFinanceView">
        {(props) => <FinanceView {...props} drawer={navigation} />}
      </Stack.Screen>
               <Stack.Screen
        options={TransitionFromBottom}
        name="AddIncomeOrphans"
        component={AddIncomeView}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddOutcomeOrphans"
        component={AddOutcomeView}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="OrphansTransaction"
        component={Transaction}
      />
      </Stack.Navigator>
    </>
  );
}
