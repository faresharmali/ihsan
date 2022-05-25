import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Stack, Icon, TextArea } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import Swipable from "../Components/Containers/swipable";
import { useSelector } from "react-redux";
import { CreateReport } from "../api/report";
import uuid from "react-native-uuid";
export default function AddReport({ route, navigation }) {
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [isUsersPannel, setisUsersPannel] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [type, setType] = useState("نوع التقرير");
  const [benificier, setSelectedwidow] = useState("الأرملة");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [errors, SetErrors] = useState({
    title: false,
    type: false,
    benificier: false,
    content: false,
  });
  const [Reportinfos, setuserInfos] = useState({
    id: uuid.v4(),
    title: "",
    type: "",
    benificier: "",
    content: "",
    section: "قسم الأرامل",
    date: new Date(),
    author: useSelector((state)=>state.Auth).name,
  });
  const auth=useSelector((state)=>state.Auth)
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isPanelActive || isUsersPannel) {
          setIsPanelActive(false);
          setisUsersPannel(false);
          return true;
        } else {
          return false;
        }
      }
    );
    return () => backHandler.remove();
  }, [isPanelActive, isUsersPannel]);

  const handleUserInput = (text, name) => {
    setErrorMessageVisible(false);
    SetErrors({ ...errors, [name]: false });
    setuserInfos({ ...Reportinfos, [name]: text });
  };

  const openPanel = () => {
    Keyboard.dismiss();
    setIsPanelActive(true);
    setshowButton(false);
  };
  const openUsersPanel = () => {
    Keyboard.dismiss();
    setisUsersPannel(true);
    setshowButton(false);
  };
  let Widows = useSelector((state) => state.Families);
  let allWidows = Widows.map((u) => ({ title: u.motherFullName }));

  let ReportTypes = [
    { title: "استفادة" },
    { title: "طلب" },
    { title: "معلومة" },
  ];
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontFamily: "Tajawal-Medium",
    fontSize: 14,
  };
  let TextAreaStyle = {
    borderColor: errors.content ? "#c21a0e" : "grey",
    fontSize: 17,
    fontFamily: "Tajawal-Medium",
    color: "#000",
  };
  const ChooseJob = (benificier) => {
    SetErrors({ ...errors, benificier: false });
    setuserInfos({ ...Reportinfos, benificier });
    setSelectedwidow(benificier);
    setIsPanelActive(false);
    setshowButton(true);
  };
  const ChooseUser = (type) => {
    SetErrors({ ...errors, type: false });
    setuserInfos({ ...Reportinfos, type });
    setType(type);
    setisUsersPannel(false);
    setshowButton(true);
  };
  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (Reportinfos.title.trim() == "") {
      (FieldErrors.title = true), (valid = false);
    }
    if (Reportinfos.type.trim() == "") {
      (FieldErrors.type = true), (valid = false);
    }
    if (Reportinfos.content.trim() == "") {
      (FieldErrors.content = true), (valid = false);
    }
    if (Reportinfos.benificier.trim() == "") {
      (FieldErrors.benificier = true), (valid = false);
    }
    SetErrors(FieldErrors);
    return valid;
  };
  const AddDonator = async () => {
  
    Keyboard.dismiss();
    if (validate()) {
      const res = await CreateReport({ ...Reportinfos });
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
  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}>اضافة تقرير</Text>
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
          placeholder="عنوان التقرير"
          {...styling}
          borderWidth={1}
          borderColor={errors.title ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "title")}
        />

        <TouchableWithoutFeedback onPress={() => openUsersPanel()}>
          <View
            style={{
              ...styles.dateContainer,
              borderColor: errors.benificier ? "#c21a0e" : "grey",
            }}
          >
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="#348578"
            />
            <Text style={styles.InputText}> {type}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => openPanel()}>
          <View
            style={{
              ...styles.dateContainer,
              borderColor: errors.type ? "#c21a0e" : "grey",
            }}
          >
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="#348578"
            />
            <Text style={styles.InputText}> {benificier}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TextArea
        onChangeText={(text)=>handleUserInput(text,"content")}
          borderWidth={1}
          h={200}
          placeholder="التقرير"
          w="95%"
          {...TextAreaStyle}
        />
      </Stack>
      {ErrorMessageVisible && (
        <View style={styles.ErrorMessage}>
          <FontAwesome name="exclamation-triangle" size={20} color="#BE123C" />
          <Text style={styles.errorText}>{ErrorMessage}</Text>
        </View>
      )}
      {showButton && (
        <Button style={styles.Button} mode="contained" onPress={AddDonator}>
          <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة</Text>
        </Button>
      )}
      <Swipable
        title="اختيار الأرملة"
        ChooseJob={ChooseJob}
        data={allWidows}
        isPanelActive={isPanelActive}
        setIsPanelActive={setIsPanelActive}
        setshowButton={setshowButton}
      />
      <Swipable
        title="اختيار نوع التقرير"
        ChooseJob={ChooseUser}
        data={ReportTypes}
        isPanelActive={isUsersPannel}
        setIsPanelActive={setisUsersPannel}
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
});
