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
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
const scaleFromCenter = { ...TransitionPresets.ScaleFromCenterAndroid };
export default function Kafala({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Informations"
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
    </Stack.Navigator>
  );
}
