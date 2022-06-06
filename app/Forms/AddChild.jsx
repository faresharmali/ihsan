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
export default function AddChild({ route, navigation }) {
  console.log("paramssss",route.params.id)
  const dispatch = useDispatch();
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [LevelChoiceVisible, setLevelChoiceVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [level, setLevel] = useState("المستوى الدراسي");
  const [gender, setgender] = useState("ذكر");
  const [Education, setEducation] = useState(false);
  const [ChildData, setChildData] = useState({
    id: uuid.v4(),
    name: "",
    age: "",
    scolarity: "",
  });
  const [errors, SetErrors] = useState({
    name: false,
    age: false,
    scolarity: false,
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
    if (ChildData.age.trim() == "") {
      (FieldErrors.age = true), (valid = false);
    }
    if (ChildData.scolarity.trim() == "") {
      (FieldErrors.scolarity = true), (valid = false);
    }
    console.log(FieldErrors);
    SetErrors(FieldErrors);
    return valid;
  };
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
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
        kid: { ...ChildData, gender, Education },
      });
      if (res.ok) {
        dispatch(
          addkid({
            ...ChildData,
            gender,
            Education,
            id: route.params.id,
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
    setErrorMessageVisible(false);
    SetErrors({ ...errors, [name]: false });
    setChildData({ ...ChildData, [name]: e });
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
          placeholder="العمر "
          {...styling}
          borderWidth={1}
          borderColor={errors.age ? "#c21a0e" : "grey"}
          onChangeText={(text) => inputHandler(text, "age")}
        />

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
        <HStack space={6}>
          <Checkbox onChange={(e) => setEducation(e)} value="one" my={2}>
            <Text style={styles.checkBoxText}>يستفيد من قسم التعليم</Text>
          </Checkbox>
        </HStack>
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

      <TouchableOpacity
        style={styles.Button}
        mode="contained"
        onPress={CreateKid}
      >
        <Text style={{ fontSize: 17, marginLeft: 10, color: "#fff" }}>
          اضافة{" "}
        </Text>
      </TouchableOpacity>

      <ScolaritySwipeable
        title="اختيار المستوى الدراسي"
        ChooseLevel={ChooseLevel}
        isPanelActive={LevelChoiceVisible}
        setIsPanelActive={setLevelChoiceVisible}
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
});
