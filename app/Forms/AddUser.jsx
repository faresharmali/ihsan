import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { Input, Stack, Icon } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import Gamer from "../../assets/avatars/gamer.png";
import Swipable from "../Components/Containers/swipable";
export default function AddUser({ route, navigation }) {
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [userInfos, setuserInfos] = useState({
    name: "",
    phone: "",
    adresse: "",
    username: "",
    password: "",
    confirmepassword: "",
    job: "",
  });
  const [job, setJob] = useState("اختيار المهمة");
  console.error(userInfos);
  const handleUserInput = (text, name) => {
    setuserInfos({ ...userInfos, [name]: text });
  };
  const openPanel = () => {
    setIsPanelActive(true);
    setshowButton(false);
  };

  const dispatch = useDispatch();
  const action = () => {
    return {
      type: "AddUser",
      data: {
        0: userInfos.name,
        1: job,
        icon1: "phone",
        pic: Gamer,
      },
    };
  };
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontFamily: "Tajawal-Medium",
    fontSize: 14,
  };
  let jobs = [
    { title: " قسم المالية" },
    { title: " قسم الققة" },
    { title: " قسم الكفالة" },
    { title: " قسم التعليم" },
    { title: " قسم الصحة" },
    { title: " قسم الصحة" },
    { title: " قسم الادارة" },
    { title: " قسم الأنشطة الخيرية" },
    { title: " قسم الأرامل" },
  ];
  const ChooseJob = (job) => {
    setuserInfos({ ...userInfos, job });

    setJob(job);
    setIsPanelActive(false);
    setshowButton(true);
  };
  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}>اضافة مستخدم</Text>
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
          placeholder="الاسم و اللقب"
          {...styling}
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
          onChangeText={(text) => handleUserInput(text, "phone")}
          {...styling}
        />
        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<FontAwesome name="map-marker" />}
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
          placeholder="العنوان"
          {...styling}
          onChangeText={(text) => handleUserInput(text, "adresse")}
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
          placeholder="اسم المستخدم"
          onChangeText={(text) => handleUserInput(text, "username")}
          {...styling}
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
          placeholder="كلمة المرور"
          onChangeText={(text) => handleUserInput(text, "password")}
          {...styling}
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
          placeholder="تأكيد كلمة المرور"
          onChangeText={(text) => handleUserInput(text, "confirmepassword")}
          {...styling}
        />

        <TouchableWithoutFeedback onPress={() => openPanel()}>
          <View style={styles.dateContainer}>
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="#348578"
            />
            <Text style={styles.InputText}>{job} </Text>
          </View>
        </TouchableWithoutFeedback>
      </Stack>
      {showButton && (
        <Button
          style={styles.Button}
          mode="contained"
          onPress={() => {
            dispatch(action());
            navigation.navigate("Users");
            setTimeout(() => {
              route.params.showToast();
            });
          }}
        >
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
});
