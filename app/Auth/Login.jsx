import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Keyboard } from "react-native";
import styles from "../Styles.js";
import Logo from "../../assets/Logo2.png";
import { Input, Stack, Icon } from "native-base";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { LogUser } from "../api/auth.js";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation, PageHandler, SetloggedInUser }) {
  const dispatch=useDispatch()
  const SetLoggedUser=(data)=>{
    return {
      type:"setLoggedUser",
      data:data
    }
  }
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
        console.log(response)
        disableBtn(false);
        if (response.ok) {
          await AsyncStorage.setItem(
            "LoggedUser",
            JSON.stringify(response.result.user)
          );
          SetloggedInUser(response.result.user);
          dispatch(SetLoggedUser(response.result.user))
          PageHandler(2);
        } else {
          SetErrors({ username: true, password: true });
          setErrorMessage("???????????? ??????????");
          setErrorMessageVisible(true);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setErrorMessage("???? ?????????????? ??????????????");
      setErrorMessageVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.logoContainer}>
        <Image style={styles.Logo} source={Logo} />

        <Text style={styles.LoginTitle}>?????????? ?????????? ???????????? ?????????????? </Text>
        <View style={styles.FormContainer}>
          <Text style={styles.LoginSecondTitle}> ?????????? ????</Text>
          <Text style={styles.secondTitle}>???????? ?????????? ?????????????? ??????????</Text>

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
              placeholder="?????? ????????????????"
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
              placeholder="???????? ????????????"
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
            <Text style={{ fontSize: 16, marginLeft: 10 }}>?????????? ????????????</Text>
          </Button>
          <Text style={styles.ForgotPassword}>???????? ???????? ???????????? ??</Text>
        </View>
      </View>
    </View>
  );
}
