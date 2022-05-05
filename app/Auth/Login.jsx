import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Keyboard } from "react-native";
import styles from "../Styles.js";
import Logo from "../../assets/Logo2.png";
import { Input, Stack, Icon } from "native-base";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { LogUser } from "../api/auth.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation, PageHandler, SetloggedInUser }) {
  const [userInput, setUserInput] = useState({ username: "", password: "" });
  const [errors, SetErrors] = useState({ username: false, password: false });
  const [ErrorMessage, setErrorMessage] = useState("");
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [BtnDisabled, disableBtn] = useState(false);
  const HandleUserInput = (Input, FieldName) => {
    setErrorMessageVisible(false);
    SetErrors({ ...errors, [FieldName]: false });
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
        disableBtn(false);
        if (response.ok) {
          await AsyncStorage.setItem(
            "LoggedUser",
            JSON.stringify(response.result.user)
          );
          SetloggedInUser(response.result.user);
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

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.logoContainer}>
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
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              style={styles.input}
              h={50}
              borderWidth={1}
              borderColor={errors.username ? "#c21a0e" : "grey"}
              textAlign="right"
              placeholder="اسم المستخدم"
              onChangeText={(text) => HandleUserInput(text, "username")}
            />
            <Input
              InputRightElement={
                <Icon
                  style={{ marginRight: 10 }}
                  as={<MaterialIcons name="lock" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              h={50}
              style={{ borderWidth: 5, borderColor: "#666" }}
              borderWidth={1}
              borderColor={errors.password ? "#c21a0e" : "grey"}
              textAlign="right"
              type={"password"}
              placeholder="كلمة المرور"
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
            <Text style={{ fontSize: 16, marginLeft: 10 }}>تسجيل الدخول</Text>
          </Button>
          <Text style={styles.ForgotPassword}>نسيت كلمة المرور ؟</Text>
        </View>
      </View>
    </View>
  );
}
