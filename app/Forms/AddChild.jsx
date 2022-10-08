import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Stack, Icon, Radio, Checkbox, HStack } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { AddKid } from "../api/family";
import uuid from "react-native-uuid";
import ScolaritySwipeable from "../Components/Containers/ScolaritySwipable";
import MultipleOptionSwipable from "../Components/Containers/MultipleOptionSwipable";
import Swipable from "../Components/Containers/swipable";

export default function AddChild({ route, navigation }) {
  const dispatch = useDispatch();
  const [isPanelActive, setIsPanelActive] = useState(false);

  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [LevelChoiceVisible, setLevelChoiceVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [level, setLevel] = useState("المستوى الدراسي");
  const [ModulesPlaceHolder, setModulesPlaceHolder] = useState("المواد");
  const [gender, setgender] = useState("ذكر");
  const [Education, setEducation] = useState(false);
  const [ModulesPannel, setIsModulesPannel] = useState(false);
  const [SelectedModules, setSelectedModules] = useState([]);
  const [sick, setSickness] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [month, setMonth] = useState("الشهر");

  const [ChildData, setChildData] = useState({
    id: uuid.v4(),
    name: "",
    day: "",
    month: "",
    year: "",
    scolarity: "",
    sickness: "",
  });
  const [errors, SetErrors] = useState({
    name: false,
    age: false,
    scolarity: false,
    sickness: false,
    modules: false,
  });
  const ChooseLevel = (data) => {
    setLevel(data);
    SetErrors({ ...errors, scolarity: false });
    setChildData({ ...ChildData, scolarity: data });
    setLevelChoiceVisible(false);
  };
  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (ChildData.name.trim() == "") {
      (FieldErrors.name = true), (valid = false);
    }
    if (ChildData.day.trim() == "" || (parseInt(ChildData.day) < 0)|| (parseInt(ChildData.day) > 31)) {
      (FieldErrors.day = true), (valid = false);
    }
    if (ChildData.month.trim() == "") {
      (FieldErrors.month = true), (valid = false);
    }
    if (ChildData.year.trim() == "") {
      (FieldErrors.year = true), (valid = false);
    }
    if (ChildData.scolarity.trim() == "") {
      (FieldErrors.scolarity = true), (valid = false);
    }
    if (sick && ChildData.sickness.trim() == "") {
      (FieldErrors.sickness = true), (valid = false);
    }
    if (Education && SelectedModules.length == 0) {
      (FieldErrors.modules = true), (valid = false);
    }
    SetErrors(FieldErrors);
    return valid;
  };
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontSize: 15,
  };
  const addkid = (data) => {
    return {
      type: "AddChild",
      data: data,
    };
  };

  const CreateKid = async () => {
    Keyboard.dismiss();
    if (validate()) {
      const res = await AddKid({
        id: route.params.id,
        kid: {
          ...ChildData,
          day: ChildData.day.length >1 ? ChildData.day : "0"+ChildData.day,
          gender,
          Education,
          sick,
          modules: JSON.stringify(SelectedModules),
        },
      });
      if (res.ok) {
        dispatch(
          addkid({
            ...ChildData,
            gender,
            Education,
            id: route.params.id,
            sick,
            modules: JSON.stringify(SelectedModules),
          })
        );
        route.params.showToast();
        navigation.goBack();
      } else {
        setErrorMessage("حدث خطأ يرجى اعادة المحاولة");
        setErrorMessageVisible(true);
      }
    } else {
      setErrorMessage("كل الخانات اجبارية");
      setErrorMessageVisible(true);
    }
  };

  const inputHandler = (e, name) => {
    if (name == "age") {


    } else {
      setErrorMessageVisible(false);
      SetErrors({ ...errors, [name]: false });
      setChildData({ ...ChildData, [name]: e });
    }

  };
  const openUsersPanel = () => {
    Keyboard.dismiss();
    setLevelChoiceVisible(true);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (LevelChoiceVisible) {
          setLevelChoiceVisible(false);
          return true;
        } else {
          return false;
        }
      }
    );
    return () => backHandler.remove();
  }, [LevelChoiceVisible]);

  const getSelectedData = (data) => {
    let overFlow = data.length > 2 ? `... و ${data.length - 2} اخرين` : "";
    if (data.length > 0) {
      setModulesPlaceHolder(
        data
          .map((d) => d.title + " ")
          .slice(0, 2)
          .join(",") + overFlow
      );
      setSelectedModules(data);
    } else {
      setSelectedModules([]);
      setModulesPlaceHolder("المواد");
    }
  };
  const OpenModulesPanel = () => {
    Keyboard.dismiss();
    SetErrors({ ...errors, selections: false });

    setIsModulesPannel(true);
    setshowButton(false);
  };
  let Modules = [
    { title: "الرياضيات", id: 1 },
    { title: "اللغة العربية", id: 2 },
    { title: "اللغة الفرنسية", id: 3 },
    { title: "اللغة الانجليزية", id: 4 },
  ];
  const ChooseMonth = (dp, value) => {
    SetErrors({ ...errors, job: false });
    setErrorMessageVisible(false);
    setChildData({ ...ChildData, month: value });
    setMonth(dp);
    setIsPanelActive(false);
    setshowButton(true);
  };
  let months = [
    { title: "جانفي ", value: "01" },
    { title: "فيفري", value: "02" },
    { title: "مارس ", value: "03" },
    { title: "أفريل ", value: "04" },
    { title: " ماي", value: "05" },
    { title: " جوان", value: "06" },
    { title: "جويلية ", value: "07" },
    { title: " أوت", value: "08" },
    { title: " سبتمبر", value: "09" },
    { title: " أكتوبر", value: "10" },
    { title: " نوفمبر ", value: "11" },
    { title: " ديسمبر ", value: "12" },
  ];
  const openPanel = () => {
    Keyboard.dismiss();
    setIsPanelActive(true);
    setshowButton(false);
  };
  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}>اضافة ابن</Text>
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
          textAlign="right"
          placeholder="الاسم"
          {...styling}
          borderWidth={1}
          borderColor={errors.name ? "#c21a0e" : "grey"}
          onChangeText={(text) => inputHandler(text, "name")}
        />


        <Text style={styles.Datetext}>تاريخ الميلاد</Text>

        <View style={styles.birthdayContainer}>
          <Input
            w={{
              base: "30%",
              md: "25%",
            }}
            h={50}
            textAlign="right"
            placeholder="السنة"
            {...styling}
            borderWidth={1}
            borderColor={errors.year ? "#c21a0e" : "grey"}
            onChangeText={(text) => inputHandler(text, "year")}
          />

          <TouchableWithoutFeedback onPress={() => openPanel()}>
            <View
              style={{
                ...styles.dateContainer,
                borderColor: errors.job ? "#c21a0e" : "grey",
                width: "30%"
              }}
            >

              <Text style={styles.InputText}> {month}</Text>
            </View>
          </TouchableWithoutFeedback>
          <Input
            w={{
              base: "30%",
              md: "25%",
            }}
            h={50}
            textAlign="right"
            placeholder="اليوم"
            {...styling}
            borderWidth={1}
            borderColor={errors.day ? "#c21a0e" : "grey"}
            onChangeText={(text) => inputHandler(text, "day")}
          />
        </View>


        <TouchableWithoutFeedback onPress={() => openUsersPanel()}>
          <View
            style={{
              ...styles.dateContainer,
              borderColor: errors.scolarity ? "#c21a0e" : "grey",
            }}
          >
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="#348578"
            />
            <Text style={styles.InputText}>{level} </Text>
          </View>
        </TouchableWithoutFeedback>
        <Radio.Group
          value={gender}
          style={{ flexDirection: "row" }}
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          onChange={(gender) => {
            setgender(gender);
          }}
        >
          <Radio size="lg" colorScheme="rgb(52, 133, 120)" value="ذكر" my={1}>
            ذكر
          </Radio>
          <Radio
            size="lg"
            colorScheme="rgb(52, 133, 120)"
            style={{ marginLeft: 20 }}
            value="أنثى"
            my={1}
          >
            أنثى
          </Radio>
        </Radio.Group>
        <Checkbox onChange={(e) => setSickness(e)} value="one" my={2}>
          <Text style={styles.checkBoxText}>يعاني من مرض مزمن</Text>
        </Checkbox>

        {sick && (
          <Input
            InputRightElement={
              <Icon
                style={{ marginRight: 10 }}
                as={<FontAwesome name="birthday-cake" />}
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
            placeholder="المرض "
            {...styling}
            borderWidth={1}
            borderColor={errors.sickness ? "#c21a0e" : "grey"}
            onChangeText={(text) => inputHandler(text, "sickness")}
          />
        )}

        <HStack space={6}>
          <Checkbox onChange={(e) => setEducation(e)} value="one" my={2}>
            <Text style={styles.checkBoxText}>يستفيد من دروس الدعم </Text>
          </Checkbox>
        </HStack>
        {Education && (
          <TouchableWithoutFeedback onPress={() => OpenModulesPanel()}>
            <View
              style={{
                ...styles.dateContainer,
                borderColor: errors.modules ? "#c21a0e" : "grey",
              }}
            >
              <Icon
                as={<MaterialIcons name="lock" />}
                size={5}
                ml="2"
                color="#348578"
              />
              <Text style={styles.InputText}> {ModulesPlaceHolder}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}

        {ErrorMessageVisible && (
          <View style={styles.ErrorMessage}>
            <FontAwesome
              name="exclamation-triangle"
              size={20}
              color="#BE123C"
            />
            <Text style={styles.errorText}>{ErrorMessage}</Text>
          </View>
        )}
      </Stack>
      {showButton && (
        <TouchableOpacity
          style={styles.Button}
          mode="contained"
          onPress={CreateKid}
        >
          <Text style={{ fontSize: 17, marginLeft: 10, color: "#fff" }}>
            اضافة{" "}
          </Text>
        </TouchableOpacity>
      )}

      <ScolaritySwipeable
        title="اختيار المستوى الدراسي"
        ChooseLevel={ChooseLevel}
        isPanelActive={LevelChoiceVisible}
        setIsPanelActive={setLevelChoiceVisible}
      />
      <Swipable
        title="اختيار القسم"
        ChooseJob={ChooseMonth}
        data={months}
        isPanelActive={isPanelActive}
        setIsPanelActive={setIsPanelActive}
        setshowButton={setshowButton}
      />
      <MultipleOptionSwipable
        type={"family"}
        title="المواد"
        getSelectedData={getSelectedData}
        data={Modules}
        isPanelActive={ModulesPannel}
        setIsPanelActive={setIsModulesPannel}
        setshowButton={setshowButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  checkBoxText: {
    fontFamily: "Tajawal-Medium",
    fontSize: 17,
    marginLeft: 10,
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
  },
  back: {
    left: 0,
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
  birthdayContainer: {
    width: "95%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  Datetext: {
    fontFamily: "Tajawal-Medium",
    width: "95%",
    fontSize: 15
  }
});
