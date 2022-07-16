import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import OrpahnsDonators from "./Donators.jsx";
import Families from "./Families.jsx";
import Members from "./Members.jsx";
import Bureau from "./Bureau.jsx";
import AddReservation from "../../Forms/AddReservation.jsx";
import Family from "../AdministrationSection/Famillies/Family";
import AdminProfile from "../Profiles/adminProfile";
import OrpahnsSectionBottomBar from "../../Navigation/OrpahansSectionBottomBar.js";
import DonationsStatus from "./Donationstatus.jsx";
import Donations from "./Donations.jsx";
import AddDonation from "../../Forms/AddDonation.jsx";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
export default function OrpahansSection({ navigation }) {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Donations"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "vertical",
          headerShown: false,
        }}
      >
        <Stack.Screen
          options={slideFromRight}
          name="OrpahnsDonators"
          component={OrpahnsDonators}
        />
        <Stack.Screen
          options={slideFromRight}
          name="OrpahnsFamilies"
          component={Families}
        />
        <Stack.Screen
          options={slideFromRight}
          name="OrpahnsMembers"
          component={Members}
        />
        <Stack.Screen
          options={slideFromRight}
          name="OrpahnsBureau"
          component={Bureau}
        />
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
          options={slideFromRight}
          name="Donations"
          component={Donations}
        />
      </Stack.Navigator>
    </>
  );
}
