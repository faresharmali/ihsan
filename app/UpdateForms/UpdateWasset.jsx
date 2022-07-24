import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Stack, Icon } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import uuid from "react-native-uuid";
import Swipable from "../Components/Containers/swipable";
import { CreateUser } from "../api/user";
import MultipleOptionSwipable from "../Components/Containers/MultipleOptionSwipable";
import { useSelector } from "react-redux";
import ConfirmationModal from "../Components/Modals/DonationConfirmation";
export default function UpdateWasset({ route, navigation }) {
  const [IsModulesPannel, setIsModulesPannel] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [FamilliesPlaceholder, setFamilliesPlaceHolder] = useState("العائلات");
  const [selectedFamillies, setselectedFamillies] = useState([]);

  let ExistingFamillies = route.params.Infos.famillies.map((f) => f.id);
  const Famillies = useSelector((state) => state.Families);
  let NotExisting = Famillies.filter((f) => !ExistingFamillies.includes(f.id));
  const [errors, SetErrors] = useState({
    famillies: false,
  });

  const CreateNewUser = async () => {
    Keyboard.dismiss();
    if (selectedFamillies.length > 0) {
      route.params.AddFamily(selectedFamillies);
      navigation.goBack();
    } else {
      SetErrors({ famillies: true });

      setErrorMessage("كل الخانات اجبارية");
      setErrorMessageVisible(true);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (IsModulesPannel) {
          setIsModulesPannel(false);
          return true;
        } else {
          return false;
        }
      }
    );
    return () => backHandler.remove();
  }, [IsModulesPannel]);

  const getSelectedData = (data) => {
    let overFlow = data.length > 2 ? `... و ${data.length - 2} اخرين` : "";
    if (data.length > 0) {
      setFamilliesPlaceHolder(
        data
          .map((d) => d.title + " ")
          .slice(0, 2)
          .join(",") + overFlow
      );
      setselectedFamillies(
        data.map((family) => ({ title: family.title, id: family.id }))
      );
      setErrorMessageVisible(false)
      SetErrors({ ...errors, famillies: false });
    } else {
      setselectedFamillies([]);
      setFamilliesPlaceHolder("العائلات");
    }
  };
  const OpenFamilyModel = () => {
    Keyboard.dismiss();
    SetErrors({ ...errors, famillies: false });
    setIsModulesPannel(true);
    setshowButton(false);
  };
  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}>اضافة عائلة</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Users")}>
          <Icon
            style={styles.back}
            as={FontAwesome}
            name="close"
            size={7}
            color="#348578"
          />
        </TouchableWithoutFeedback>
      </View>

      <Stack space={4} w="100%" alignItems="center">
        <TouchableWithoutFeedback onPress={() => OpenFamilyModel()}>
          <View
            style={{
              ...styles.dateContainer,
              borderColor: errors.famillies ? "#c21a0e" : "grey",
            }}
          >
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="#348578"
            />
            <Text style={styles.InputText}> {FamilliesPlaceholder}</Text>
          </View>
        </TouchableWithoutFeedback>
      </Stack>
      {ErrorMessageVisible && (
        <View style={styles.ErrorMessage}>
          <FontAwesome name="exclamation-triangle" size={20} color="#BE123C" />
          <Text style={styles.errorText}>{ErrorMessage}</Text>
        </View>
      )}

      {showButton && (
        <Button style={styles.Button} mode="contained" onPress={CreateNewUser}>
          <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة عائلة </Text>
        </Button>
      )}

      <MultipleOptionSwipable
        type={"family"}
        title="العائلات"
        getSelectedData={getSelectedData}
        data={NotExisting.map((o) => ({
          ...o,
          title: `عائلة  ${o.fatherLastName}`,
        }))}
        isPanelActive={IsModulesPannel}
        setIsPanelActive={setIsModulesPannel}
        setshowButton={setshowButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    width: "95%",
    height: 50,
    borderColor: "#000",
    borderWidth: 0.5,
    borderRadius: 5,
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
    borderWidth: 1,
  },
  InputText: {
    fontFamily: "Tajawal-Medium",
  },
  Container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "10%",
  },
  PageTitile: {
    fontSize: 25,
    marginRight: 10,
    fontFamily: "Tajawal-Medium",
  },
  TitleContainer: {
    width: "100%",
    flexDirection: "row-reverse",
    alignContent: "center",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 0,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "red",
  },

  Button: {
    flexDirection: "row-reverse",
    height: 50,
    width: 230,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#348578",
    marginTop: 25,
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 6,
  },
  back: {
    left: 0,
  },
  Modal: {
    width: "100%",
  },
  ErrorMessage: {
    width: "80%",
    height: 40,
    backgroundColor: "#FECDD3",
    marginTop: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 10,
  },
  errorText: {
    fontFamily: "Tajawal-Medium",
    marginRight: 10,
    fontSize: 13,
  },
  InputsContainer: {
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-between",
  },
});
