import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { Input, Stack, Icon } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
export default function AddFamily({ route, navigation }) {
  const [FamilyData, setFamilyData] = useState({
    Mother: "",
    Father: "",
    Adresse: "",
    Phone: "",
    Income: "",
    Infos: "",
    Children: [],
  });
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
  };
  const myAction = () => {
    return {
      type: "AddFamily",
      data: {
        ...FamilyData,
      },
    };
  };
  let dispatch = useDispatch();
  const inputHandler = (e, name) => {
    setFamilyData({ ...FamilyData, [name]: e });
  };
  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}>اضافة عائلة</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Users")}>
          <Icon
            style={styles.back}
            as={FontAwesome}
            name="arrow-left"
            size={8}
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
          placeholder="اسم و لقب الأب"
          {...styling}
          onChangeText={(text) => inputHandler(text, "Mother")}
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
          placeholder="اسم و لقب الأم"
          {...styling}
          onChangeText={(text) => inputHandler(text, "Father")}
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
          placeholder="رقم الهاتف"
          {...styling}
          onChangeText={(text) => inputHandler(text, "Phone")}
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
          placeholder="العنوان"
          {...styling}
          onChangeText={(text) => inputHandler(text, "Adresse")}
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
          placeholder="المدخول"
          {...styling}
          onChangeText={(text) => inputHandler(text, "Income")}
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
          placeholder="معلومات عامة"
          {...styling}
          onChangeText={(text) => inputHandler(text, "Infos")}
        />
      </Stack>
      <Button
        style={styles.Button}
        mode="contained"
        onPress={() => {
          dispatch(myAction());
          navigation.goBack();
          setTimeout(() => {
            route.params.showToast();
          }, 600);
        }}
      >
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
