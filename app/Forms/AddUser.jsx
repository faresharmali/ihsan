import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Man from "../../assets/avatars/man.png";
import { Input, Stack, Icon } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Button } from "react-native-paper";

export default function AddUser({ navigation }) {
  let [fontsLoaded] = useFonts({
    "Tajawal-Medium": require("../../assets/fonts/Tajawal-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  }
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
  };
  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}>اضافة عضو</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Users')}>
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
          {...styling}
        />
      </Stack>
      <Button style={styles.Button} mode="contained" onPress={() => Login()}>
        <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة</Text>
      </Button>
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
});
