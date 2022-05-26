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
import { CreateReport } from "../api/report";
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
  const [errors, SetErrors] = useState({
    title: false,
    type: false,
    content: false,
  });
  const [Reportinfos, setuserInfos] = useState({
    id: uuid.v4(),
    title: "",
    type: "",
    content: "",
    section: "قسم الأرامل",
    date: new Date(),
    author: useSelector((state) => state.Auth).name,
  });
  const auth = useSelector((state) => state.Auth);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (backHandler || isTypePannel || isPanelActive) {
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
    setuserInfos({ ...Reportinfos, [name]: text });
  };

  const openPanel = () => {
    Keyboard.dismiss();
    setIsPanelActive(true);
    setshowButton(false);
  };
  const openFamilyPannel = () => {
    Keyboard.dismiss();
    setIsFamiltPanelActive(true);
    setshowButton(false);
  };
  const openUsersPanel = () => {
    Keyboard.dismiss();
    setIsTypePannel(true);
    setshowButton(false);
  };

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

  const ChooseType = (type) => {
    SetErrors({ ...errors, type: false });
    setuserInfos({ ...Reportinfos, type });
    setType(type);
    setIsTypePannel(false);
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
          data.map((o) => ({ name: o.title, id: o.id, age: o.age }))
        );
      } else {
        setSelectedOrphan("اختيار الأيتام");
      }
    } else {
      if (data.length > 0) {
        console.log("data", data);
        setFamilyPlaceholder(
          data
            .map((d) => " عائلة " + d.fatherLastName + " ")
            .slice(0, 2)
            .join(",") + overFlow
        );
        setselectedFamilies(data.map((o) => ({ name: o.title, id: o.id })));
      } else {
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
                borderColor: errors.type ? "#c21a0e" : "grey",
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
                borderColor: errors.type ? "#c21a0e" : "grey",
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
        data={Famillies.map((o) => ({ ...o, title: o.fatherLastName }))}
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
