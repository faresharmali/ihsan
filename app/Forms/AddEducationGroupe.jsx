import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Stack, Icon, Radio } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import Swipable from "../Components/Containers/swipable";
import { useSelector } from "react-redux";
import { CreateEducationMember } from "../api/activities";
import uuid from "react-native-uuid";

export default function AddEducationMember({ route, navigation }) {
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [isUsersPannel, setisUsersPannel] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [job, setJob] = useState("المجموعة");
  const [user, setUser] = useState("المتمدرس");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [people, setPeople] = useState([]);
  const [peopleValue, setpeopleValue] = useState(2);
  const [errors, SetErrors] = useState({
    groupe: false,
    person: false,
  });
  const [userInfos, setuserInfos] = useState({
    id: uuid.v4(),
    groupe: "",
    person: "",
  });
  const Families = useSelector((state) => state.Families);
  const token = useSelector((state) => state.Auth).token;
  let kids = [];
  Families.forEach((f) => {
    f.kids.forEach((k) => {
      kids.push({
        title: k.name + " " + f.fatherLastName,
        name: k.name + " " + f.fatherLastName,
        number: f.phone,
        address: f.adresse,
      });
    });
  });
  let moms = Families.map((f) => ({
    title: f.motherFullName,
    name: f.motherFullName,
    number: f.phone,
    address: f.adresse,
  }));
  let allpeople = [...moms, ...kids];
  useEffect(() => {
    console.log(userInfos);
    if (peopleValue == 2) setPeople(moms);
    else setPeople(kids);
    setUser("المتمدرس");
    setuserInfos({ ...userInfos, person: "" });
  }, [peopleValue]);
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

  let jobs = [
    { title: "المجموعة 1" },
    { title: "المجموعة 2" },
    { title: "المجموعة 3" },
  ];
  const ChooseGroupe = (groupe) => {
    SetErrors({ ...errors, groupe: false });
    setuserInfos({ ...userInfos, groupe });
    setJob(groupe);
    setIsPanelActive(false);
    setshowButton(true);
    setErrorMessageVisible(false);
  };
  const ChooseUser = (person) => {
    SetErrors({ ...errors, person: false });
    setuserInfos({
      ...userInfos,
      person: JSON.stringify(allpeople.filter((p) => p.title == person)[0]),
    });
    setUser(person);
    setisUsersPannel(false);
    setshowButton(true);
    setErrorMessageVisible(false);
  };
  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (userInfos.groupe.trim() == "") {
      (FieldErrors.groupe = true), (valid = false);
    }
    if (userInfos.person.trim() == "") {
      (FieldErrors.person = true), (valid = false);
    }
    SetErrors(FieldErrors);
    return valid;
  };
  const AddDonator = async () => {
    Keyboard.dismiss();
    if (validate()) {
      const res = await CreateEducationMember({
        ...userInfos,
      });
      if (res.data.ok) {
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

          <Text style={styles.PageTitile}>اضافة متمدرس</Text>
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
        <TouchableWithoutFeedback onPress={() => openPanel()}>
          <View
            style={{
              ...styles.dateContainer,
              borderColor: errors.groupe ? "#c21a0e" : "grey",
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
        <Radio.Group
          value={peopleValue}
          style={{ flexDirection: "row" }}
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          onChange={(type) => {
            setpeopleValue(type);
          }}
        >
          <Radio size="lg" colorScheme="rgb(52, 133, 120)" value={1} my={1}>
            أيتام
          </Radio>
          <Radio
            size="lg"
            colorScheme="rgb(52, 133, 120)"
            style={{ marginLeft: 20 }}
            value={2}
            my={1}
          >
            أرامل
          </Radio>
        </Radio.Group>

        <TouchableWithoutFeedback onPress={() => openUsersPanel()}>
          <View
            style={{
              ...styles.dateContainer,
              borderColor: errors.person ? "#c21a0e" : "grey",
            }}
          >
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="#348578"
            />
            <Text style={styles.InputText}>{user} </Text>
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
        <Button style={styles.Button} mode="contained" onPress={AddDonator}>
          <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة</Text>
        </Button>
      )}

      <Swipable
        title="اختيار المجموعة"
        ChooseJob={ChooseGroupe}
        data={jobs}
        isPanelActive={isPanelActive}
        setIsPanelActive={setIsPanelActive}
        setshowButton={setshowButton}
      />
      <Swipable
        title="اختيار المتمدرس"
        ChooseJob={ChooseUser}
        data={people}
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
