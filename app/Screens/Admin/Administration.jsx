import React from "react";
import Users from "./Users.jsx";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import AddUser from "../../Forms/AddUser.jsx";
import Families from "./Famillies.jsx";
import AddFamily from "../../Forms/AddFamily.jsx";
import FamilyScreen from "../Famillies/Family.jsx";
import Informations from "../informations/informations.jsx";
import Activity from "../Activities/Activities.jsx";
import AddChild from "../../Forms/AddChild.jsx";
import AddInformation from "../../Forms/addInformation.jsx";
import UserProfile from "./Users/UserProfile.jsx";
import Bureau from "../Bureau/Bureau.jsx"
import AddReservation from "../../Forms/AddReservation.jsx";
import Kofal from "../kofal/Kofal.jsx"; 
import Orphans from "../Orphans/Orpahans.jsx"
import AdminProfile from "../Profiles/adminProfile.jsx";
import AddDonator from "../../Forms/AddDonator.jsx";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
const scaleFromCenter = { ...TransitionPresets.ScaleFromCenterAndroid };
export default function Administration({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Users"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "vertical",
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddUser"
        component={AddUser}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddFamily"
        component={AddFamily}
      />
      <Stack.Screen
        options={slideFromRight}
        name="Users"
        component={(props) => <Users {...props} drawer={navigation} />}
      />
      <Stack.Screen
        options={slideFromRight}
        name="Famillies"
        component={(props) => <Families {...props} drawer={navigation} />}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="Family"
        component={FamilyScreen}
      />
      <Stack.Screen
        options={slideFromRight}
        name="Informations"
        component={(props) => <Informations {...props} drawer={navigation} />}
      />
      <Stack.Screen
        options={slideFromRight}
        name="Activities"
        component={(props) => <Activity {...props} drawer={navigation} />}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddChild"
        component={AddChild}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddInformation"
        component={AddInformation}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="UserProfile"
        component={UserProfile}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AdminProfile"
        component={AdminProfile}
      />
      <Stack.Screen
        options={slideFromRight}
        name="Bureau"
        component={Bureau}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddReservation"
        component={AddReservation}
      />
      <Stack.Screen
        options={slideFromRight}
        name="Kofal"
        component={Kofal}
      />
      <Stack.Screen
        options={slideFromRight}
        name="Orphans"
        component={Orphans}
      />
      <Stack.Screen
        options={TransitionFromBottom}
        name="AddDonator"
        component={AddDonator}
      />
    </Stack.Navigator>
  );
}
