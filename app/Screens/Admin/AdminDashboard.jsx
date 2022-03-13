import React from "react";
import Users from "./Users.jsx";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator,TransitionPresets} from "@react-navigation/stack";
import AddUser from "../../Forms/AddUser.jsx";
import Families from "./Famillies.jsx";
import AddFamily from "../../Forms/AddFamily.jsx";
import FamilyScreen from "../Famillies/Family.jsx";
import Informations from "../informations/informations.jsx";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
const scaleFromCenter = { ...TransitionPresets.ScaleFromCenterAndroid };
export default function AdminDashboard() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Informations"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "vertical",
          headerShown: false,
        }} >
        <Stack.Screen options={TransitionFromBottom} name="AddUser" component={AddUser} />
        <Stack.Screen options={TransitionFromBottom}name="AddFamily" component={AddFamily}/>
        <Stack.Screen options={slideFromRight} name="Users" component={Users} />
        <Stack.Screen options={slideFromRight}name="Famillies" component={Families}/>
        <Stack.Screen options={scaleFromCenter} name="Family" component={FamilyScreen} />
        <Stack.Screen options={slideFromRight} name="Informations" component={Informations}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
