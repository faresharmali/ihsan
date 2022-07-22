import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Members from "./Members.jsx";
import AdminProfile from "../Profiles/adminProfile.jsx";
import Distributeur from "../Profiles/Distubuteur.jsx";
import Families from "./famillies.jsx";
import Bureau from "./Bureau";
import AddReservation from "../../Forms/AddReservation.jsx";
import KofaDonators from "./Donators.jsx";
import Ingredients from "./ingredients.jsx";
import AddIngredient from "../../Forms/AddIngredient.jsx";
import KofaStatus from "./status.jsx";
import ChangeKofaStatus from "../../Forms/ChangeStatus.jsx";
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
      <Stack.Screen options={TransitionFromBottom} name="DistributeurProfiile">
        {(props) => <Distributeur {...props} drawer={navigation} />}
      </Stack.Screen>

      <Stack.Screen options={slideFromRight} name="KofaFamilies">
        {(props) => <Families {...props} drawer={navigation} />}
      </Stack.Screen>
      <Stack.Screen options={slideFromRight} name="KofaBureau">
        {(props) => <Bureau {...props} drawer={navigation} />}
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
    </Stack.Navigator>
  );
}
