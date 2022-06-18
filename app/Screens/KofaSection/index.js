import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Members from "./Members.jsx";
import AdminProfile from "../Profiles/adminProfile.jsx";
import Families from "./famillies.jsx";
import Bureau from "./Bureau"
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
      <Stack.Screen
        options={slideFromRight}
        name="KofaMembers"
        component={Members}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="KofaMemberProfile"
        component={AdminProfile}
      />
      <Stack.Screen
        options={slideFromRight}
        name="KofaFamilies"
        component={Families}
      />
      <Stack.Screen
        options={slideFromRight}
        name="KofaBureau"
        component={Bureau}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddReservation"
        component={AddReservation}
      />
      <Stack.Screen
        options={slideFromRight}
        name="KofaDonators"
        component={KofaDonators}
      />
      <Stack.Screen
        options={slideFromRight}
        name="Ingredients"
        component={Ingredients}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddIngredient"
        component={AddIngredient}
      />
      <Stack.Screen
        options={slideFromRight}
        name="KofaStatus"
        component={KofaStatus}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="ChangeKofaStatus"
        component={ChangeKofaStatus}
      />
    </Stack.Navigator>
  );
}
