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
  import Swipable from "../../Components/Containers/swipable";
  import { useSelector } from "react-redux";
  import { CreateTransaction } from "../../api/Finance";
  import uuid from "react-native-uuid";
  export default function AddOutcomeView({ route, navigation }) {
    const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
    const [isTypePannel, setIsTypePannel] = useState(false);
    const [sectionPannel, setsectionPannel] = useState(false);
    const [ReceiverPannel, setReceiverPannel] = useState(false);
    const [showButton, setshowButton] = useState(true);
    const [type, setType] = useState(" النوع");
    const [Donator, setDonator] = useState("الدافع");
    const [section, setSection] = useState("القسم");
    const [ErrorMessage, setErrorMessage] = useState("");
    const [errors, SetErrors] = useState({
      section: false,
      amount: false,
      type: false,
      receiver: false,
      reason: false,
    });
    const [TransactionInfos, SetTransactionInfos] = useState({
      identifier: uuid.v4(),
      date: new Date(),
      type: "",
      amount: "",
      receiver: "",
      income: false,
      reason: "",
    });
    let users = useSelector((state) => state.users);
  
    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (  isTypePannel || ReceiverPannel || sectionPannel) {
            setIsTypePannel(false);
            setReceiverPannel(false);
            setsectionPannel(false);
            return true;
          } else {
            return false;
          }
        }
      );
      return () => backHandler.remove();
    }, [ReceiverPannel, isTypePannel]);
  
    const handleUserInput = (text, name) => {
      setErrorMessageVisible(false);
      SetErrors({ ...errors, [name]: false });
      SetTransactionInfos({ ...TransactionInfos, [name]: text });
    };
  
    const openPanel = (name) => {
      Keyboard.dismiss();
      setshowButton(false);
      SetErrors({ ...errors, [name]: false });
      switch (name) {
        case "type":
          setIsTypePannel(true);
          break;
        case "user":
          setReceiverPannel(true);
          break;
        case "section":
          setsectionPannel(true);
          break;
      }
    };
  
    const styling = {
      borderColor: "#000",
      borderWidth: 0.5,
      fontFamily: "Tajawal-Medium",
      fontSize: 14,
    };
  
    const ChooseType = (type) => {
      SetErrors({ ...errors, type: false });
      SetTransactionInfos({ ...TransactionInfos, type: type });
      setType(type);
      setIsTypePannel(false);
      setshowButton(true);
    };
    const ChooseDonator = (donator) => {
      setReceiverPannel(false);
      SetErrors({ ...errors, receiver: false });
      SetTransactionInfos({ ...TransactionInfos, receiver: donator });
      setDonator(donator);
      setshowButton(true);
    };
    const ChooseSection = (section) => {
      setsectionPannel(false);
      setSection(section);
      SetErrors({ ...errors, section: false });
      SetTransactionInfos({ ...TransactionInfos, section: section });
      setshowButton(true);
    };
  
    const validate = () => {
      let valid = true;
      let FieldErrors = { ...errors };
      if (TransactionInfos.amount.trim() == "") {
        (FieldErrors.amount = true), (valid = false);
      }
      if (TransactionInfos.receiver.trim() == "") {
        (FieldErrors.receiver = true), (valid = false);
      }
      if (TransactionInfos.type.trim() == "") {
        (FieldErrors.type = true), (valid = false);
      }
      if (TransactionInfos.reason.trim() == "") {
        (FieldErrors.reason = true), (valid = false);
      }
      if (
        TransactionInfos.type == "تحويل" &&
        TransactionInfos.section.trim() == ""
      ) {
        (FieldErrors.section = true), (valid = false);
      }
      SetErrors(FieldErrors);
      return valid;
    };
  
    const AddTransaction = async () => {
      Keyboard.dismiss();
      if (validate()) {
        const res = await CreateTransaction({
          ...TransactionInfos,
          section:route.params.section

        });
        if (res.ok) {
          navigation.goBack();
        } else {
        }
      } else {
        setErrorMessage("كل الخانات اجبارية");
        setErrorMessageVisible(true);
      }
    };
    const activityTypes = ["تبرع", "زكاة", "كفالة", "تحويل", "حصالة"];
    let sections = [
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
    return (
      <View style={styles.Container}>
        <View style={styles.TitleContainer}>
          <View style={{ flexDirection: "row-reverse" }}>
            <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />
  
            <Text style={styles.PageTitile}>اضافة مصاريف</Text>
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
            placeholder="المبلغ "
            {...styling}
            borderWidth={1}
            borderColor={errors.amount ? "#c21a0e" : "grey"}
            onChangeText={(text) => handleUserInput(text, "amount")}
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
            placeholder="السبب "
            {...styling}
            borderWidth={1}
            borderColor={errors.reason ? "#c21a0e" : "grey"}
            onChangeText={(text) => handleUserInput(text, "reason")}
          />
          <TouchableWithoutFeedback onPress={() => openPanel("user")}>
            <View
              style={{
                ...styles.dateContainer,
                borderColor: errors.section ? "#c21a0e" : "grey",
              }}
            >
              <Icon
                as={<MaterialIcons name="lock" />}
                size={5}
                ml="2"
                color="#348578"
              />
              <Text style={styles.InputText}> {Donator}</Text>
            </View>
          </TouchableWithoutFeedback>
  
          <TouchableWithoutFeedback onPress={() => openPanel("type")}>
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
          {TransactionInfos.type == "تحويل" && (
            <TouchableWithoutFeedback onPress={() => openPanel("section")}>
              <View
                style={{
                  ...styles.dateContainer,
                  borderColor: errors.section ? "#c21a0e" : "grey",
                }}
              >
                <Icon
                  as={<MaterialIcons name="lock" />}
                  size={5}
                  ml="2"
                  color="#348578"
                />
                <Text style={styles.InputText}> {section}</Text>
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
          <Button style={styles.Button} mode="contained" onPress={AddTransaction}>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة</Text>
          </Button>
        )}
  
        <Swipable
          title="اختيار المستلم"
          ChooseJob={ChooseDonator}
          data={users.map((t) => ({ title: t.name }))}
          isPanelActive={ReceiverPannel}
          setIsPanelActive={setReceiverPannel}
          setshowButton={setshowButton}
        />
        <Swipable
          title="اختيار نوع المدخول"
          ChooseJob={ChooseType}
          data={activityTypes.map((t) => ({ title: t }))}
          isPanelActive={isTypePannel}
          setIsPanelActive={setIsTypePannel}
          setshowButton={setshowButton}
        />
        <Swipable
          title="اختيار القسم"
          ChooseJob={ChooseSection}
          data={sections}
          isPanelActive={sectionPannel}
          setIsPanelActive={setsectionPannel}
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
    radioContainer: {
      padding: 0,
      width: "90%",
      alignItems: "center",
    },
  });
  