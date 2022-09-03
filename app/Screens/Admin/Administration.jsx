import React from "react";
import Users from "./Users.jsx";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import AddUser from "../../Forms/AddUser.jsx";
import Families from "./Famillies.jsx";
import AddFamily from "../../Forms/AddFamily.jsx";
import FamilyScreen from "../AdministrationSection/Famillies/Family.jsx";
import AddChild from "../../Forms/AddChild.jsx";
import AddInformation from "../../Forms/addInformation.jsx";
import UserProfile from "./Users/UserProfile.jsx";
import Bureau from "../Bureau/Bureau.jsx";
import AddReservation from "../../Forms/AddReservation.jsx";
import Kofal from "../AdministrationSection/kofal/Kofal.jsx";
import Orphans from "../AdministrationSection/Orphans/Orpahans.jsx";
import AdminProfile from "../Profiles/adminProfile.jsx";
import AddDonator from "../../Forms/AddDonator.jsx";
import KidProfile from "../AdministrationSection/Famillies/kidProfile.jsx";
import KafelProfile from "../Profiles/kafelProfile.jsx";
import Distributeur from "../Profiles/Distubuteur.jsx";
import Information from "../InformationsSection/information.jsx";
import UpdateInformation from "../../UpdateForms/UpdateInformation.jsx";
import UpdateUser from "../../UpdateForms/UpdateUser.jsx";
import UpdateWasset from "../../UpdateForms/UpdateWasset.jsx";
import AddOrphan from "../../UpdateForms/AddOrphan.jsx";
import UpdateFamily from "../../UpdateForms/UpdateFamily.jsx";
import UpdateOrphan from "../../UpdateForms/UpdateOrphan.jsx";
import BottomBar from "../../Navigation/BottomBar.js";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
const scaleFromCenter = { ...TransitionPresets.ScaleFromCenterAndroid };
export default function Administration({ navigation }) {
  return (
    <>
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
        <Stack.Screen options={slideFromRight} name="Users">
          {(props) => <Users {...props} drawer={navigation} />}
        </Stack.Screen>
        <Stack.Screen options={slideFromRight} name="Famillies">
          {(props) => <Families {...props} drawer={navigation} />}
        </Stack.Screen>
        <Stack.Screen
          options={TransitionFromBottom}
          name="Family"
          component={FamilyScreen}
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
          options={TransitionFromBottom}
          name="KafelProfile"
          component={KafelProfile}
        />

        <Stack.Screen options={slideFromRight} name="Bureau">
          {(props) => (
            <Bureau {...props} drawer={navigation} BottomBar={BottomBar} />
          )}
        </Stack.Screen>
        <Stack.Screen
          options={TransitionFromBottom}
          name="AddReservation"
          component={AddReservation}
        />
        <Stack.Screen options={slideFromRight} name="Kofal">
          {(props) => <Kofal {...props} drawer={navigation} />}
        </Stack.Screen>
        <Stack.Screen options={slideFromRight} name="Orphans">
          {(props) => <Orphans {...props} drawer={navigation} />}
        </Stack.Screen>
      
        <Stack.Screen
          options={TransitionFromBottom}
          name="AddDonator"
          component={AddDonator}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="KidProfile"
          component={KidProfile}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="Distributeur"
          component={Distributeur}
        />
        <Stack.Screen
          options={TransitionFromBottom}
          name="Wasset"
          component={Distributeur}
        />
        <Stack.Screen options={TransitionFromBottom} name="Information">
          {(props) => (
            <Information
              {...props}
              drawer={navigation}
              updatePath={"UpdateInformationAdmin"}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="UpdateUser" component={UpdateUser} />
        <Stack.Screen name="UpdateWasset" component={UpdateWasset} />
        <Stack.Screen name="AddOrphan" component={AddOrphan} />
        <Stack.Screen name="UpdateFamily" component={UpdateFamily} />
        <Stack.Screen name="UpdateOrphan" component={UpdateOrphan} />
        <Stack.Screen
          name="UpdateInformationAdmin"
          component={UpdateInformation}
        />
      </Stack.Navigator>
    </>
  );
}
