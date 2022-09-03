import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Members from "./Members.jsx";
import AdminProfile from "../Profiles/adminProfile.jsx";
import Distributeur from "../Profiles/Distubuteur.jsx";
import Families from "./famillies.jsx";
import AddReservation from "../../Forms/AddReservation.jsx";
import KofaDonators from "./Donators.jsx";
import Ingredients from "./ingredients.jsx";
import AddIngredient from "../../Forms/AddIngredient.jsx";
import KofaStatus from "./status.jsx";
import ChangeKofaStatus from "../../Forms/ChangeStatus.jsx";
import Information from "../InformationsSection/information.jsx";
import UpdateInformation from "../../UpdateForms/UpdateInformation";
import KofaSectionBottomBar from "../../Navigation/KofaSectionBottomBar.js";
import Bureau from "../Bureau/Bureau.jsx";
import Program from "./Program.jsx";
import AddProgramItem from "../../Forms/AddProgramItem.jsx";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };

export default function KofaSection({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Members"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "vertical",
        headerShown: false,
      }}
    >
      <Stack.Screen options={slideFromRight} name="KofaMembers">
        {(props) => <Members {...props} drawer={navigation} />}
      </Stack.Screen>

      <Stack.Screen options={TransitionFromBottom} name="KofaMemberProfile">
        {(props) => <AdminProfile {...props} drawer={navigation} />}
      </Stack.Screen>

      <Stack.Screen options={TransitionFromBottom} name="AddProgramItem">
        {(props) => <AddProgramItem {...props} drawer={navigation} />}
      </Stack.Screen>
      <Stack.Screen options={TransitionFromBottom} name="DistributeurProfiile">
        {(props) => <Distributeur {...props} drawer={navigation} />}
      </Stack.Screen>

      <Stack.Screen options={slideFromRight} name="KofaFamilies">
        {(props) => <Families {...props} drawer={navigation} />}
      </Stack.Screen>
      <Stack.Screen options={slideFromRight} name="KofaBureau">
        {(props) => <Bureau {...props} drawer={navigation} BottomBar={KofaSectionBottomBar} />}
      </Stack.Screen>
      <Stack.Screen options={TransitionFromBottom} name="AddReservation">
        {(props) => <AddReservation {...props} drawer={navigation} />}
      </Stack.Screen>
      <Stack.Screen options={slideFromRight} name="KofaDonators">
        {(props) => <KofaDonators {...props} drawer={navigation} />}
      </Stack.Screen>
      <Stack.Screen options={slideFromRight} name="Ingredients">
        {(props) => <Ingredients {...props} drawer={navigation} />}
      </Stack.Screen>
      <Stack.Screen options={slideFromRight} name="ActivitiesProgram">
        {(props) => <Program {...props} drawer={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddIngredient"
        component={AddIngredient}
      />
      <Stack.Screen options={slideFromRight} name="KofaStatus">
        {(props) => <KofaStatus {...props} drawer={navigation} />}
      </Stack.Screen>
      <Stack.Screen
        options={TransitionFromBottom}
        name="ChangeKofaStatus"
        component={ChangeKofaStatus}
      />

      <Stack.Screen options={TransitionFromBottom} name="Information">
        {(props) => (
          <Information
            {...props}
            drawer={navigation}
            updatePath={"UpdateInformationKofa"}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="UpdateInformationKofa"
        component={UpdateInformation}
      />
    </Stack.Navigator>
  );
}
