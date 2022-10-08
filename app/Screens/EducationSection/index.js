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
import Information from "../InformationsSection/information.jsx";
import UpdateInformation from "../../UpdateForms/UpdateInformation.jsx";
import Bureau from "../Bureau/Bureau.jsx";
import EducationSectionBottomBar from "../../Navigation/EducationSectionBottomBar.js";
import AddReservation from "../../Forms/AddReservation.jsx";
import FinanceView from "../FinanceViews/Finance.jsx";
import AddIncomeView from "../FinanceViews/addIncome.jsx";
import AddOutcomeView from "../FinanceViews/addOutCome.jsx";
import Transaction from "../Profiles/Transaction.jsx";
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

<Stack.Screen options={slideFromRight} name="Members">
        {(props) => <Members {...props} drawer={navigation} />}
      </Stack.Screen>
<Stack.Screen options={slideFromRight} name="EducationDonators">
        {(props) => <EducationDonators {...props} drawer={navigation} />}
      </Stack.Screen>
<Stack.Screen options={slideFromRight} name="EducationOrphans">
        {(props) => <EducationOrphans {...props} drawer={navigation} />}
      </Stack.Screen>
<Stack.Screen options={slideFromRight} name="KafalaFekriya">
        {(props) => <KafalaFekriya {...props} drawer={navigation} />}
      </Stack.Screen>
<Stack.Screen options={slideFromRight} name="EducationProgram">
        {(props) => <Program {...props} drawer={navigation} />}
      </Stack.Screen>


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
        options={TransitionFromBottom}
        name="AddReservation"
        component={AddReservation}
      />

   
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddProgramItem"
        component={AddProgramItem}
      />
      <Stack.Screen options={TransitionFromBottom} name="InformationAdmin">
        {(props) => (
          <Information
            {...props}
            drawer={navigation}
            updatePath={"UpdateInformationEducation"}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="UpdateInformationEducation"
        component={UpdateInformation}
      />
      <Stack.Screen options={slideFromRight} name="EducationBurau">
        {(props) => (
          <Bureau
            {...props}
            drawer={navigation}
            BottomBar={EducationSectionBottomBar}
          />
        )}
      </Stack.Screen>
      <Stack.Screen options={slideFromRight} name="EducationFinanceView">
          {(props) => <FinanceView {...props} drawer={navigation} />}
        </Stack.Screen>
        <Stack.Screen
        options={TransitionFromBottom}
        name="AddIncomeEducation"
        component={AddIncomeView}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddOutcomeEducation"
        component={AddOutcomeView}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="EducationTransaction"
        component={Transaction}
      />
    </Stack.Navigator>
  );
}
