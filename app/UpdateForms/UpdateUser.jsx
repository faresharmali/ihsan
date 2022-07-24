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

export default function UpdateUser({ route, navigation }) {
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [IsModulesPannel, setIsModulesPannel] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [FamilliesPlaceholder, setFamilliesPlaceHolder] = useState("العائلات");
  const [selectedFamillies, setselectedFamillies] = useState([]);

  const Famillies = useSelector((state) => state.Families);
  const [errors, SetErrors] = useState({
    username: false,
    password: false,
    phone: false,
    confirmepassword: false,
    name: false,
    job: false,
    famillies: false,
  });

  const [userInfos, setuserInfos] = useState({
    ...route.params.Infos,
  });
  const [job, setJob] = useState("اختيار المهمة");

  const handleUserInput = (text, name) => {
    setErrorMessageVisible(false);
    SetErrors({ ...errors, [name]: false });
    setuserInfos({ ...userInfos, [name]: text });
  };
  const openPanel = () => {
    Keyboard.dismiss();
    setIsPanelActive(true);
    setshowButton(false);
  };

  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontFamily: "Tajawal-Medium",
    fontSize: 14,
  };
  let jobs = [
    { title: "قسم الادارة" },
    { title: "قسم المالية" },
    { title: "قسم القفة" },
    { title: "موزع القفة" },
    { title: "قسم الأيتام" },
    { title: "قسم التعليم" },
    { title: "قسم الصحة" },
    { title: "وسيط اجتماعي" },
    { title: "قسم الأرامل" },
    { title: "قسم الأنشطة الخيرية" },
  ];
  const ChooseJob = (dp) => {
    SetErrors({ ...errors, job: false });
    setErrorMessageVisible(false);
    setuserInfos({ ...userInfos, job: dp });
    setJob(dp);
    setIsPanelActive(false);
    setshowButton(true);
  };
  const CreateNewUser = async () => {
    Keyboard.dismiss();
    if (validate()) {
      if (userInfos.password == userInfos.confirmepassword) {
        const user = { ...userInfos };
        delete user.confirmepassword;
        const res = await CreateUser({ ...user, famillies: selectedFamillies });
        if (res.ok) {
          route.params.showToast();
          navigation.goBack();
        } else {
        }
      } else {
        SetErrors({ ...errors, password: true, confirmepassword: true });

        setErrorMessage("كلمة السر غير متطابقة");
        setErrorMessageVisible(true);
      }
    } else {
      setErrorMessage("كل الخانات اجبارية");
      setErrorMessageVisible(true);
    }
  };

  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (userInfos.name.trim() == "") {
      (FieldErrors.name = true), (valid = false);
    }
    if (userInfos.username.trim() == "") {
      (FieldErrors.username = true), (valid = false);
    }
    if (userInfos.password.trim() == "") {
      (FieldErrors.password = true), (valid = false);
    }
    if (userInfos.confirmepassword.trim() == "") {
      (FieldErrors.confirmepassword = true), (valid = false);
    }
    if (userInfos.phone.trim() == "") {
      (FieldErrors.phone = true), (valid = false);
    }
    if (userInfos.job.trim() == "") {
      (FieldErrors.job = true), (valid = false);
    }
    if (
      (job == "موزع القفة" || job == "وسيط اجتماعي") &&
      selectedFamillies.length == 0
    ) {
      (FieldErrors.famillies = true), (valid = false);
    }

    SetErrors(FieldErrors);
    return valid;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isPanelActive || IsModulesPannel) {
          setIsPanelActive(false);
          setIsModulesPannel(false);
          return true;
        } else {
          return false;
        }
      }
    );
    return () => backHandler.remove();
  }, [isPanelActive, IsModulesPannel]);

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
      SetErrors({ ...errors, famillies: false });
    } else {
      setselectedFamillies([]);
      setFamilliesPlaceHolder("العائلات");
    }
  };
  const OpenFamilyModel = () => {
    Keyboard.dismiss();
    SetErrors({ ...errors, selections: false });

    setIsModulesPannel(true);
    setshowButton(false);
  };
  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}> تعديل المعلومات</Text>
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
       
        <View style={styles.InputsContainer}>
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
              base: "49%",
              md: "25%",
            }}
            h={50}
            textAlign="right"
            placeholder="رقم الهاتف"
            value={userInfos.phone}

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
              base: "49%",
              md: "50%",
            }}
            h={50}
            textAlign="right"
            placeholder="اسم المستخدم"
            onChangeText={(text) => handleUserInput(text, "username")}
            {...styling}
            borderWidth={1}
            value={userInfos.username}
            borderColor={errors.username ? "#c21a0e" : "grey"}
          />
        </View>
        <View style={styles.InputsContainer}>
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
              base: "49%",
              md: "25%",
            }}
            h={50}
            textAlign="right"
            placeholder="تأكيد كلمة المرور"
            onChangeText={(text) => handleUserInput(text, "confirmepassword")}
            {...styling}
            borderWidth={1}
            type={"password"}
            borderColor={errors.confirmepassword ? "#c21a0e" : "grey"}
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
              base: "49%",
              md: "25%",
            }}
            h={50}
            textAlign="right"
            placeholder="كلمة المرور"
            onChangeText={(text) => handleUserInput(text, "password")}
            {...styling}
            type={"password"}
            borderWidth={1}
            borderColor={errors.password ? "#c21a0e" : "grey"}
          />
        </View>

        <TouchableWithoutFeedback onPress={() => openPanel()}>
          <View
            style={{
              ...styles.dateContainer,
              borderColor: errors.job ? "#c21a0e" : "grey",
            }}
          >
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="#348578"
            />
            <Text style={styles.InputText}>{job} </Text>
          </View>
        </TouchableWithoutFeedback>
        {(job == "موزع القفة" || job == "وسيط اجتماعي") && (
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
        )}
      </Stack>
      {ErrorMessageVisible && (
        <View style={styles.ErrorMessage}>
          <FontAwesome name="exclamation-triangle" size={20} color="#BE123C" />
          <Text style={styles.errorText}>{ErrorMessage}</Text>
        </View>
      )}

      {showButton && (
        <Button style={styles.Button} mode="contained" onPress={CreateNewUser}>
          <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة مستخدم </Text>
        </Button>
      )}
      <Swipable
        title="اختيار القسم"
        ChooseJob={ChooseJob}
        data={jobs}
        isPanelActive={isPanelActive}
        setIsPanelActive={setIsPanelActive}
        setshowButton={setshowButton}
      />
      <MultipleOptionSwipable
        type={"family"}
        title="العائلات"
        getSelectedData={getSelectedData}
        data={Famillies.map((o) => ({
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
