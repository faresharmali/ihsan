import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Informations from "./informations";
import AddInformation from "../../Forms/addInformation";
import Information from "./information";
import UpdateInformation from "../../UpdateForms/UpdateInformation";
const Stack = createStackNavigator();
const TransitionFromBottom = { ...TransitionPresets.ModalSlideFromBottomIOS };
const slideFromRight = { ...TransitionPresets.SlideFromRightIOS };
export default function InformationSection({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Informations"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "vertical",
        headerShown: false,
      }}
    >
<Stack.Screen options={slideFromRight} name="Informations">
        {(props) => <Informations {...props} drawer={navigation} />}
      </Stack.Screen>


      <Stack.Screen
        options={TransitionFromBottom}
        name="AddInformation"
        component={AddInformation}
      />
      <Stack.Screen options={TransitionFromBottom} name="Information">
        {(props) => (
          <Information
            {...props}
            drawer={navigation}
            updatePath={"UpdateInformationInfo"}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="UpdateInformationInfo"
        component={UpdateInformation}
      />
    </Stack.Navigator>
    
  );
}
