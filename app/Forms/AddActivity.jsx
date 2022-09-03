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
import MultipleOptionSwipable from "../Components/Containers/MultipleOptionSwipable";
import Swipable from "../Components/Containers/swipable";
import { useSelector } from "react-redux";
import { CreateActivity } from "../api/activities";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import uuid from "react-native-uuid";
export default function AddActivity({ route, navigation }) {
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [isFamiltPanelActive, setIsFamiltPanelActive] = useState(false);
  const [isTypePannel, setIsTypePannel] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [type, setType] = useState("نوع النشاط");
  const [orphanPlaceholder, setSelectedOrphan] = useState("الأيتام");
  const [FamilyPlaceholder, setFamilyPlaceholder] = useState("العائلات");
  const [selectedOrpahns, setSelectedOrpahns] = useState([]);
  const [selectedFamilies, setselectedFamilies] = useState([]);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [ActivityType, setActivityType] = useState("family");
  const [chosenDate, setChosenDate] = useState("");

  const [errors, SetErrors] = useState({
    title: false,
    type: false,
    selections: false,
  });
  const [ActivityInfos, setuserInfos] = useState({
    id: uuid.v4(),
    title: "",
    type: "",
    section: "قسم الأرامل",
    date: new Date(),
    author: useSelector((state) => state.Auth).name,
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (  isTypePannel || isPanelActive) {
          setIsTypePannel(false);
          setIsFamiltPanelActive(false);
          setIsPanelActive(false);
          return true;
        } else {
          return false;
        }
      }
    );
    return () => backHandler.remove();
  }, [isFamiltPanelActive, isTypePannel, isPanelActive]);

  const handleUserInput = (text, name) => {
    setErrorMessageVisible(false);
    SetErrors({ ...errors, [name]: false });
    setuserInfos({ ...ActivityInfos, [name]: text });
  };

  const openPanel = () => {
    SetErrors({ ...errors, selections: false });
    Keyboard.dismiss();
    setIsPanelActive(true);
    setshowButton(false);
  };
  const openFamilyPannel = () => {
    Keyboard.dismiss();
    SetErrors({ ...errors, selections: false });

    setIsFamiltPanelActive(true);
    setshowButton(false);
  };
  const openUsersPanel = () => {
    SetErrors({ ...errors, type: false });

    Keyboard.dismiss();
    setIsTypePannel(true);
    setshowButton(false);
  };

  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontFamily: "Tajawal-Medium",
    fontSize: 14,
  };

  const ChooseType = (type) => {
    SetErrors({ ...errors, type: false });
    setuserInfos({ ...ActivityInfos, type });
    setType(type);
    setIsTypePannel(false);
    setshowButton(true);
  };
  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (ActivityInfos.title.trim() == "") {
      (FieldErrors.title = true), (valid = false);
    }
    if (ActivityInfos.type.trim() == "") {
      (FieldErrors.type = true), (valid = false);
    }

    if (selectedOrpahns.length == 0 && selectedFamilies.length == 0) {
      (FieldErrors.selections = true), (valid = false);
    }
    SetErrors(FieldErrors);
    return valid;
  };
  const AddActivity = async () => {
    Keyboard.dismiss();
    if (validate()) {
  
      const res = await CreateActivity({ ...ActivityInfos,kids:selectedOrpahns,famillies:selectedFamilies,date:chosenDate,benificier:ActivityType });
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

  const Famillies = useSelector((state) => state.Families);
  let Orphans = [];
  Famillies.forEach((f) => {
    f.kids.forEach((k) => {
      Orphans.push({ ...k, lastName: f.fatherLastName });
    });
  });

  const getSelectedData = (data, type) => {
    let overFlow = data.length > 2 ? `... و ${data.length - 2} اخرين` : "";
    if (type == "orpahn") {
      if (data.length > 0) {
        setSelectedOrphan(
          data
            .map((d) => d.name + " " + d.lastName)
            .slice(0, 2)
            .join(",") + overFlow
        );
        setSelectedOrpahns(
          data.map((o) => ({ name: o.title, id: o.id, age: o.age ,gender:o.gender,scolarity:o.scolarity ,}))
        );
      } else {
        setSelectedOrpahns([]);
        setSelectedOrphan("اختيار الأيتام");
      }
    } else {
      if (data.length > 0) {
        setFamilyPlaceholder(
          data
            .map((d) => " عائلة " + d.fatherLastName + " ")
            .slice(0, 2)
            .join(",") + overFlow
        );
        setselectedFamilies(data.map((o) => ({ name: o.title, id: o.id })));
      } else {
        setselectedFamilies([]);
        setFamilyPlaceholder("اختيار العائلات");
      }
    }
  };
  const activityTypes = [
    "خرجة ترفيهية",
    "كسوة العيد",
    "قفة رمضان",
    "أضحية العيد",
    "حقيبة مدرسية",
    "قفة عاشوراء",
    "قفة المولد النبوي",
    "شتاء دافئ",
    "نشاط اخر",
  ];
  const [showDatePicker, setshowDatePicker] = useState(false);

  const [date, setdate] = useState("");
  const HandleDate = (date) => {
    if (date.nativeEvent.timestamp) {
      let MyDate = new Date(date.nativeEvent.timestamp);
      setChosenDate(MyDate)
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

          <Text style={styles.PageTitile}>اضافة نشاط</Text>
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
          placeholder="عنوان النشاط"
          {...styling}
          borderWidth={1}
          borderColor={errors.title ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "title")}
        />

        <TouchableWithoutFeedback onPress={() => openUsersPanel()}>
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
            <Text style={styles.InputText}> {type}</Text>
          </View>
        </TouchableWithoutFeedback>
        <Radio.Group
          value={ActivityType}
          style={{ flexDirection: "row" }}
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          onChange={(type) => {
            setActivityType(type);
          }}
        >
          <Radio
            size="lg"
            colorScheme="rgb(52, 133, 120)"
            value="family"
            my={1}
          >
            نشاط للعائلات
          </Radio>
          <Radio
            size="lg"
            colorScheme="rgb(52, 133, 120)"
            style={{ marginLeft: 20 }}
            value="orphan"
            my={1}
          >
            نشاط للأيتام
          </Radio>
        </Radio.Group>
        {ActivityType != "family" && (
          <TouchableWithoutFeedback onPress={() => openPanel()}>
            <View
              style={{
                ...styles.dateContainer,
                borderColor: errors.selections ? "#c21a0e" : "grey",
              }}
            >
              <Icon
                as={<MaterialIcons name="lock" />}
                size={5}
                ml="2"
                color="#348578"
              />
              <Text style={styles.InputText}> {orphanPlaceholder}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        {ActivityType == "family" && (
          <TouchableWithoutFeedback onPress={() => openFamilyPannel()}>
            <View
              style={{
                ...styles.dateContainer,
                borderColor: errors.selections ? "#c21a0e" : "grey",
              }}
            >
              <Icon
                as={<MaterialIcons name="lock" />}
                size={5}
                ml="2"
                color="#348578"
              />
              <Text style={styles.InputText}> {FamilyPlaceholder}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        <Text style={{width:"95%",fontSize:17,fontFamily: "Tajawal-Medium"}}>التاريخ</Text>
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
      {showButton && (
        <Button style={styles.Button} mode="contained" onPress={AddActivity}>
          <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة</Text>
        </Button>
      )}
      <MultipleOptionSwipable
        type={"orpahn"}
        title="الأيتام المستفيدين"
        getSelectedData={getSelectedData}
        data={Orphans.map((o) => ({ ...o, title: o.name + " " + o.lastName }))}
        isPanelActive={isPanelActive}
        setIsPanelActive={setIsPanelActive}
        setshowButton={setshowButton}
      />
      <MultipleOptionSwipable
        type={"family"}
        title="العائلات المستفيدة"
        getSelectedData={getSelectedData}
        data={Famillies.map((o) => ({ ...o, title: "عائلة " +o.fatherLastName }))}
        isPanelActive={isFamiltPanelActive}
        setIsPanelActive={setIsFamiltPanelActive}
        setshowButton={setshowButton}
      />

      <Swipable
        title="نوع النشاط"
        ChooseJob={ChooseType}
        data={activityTypes.map((t) => ({ title: t }))}
        isPanelActive={isTypePannel}
        setIsPanelActive={setIsTypePannel}
        setshowButton={setshowButton}
      />
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
