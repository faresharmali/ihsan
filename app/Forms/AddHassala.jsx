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
import Swipable from "../Components/Containers/swipable";
import { useSelector } from "react-redux";

import { CreateHassala } from "../api/Finance";
import uuid from "react-native-uuid";
export default function AddHassala({ route, navigation }) {
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [ReceiverPannel, setReceiverPannel] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [Donator, setDonator] = useState("المسؤول");
  const [ErrorMessage, setErrorMessage] = useState("");

  const [errors, SetErrors] = useState({
    name: false,
    location: false,
    amount: false,
    receiver: false,
  });
  const [TransactionInfos, SetTransactionInfos] = useState({
    identifier: uuid.v4(),
    date: new Date(),
    name: "",
    location: "",
    amount: "",
    receiver: "",
  });
  let users = useSelector((state) => state.users);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (  ReceiverPannel) {
          setReceiverPannel(false);
          return true;
        } else {
          return false;
        }
      }
    );
    return () => backHandler.remove();
  }, [ReceiverPannel]);

  const handleUserInput = (text, name) => {
    setErrorMessageVisible(false);
    SetErrors({ ...errors, [name]: false });
    SetTransactionInfos({ ...TransactionInfos, [name]: text });
  };
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontFamily: "Tajawal-Medium",
    fontSize: 14,
  };

  const ChooseDonator = (donator) => {
    setReceiverPannel(false);
    SetErrors({ ...errors, receiver: false });
    SetTransactionInfos({ ...TransactionInfos, receiver: donator });
    setDonator(donator);
    setshowButton(true);
  };
  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (TransactionInfos.amount.trim() == "") {
      (FieldErrors.amount = true), (valid = false);
    }
    if (TransactionInfos.receiver.trim() == "") {
      (FieldErrors.receiver = true), (valid = false);
    }
    if (TransactionInfos.name.trim() == "") {
      (FieldErrors.name = true), (valid = false);
    }
    if (TransactionInfos.location.trim() == "") {
      (FieldErrors.location = true), (valid = false);
    }

    SetErrors(FieldErrors);
    return valid;
  };
  const AddHassala = async () => {
    console.log("infos",TransactionInfos)
    Keyboard.dismiss();
    if (validate()) {
      const res = await CreateHassala({
        ...TransactionInfos,
      });
      if (res.ok) {
        route.params.showToast();
        navigation.goBack();
      } else {
      }
    } else {
      setErrorMessage("كل الخانات اجبارية");
      setErrorMessageVisible(true);
    }
  };
  const openPanel = (name) => {
    Keyboard.dismiss();
    setshowButton(false);
    SetErrors({ ...errors, [name]: false });
    setReceiverPannel(true);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />
          <Text style={styles.PageTitile}>اضافة حصالة</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Kofal")}>
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
        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<FontAwesome name="user" />}
              size={5}
              ml="2"
              color="#348578"
            />
          }
          w={{
            base: "95%",
            md: "25%",
          }}
          h={50}
          name="name"
          textAlign="right"
          placeholder="اسم الحصالة"
          {...styling}
          borderWidth={1}
          borderColor={errors.name ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "name")}
        />
        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<FontAwesome name="user" />}
              size={5}
              ml="2"
              color="#348578"
            />
          }
          w={{
            base: "95%",
            md: "25%",
          }}
          h={50}
          name="name"
          textAlign="right"
          placeholder="المكان "
          {...styling}
          borderWidth={1}
          borderColor={errors.location ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "location")}
        />
        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<FontAwesome name="user" />}
              size={5}
              ml="2"
              color="#348578"
            />
          }
          w={{
            base: "95%",
            md: "25%",
          }}
          h={50}
          name="name"
          textAlign="right"
          placeholder="المبلغ "
          {...styling}
          borderWidth={1}
          borderColor={errors.amount ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "amount")}
        />
        <TouchableWithoutFeedback onPress={() => openPanel("user")}>
          <View
            style={{
              ...styles.dateContainer,
              borderColor: errors.section ? "#c21a0e" : "grey",
            }}
          >
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="#348578"
            />
            <Text style={styles.InputText}> {Donator}</Text>
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
        <Button style={styles.Button} mode="contained" onPress={AddHassala}>
          <Text style={{ fontSize: 16, marginLeft: 10 }}> اضافة حصالة</Text>
        </Button>
      )}

      <Swipable
        title="اختيار المستلم"
        ChooseJob={ChooseDonator}
        data={users.map((t) => ({ title: t.name }))}
        isPanelActive={ReceiverPannel}
        setIsPanelActive={setReceiverPannel}
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
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
  },
  InputText: {
    fontFamily: "Tajawal-Medium",
  },
  Container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "20%",
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
  radioContainer: {
    padding: 0,
    width: "90%",
    alignItems: "center",
  },
});
