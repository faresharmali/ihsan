import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Keyboard } from "react-native";
import styles from "../Styles.js";
import Logo from "../../assets/Logo3.png";
import { Input, Stack, Icon } from "native-base";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { LogUser } from "../api/auth.js";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation, PageHandler, SetloggedInUser }) {
  const dispatch = useDispatch();
  const SetLoggedUser = (data) => {
    return {
      type: "setLoggedUser",
      data: data,
    };
  };
  const [userInput, setUserInput] = useState({ username: "", password: "" });
  const [errors, SetErrors] = useState({ username: false, username: false });
  const [ErrorMessage, setErrorMessage] = useState("");
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [BtnDisabled, disableBtn] = useState(false);
  const HandleUserInput = (Input, FieldName) => {
    setErrorMessageVisible(false);
    SetErrors({ username: false, username: false });
    setUserInput({ ...userInput, [FieldName]: Input });
  };

  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (userInput.password.trim() == "") {
      (FieldErrors.password = true), (valid = false);
    }
    if (userInput.username.trim() == "") {
      (FieldErrors.username = true), (valid = false);
    }
    SetErrors(FieldErrors);
    return valid;
  };

  const Signin = async () => {
    Keyboard.dismiss();
    if (validate()) {
      try {
        disableBtn(true);
        const response = await LogUser(userInput);
        console.log(response);
        disableBtn(false);
        if (response.ok) {
          await AsyncStorage.setItem(
            "LoggedUser",
            JSON.stringify(response.result.user)
          );
          SetloggedInUser(response.result.user);
          dispatch(SetLoggedUser(response.result.user));
          PageHandler(2);
        } else {
          SetErrors({ username: true, password: true });
          setErrorMessage("بيانات خاطئة");
          setErrorMessageVisible(true);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setErrorMessage("كل الخانات اجبارية");
      setErrorMessageVisible(true);
    }
  };
  const styling = {
    fontSize: 15,
    FontAwesome: "600",
    fontFamily: "Tajawal-Medium",
  };
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.logoContainer}>
        <View style={styles.illustationContainer}></View>
        <Image style={styles.Logo} source={Logo} />

        <Text style={styles.LoginTitle}>جمعية إحسان لكفالة الأيتام </Text>
        <View style={styles.FormContainer}>
          <Text style={styles.LoginSecondTitle}> مرحبا بك</Text>
          <Text style={styles.secondTitle}>يرجى ادخال معلومات حسابك</Text>

          <Stack space={4} w="100%" alignItems="center">
            <Input
              InputRightElement={
                <Icon
                  style={{ marginRight: 10 }}
                  as={<MaterialIcons name="account-circle" />}
                  size={6}
                  ml="2"
                  color="#348578"
                />
              }
              h={50}
              borderWidth={1}
              borderColor={errors.username ? "#c21a0e" : "grey"}
              textAlign="right"
              placeholder="اسم المستخدم"
              {...styling}
              onChangeText={(text) => HandleUserInput(text, "username")}
            />
            <Input
              InputRightElement={
                <Icon
                  style={{ marginRight: 10 }}
                  as={<MaterialIcons name="lock" />}
                  size={6}
                  ml="2"
                  color="#348578"
                />
              }
              h={50}
              borderWidth={1}
              borderColor={errors.password ? "#c21a0e" : "grey"}
              textAlign="right"
              type={"password"}
              placeholder="كلمة المرور"
              {...styling}
              onChangeText={(text) => HandleUserInput(text, "password")}
            />
          </Stack>
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

          <Button
            disabled={BtnDisabled}
            style={styles.Button}
            mode="contained"
            onPress={() => Signin()}
          >
            
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                fontFamily: "Tajawal-Medium",
              }}
              >
              تسجيل الدخول
            </Text>
            
          </Button>
        </View>
      </View>
    </View>
  );
}
