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
import { CreateDonator } from "../api/user";
import MultipleOptionSwipable from "../Components/Containers/MultipleOptionSwipable";
import uuid from "react-native-uuid";

export default function AddDonator({ route, navigation }) {
  const [FamilyPlaceholder, setFamilyPlaceholder] =
    useState(" العائلات المكفولة");
  const [OrphansPlaceHolder, setOrphansPlaceHolder] =
    useState("الأيتام المكفولين");
  const [OrphansPannel, showOrphansPannel] = useState(false);
  const [selectedOrphans, setselectedOrphans] = useState([]);
  const [isFamiltPanelActive, setIsFamiltPanelActive] = useState(false);
  const [selectedFamilies, setselectedFamilies] = useState([]);
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [isUsersPannel, setisUsersPannel] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [job, setJob] = useState("القسم");
  const [user, setUser] = useState("الوسيط");
  const [DonatorType, setDonatorType] = useState("kafel");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [errors, SetErrors] = useState({
    name: false,
    phone: false,
    user: false,
  });
  const [userInfos, setuserInfos] = useState({
    id: uuid.v4(),
    name: "",
    phone: "",
    job: "",
    user: "",
    donationAmount: "",
  });
  const Famillies = useSelector((state) => state.Families);
  let kids = [];
  Famillies.forEach((f) => {
    f.kids.forEach((k) => {
      kids.push({ ...k, lastName: f.fatherLastName });
    });
  });
  const token = useSelector((state) => state.Auth).token;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (
          isPanelActive ||
          isUsersPannel ||
          isFamiltPanelActive ||
          OrphansPannel
        ) {
          setIsPanelActive(false);
          setisUsersPannel(false);
          setIsFamiltPanelActive(false);
          showOrphansPannel(false);
          return true;
        } else {
          return false;
        }
      }
    );
    return () => backHandler.remove();
  }, [isPanelActive, isUsersPannel, isFamiltPanelActive]);

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
  const openUsersPanel = () => {
    Keyboard.dismiss();
    setisUsersPannel(true);
    setshowButton(false);
  };
  let users = useSelector((state) => state.users);
  let allUSers = users.map((u) => ({ title: u[0] }));
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontFamily: "Tajawal-Medium",
    fontSize: 14,
  };
  let jobs = [
    { title: "قسم الأيتام" },
    { title: "قسم القفة" },
    { title: "قسم التعليم" },
    { title: "قسم الصحة" },
    { title: "قسم الأنشطة الخيرية" },
    { title: "قسم الأرامل" },
    { title: "قسم المالية" },
  ];
  const ChooseJob = (job) => {
    SetErrors({ ...errors, job: false });
    setuserInfos({ ...userInfos, job });
    setJob(job);
    setIsPanelActive(false);
    setshowButton(true);
  };
  const ChooseUser = (user) => {
    SetErrors({ ...errors, user: false });
    setuserInfos({ ...userInfos, user });
    setUser(user);
    setisUsersPannel(false);
    setshowButton(true);
  };
  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (userInfos.name.trim() == "") {
      (FieldErrors.name = true), (valid = false);
    }
    if (userInfos.phone.trim() == "") {
      (FieldErrors.phone = true), (valid = false);
    }
    if (userInfos.user.trim() == "") {
      (FieldErrors.user = true), (valid = false);
    }
    if (userInfos.user.trim() == "") {
      (FieldErrors.user = true), (valid = false);
    }
    SetErrors(FieldErrors);
    return valid;
  };
  const AddDonator = async () => {
    Keyboard.dismiss();
    if (validate()) {
      const res = await CreateDonator({
        ...userInfos,
        type: DonatorType,
        job: DonatorType == "kafel" ? "كافل" : userInfos.job,
        famillies: DonatorType == "kafel" ? selectedFamilies : [],
        orphans: DonatorType == "kafel" ? selectedOrphans : [],
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
  const openFamilyPannel = () => {
    Keyboard.dismiss();
    SetErrors({ ...errors, selections: false });

    setIsFamiltPanelActive(true);
    setshowButton(false);
  };
  const openOrpahnsPannel = () => {
    Keyboard.dismiss();
    SetErrors({ ...errors, orphans: false });
    showOrphansPannel(true);
    setshowButton(false);
  };
  const getSelectedData = (data, type) => {
    let overFlow = data.length > 2 ? `... و ${data.length - 2} اخرين` : "";

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
      setOrphansPlaceHolder("العائلات المكفولة");
    }
  };
  const getSelectedOrphans = (data, type) => {
    let overFlow = data.length > 2 ? `... و ${data.length - 2} اخرين` : "";

    if (data.length > 0) {
      setOrphansPlaceHolder(
        data
          .map((d) => d.name + " " + d.lastName)
          .slice(0, 2)
          .join(",") + overFlow
      );
      setselectedOrphans(data.map((o) => ({ name: o.title, id: o.id })));
    } else {
      setselectedOrphans([]);
      setOrphansPlaceHolder("الأيتام المكفولين");
    }
  };
  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}>اضافة محسن</Text>
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
          placeholder="الاسم و اللقب"
          {...styling}
          borderWidth={1}
          borderColor={errors.name ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "name")}
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
          {...styling}
          borderWidth={1}
          borderColor={errors.phone ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "phone")}
        />

        <Radio.Group
          value={DonatorType}
          style={{ flexDirection: "row" }}
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          onChange={(type) => {
            setDonatorType(type);
          }}
        >
          <Radio size="lg" colorScheme="rgb(52, 133, 120)" value="kafel" my={1}>
            كافل
          </Radio>
          <Radio
            size="lg"
            colorScheme="rgb(52, 133, 120)"
            style={{ marginLeft: 20 }}
            value="Mohsin"
            my={1}
          >
            محسن
          </Radio>
        </Radio.Group>
        {DonatorType == "Mohsin" && (
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
        )}

        {DonatorType == "kafel" && (
          <>
            <Input
              InputRightElement={
                <Icon
                  style={{ marginRight: 10 }}
                  as={<MaterialIcons name="attach-money" />}
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
              {...styling}
              borderWidth={1}
              borderColor={errors.donationAmount ? "#c21a0e" : "grey"}
              onChangeText={(text) => handleUserInput(text, "donationAmount")}
            />
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
            <TouchableWithoutFeedback onPress={() => openOrpahnsPannel()}>
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
                <Text style={styles.InputText}> {OrphansPlaceHolder}</Text>
              </View>
            </TouchableWithoutFeedback>
          </>
        )}
        <TouchableWithoutFeedback onPress={() => openUsersPanel()}>
          <View
            style={{
              ...styles.dateContainer,
              borderColor: errors.user ? "#c21a0e" : "grey",
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
        title="اختيار القسم"
        ChooseJob={ChooseJob}
        data={jobs}
        isPanelActive={isPanelActive}
        setIsPanelActive={setIsPanelActive}
        setshowButton={setshowButton}
      />
      <Swipable
        title="اختيار الوسيط"
        ChooseJob={ChooseUser}
        data={allUSers}
        isPanelActive={isUsersPannel}
        setIsPanelActive={setisUsersPannel}
        setshowButton={setshowButton}
      />
      <MultipleOptionSwipable
        type={"family"}
        title="العائلات المكفولة"
        getSelectedData={getSelectedData}
        data={Famillies.map((o) => ({ ...o, title: o.fatherLastName }))}
        isPanelActive={isFamiltPanelActive}
        setIsPanelActive={setIsFamiltPanelActive}
        setshowButton={setshowButton}
      />
      <MultipleOptionSwipable
        type={"family"}
        title="الأيتام المكفولين"
        getSelectedData={getSelectedOrphans}
        data={kids.map((o) => ({ ...o, title: o.name + " " + o.lastName }))}
        isPanelActive={OrphansPannel}
        setIsPanelActive={showOrphansPannel}
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
