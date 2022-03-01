import React from "react";

import { Text, View, Image } from "react-native";
import styles from "../Styles.js";
import Logo from "../../assets/Logo2.png";
import { Input, Stack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useFonts } from "expo-font";

export default function Login({ navigation, pageHandler }) {
  const Login = () => {
    alert("wassup");
  };

  let [fontsLoaded] = useFonts({
    "Amiri-Bold": require("../../assets/fonts/Amiri-Bold.ttf"),
    "Tajawal-Medium": require("../../assets/fonts/Tajawal-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.Logo} source={Logo} />

        <Text style={styles.LoginTitle }>
          جمعية إحسان لكفالة الأيتام{" "}
        </Text>
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
              w={{
                base: "100%",
                md: "25%",
              }}
              h={50}
              textAlign="right"
              placeholder="اسم المستخدم"
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
              w={{
                base: "100%",
                md: "25%",
              }}
              h={50}
              textAlign="right"
              placeholder="كلمة المرور"
            />
          </Stack>
          <Button
            style={styles.Button}
            mode="contained"
            onPress={() => Login()}
          >
            <Text style={{ fontSize: 16, marginLeft: 10 }}>تسجيل الدخول</Text>
          </Button>
          <Text style={styles.ForgotPassword}>
            نسيت كلمة المرور ؟ اتصل بنا{" "}
          </Text>
        </View>
      </View>
    </View>
  );
}
