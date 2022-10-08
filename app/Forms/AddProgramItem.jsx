import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Stack, Icon, Radio } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { CreateProgramItem } from "../api/activities";

import RNDateTimePicker from "@react-native-community/datetimepicker";
import uuid from "react-native-uuid";

export default function AddProgramItem({ route, navigation }) {
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [chosenDate, setChosenDate] = useState("");
  const [showDatePicker, setshowDatePicker] = useState(false);
  const user = useSelector((state) => state.Auth).token;
  const [errors, SetErrors] = useState({
    title: false,
    selections: false,
  });
  const [ProgramInfos, setuserInfos] = useState({
    id: uuid.v4(),
    title: "",
    author: useSelector((state) => state.Auth).name,
  });

  const handleUserInput = (text, name) => {
    setErrorMessageVisible(false);
    SetErrors({ ...errors, [name]: false });
    setuserInfos({ ...ProgramInfos, [name]: text });
  };

  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontFamily: "Tajawal-Medium",
    fontSize: 14,
  };

  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (ProgramInfos.title.trim() == "") {
      (FieldErrors.title = true), (valid = false);
    }
    SetErrors(FieldErrors);
    return valid;
  };
  const AddActivity = async () => {
    Keyboard.dismiss();
    if (validate()) {
      const res = await CreateProgramItem(
        { ...ProgramInfos, date: chosenDate, section: route.params.section },
        user
      );
      if (res.data.ok) {
        route.params.fetchProgram();
        navigation.goBack();
        route.params.showToast();
      } else {
        navigation.goBack();
        route.params.showToast();
      }
    } else {
      setErrorMessage("كل الخانات اجبارية");
      setErrorMessageVisible(true);
    }
  };

  const [date, setdate] = useState("");
  const HandleDate = (date) => {
    if (date.nativeEvent.timestamp) {
      let MyDate = new Date(date.nativeEvent.timestamp);
      setChosenDate(MyDate);
      setdate(
        MyDate.getFullYear() +
          "-" +
          (MyDate.getMonth() + 1) +
          "-" +
          MyDate.getDate()
      );
    } else {
    }
    setshowDatePicker(false);
  };
  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}>اضافة برنامج</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
          placeholder="عنوان البرنامج"
          {...styling}
          borderWidth={1}
          borderColor={errors.title ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "title")}
        />

        <Text
          style={{ width: "95%", fontSize: 17, fontFamily: "Tajawal-Medium" }}
        >
          التاريخ
        </Text>
        <TouchableWithoutFeedback onPress={() => setshowDatePicker(true)}>
          <View style={styles.dateContainer}>
            <Text style={styles.InputText}> {date}</Text>
          </View>
        </TouchableWithoutFeedback>
      </Stack>
      {ErrorMessageVisible && (
        <View style={styles.ErrorMessage}>
          <FontAwesome name="exclamation-triangle" size={20} color="#BE123C" />
          <Text style={styles.errorText}>{ErrorMessage}</Text>
        </View>
      )}
      <Button style={styles.Button} mode="contained" onPress={AddActivity}>
        <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة</Text>
      </Button>

      {showDatePicker && (
        <RNDateTimePicker
          is24Hour={true}
          locale="ar-dz"
          mode="date"
          value={new Date()}
          onChange={HandleDate}
        />
      )}
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
});
