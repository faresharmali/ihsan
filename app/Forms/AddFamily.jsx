import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Input, Stack, Icon } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { CreateFamily } from "../api/family";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";
import Swipable from "../Components/Containers/swipable";

export default function AddFamily({ route, navigation }) {
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [wasseet, setwasseet] = useState("الوسيط الاجتماعي");
  let users = useSelector((state) => state.users).filter((d)=>d.job.trim()=="وسيط اجتماعي");
  let allUSers = users.map((u) => ({ title: u[0] }));
  const [errors, SetErrors] = useState({
    fatherFirstName: false,
    fatherLastName: false,
    motherFullName: false,
    adresse: false,
    salary: false,
    phone: false,
    donation: false,
    wasseet: false,
  });
  const [userInfos, setuserInfos] = useState({
    id: uuid.v4(),
    fatherFirstName: "",
    fatherLastName: "",
    motherFullName: "",
    adresse: "",
    salary: "",
    phone: "",
    donation: "",
    wasseet:""
  });
  const openPanel = () => {
    Keyboard.dismiss();
    setIsPanelActive(true);
    setshowButton(false);
  };
  const handleUserInput = (text, name) => {
    setErrorMessageVisible(false);
    SetErrors({ ...errors, [name]: false });
    setuserInfos({ ...userInfos, [name]: text });
  };

  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontFamily: "Tajawal-Medium",
    fontSize: 14,
  };

  const CreateNewUser = async () => {
    Keyboard.dismiss();
    if (validate()) {
      const res = await CreateFamily(userInfos);
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
  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (userInfos.fatherLastName.trim() == "") {
      (FieldErrors.fatherLastName = true), (valid = false);
    }
    if (userInfos.fatherFirstName.trim() == "") {
      (FieldErrors.fatherFirstName = true), (valid = false);
    }
    if (userInfos.motherFullName.trim() == "") {
      (FieldErrors.motherFullName = true), (valid = false);
    }
    if (userInfos.adresse.trim() == "") {
      (FieldErrors.adresse = true), (valid = false);
    }
    if (userInfos.phone.trim() == "") {
      (FieldErrors.phone = true), (valid = false);
    }
    if (userInfos.salary.trim() == "") {
      (FieldErrors.salary = true), (valid = false);
    }
    if (userInfos.donation.trim() == "") {
      (FieldErrors.donation = true), (valid = false);
    }
    if (userInfos.donation.trim() == "") {
      (FieldErrors.wasseet = true), (valid = false);
    }
    SetErrors(FieldErrors);
    return valid;
  };


  const ChooseJob = (wasseet) => {
    SetErrors({ ...errors, wasseet: false });
    setuserInfos({ ...userInfos, wasseet:wasseet });
    setwasseet(wasseet);
    setIsPanelActive(false);
    setshowButton(true);
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
          placeholder="اسم الأب "
          {...styling}
          borderWidth={1}
          borderColor={errors.fatherFirstName ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "fatherFirstName")}
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
          placeholder="لقب الأب "
          {...styling}
          borderWidth={1}
          borderColor={errors.fatherLastName ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "fatherLastName")}
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
          placeholder="اسم و لقب الأم"
          {...styling}
          borderWidth={1}
          borderColor={errors.motherFullName ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "motherFullName")}
        />
        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<MaterialIcons name="phone" />}
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
          textAlign="right"
          placeholder="رقم الهاتف"
          onChangeText={(text) => handleUserInput(text, "phone")}
          {...styling}
          borderWidth={1}
          borderColor={errors.phone ? "#c21a0e" : "grey"}
        />

        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<MaterialIcons name="account-circle" />}
              size={5}
              ml="2"
              color="#348578"
            />
          }
          style={styles.input}
          w={{
            base: "95%",
            md: "50%",
          }}
          h={50}
          textAlign="right"
          placeholder="العنوان"
          onChangeText={(text) => handleUserInput(text, "adresse")}
          {...styling}
          borderWidth={1}
          borderColor={errors.adresse ? "#c21a0e" : "grey"}
        />
        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<MaterialIcons name="lock" />}
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
          textAlign="right"
          placeholder="المدخول"
          onChangeText={(text) => handleUserInput(text, "salary")}
          {...styling}
          type={"motherFullName"}
          borderWidth={1}
          borderColor={errors.salary ? "#c21a0e" : "grey"}
        />
        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<MaterialIcons name="lock" />}
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
          textAlign="right"
          placeholder="مبلغ الكفالة"
          onChangeText={(text) => handleUserInput(text, "donation")}
          {...styling}
          borderWidth={1}
          type={"motherFullName"}
          borderColor={errors.donation ? "#c21a0e" : "grey"}
        />
          <TouchableWithoutFeedback onPress={() => openPanel()}>
          <View
            style={{
              ...styles.dateContainer,
              borderColor: errors.wasseet ? "#c21a0e" : "grey",
            }}
          >
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="#348578"
            />
            <Text style={styles.InputText}>{wasseet} </Text>
          </View>
        </TouchableWithoutFeedback>
      </Stack>
      {ErrorMessageVisible && (
        <View style={styles.ErrorMessage}>
          <FontAwesome name="exclamation-triangle" size={20} color="#BE123C" />
          <Text style={styles.errorText}>{ErrorMessage}</Text>
        </View>
      )}

<Swipable
        title="اختيار الوسيط الاجتماعي"
        ChooseJob={ChooseJob}
        data={allUSers}
        isPanelActive={isPanelActive}
        setIsPanelActive={setIsPanelActive}
        setshowButton={setshowButton}
      />
      {showButton && 
      <Button style={styles.Button} mode="contained" onPress={CreateNewUser}>
        <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة </Text>
      </Button>
      }
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
