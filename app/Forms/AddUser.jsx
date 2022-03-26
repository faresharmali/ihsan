import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { Input, Stack, Icon } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import Gamer from "../../assets/avatars/gamer.png";
export default function AddUser({ route,navigation }) {

  const dispatch =useDispatch()
  const action =()=>{
    return {
      type:"AddUser",
      data:{
        0: "غوجو ساترو",
        1: "مستعمل جوجوتسو",
        icon1: "phone",
        pic: Gamer,
      }
    }
  }
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
  };
  const customPickerStyles = {
    inputIOS: {
      fontSize: 14,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.3)",
      borderRadius: 5,
      color: "#000",
      width: 370,
      paddingRight:45,
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.3)",
      borderRadius: 5,
      color: "#000",
      width: 370,
      paddingRight:45,
    },
    icon: {
      color: "#000",
    },
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
          textAlign="right"
          placeholder="الاسم و اللقب"
          {...styling}
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
          placeholder="تأكيد كلمة المرور"
          {...styling}
        />

        <RNPickerSelect
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: "الصلاحيات",
            color: "#000",
          
          }}
          style={customPickerStyles}
          Icon={() => (
            <Icon
              style={{ margin: 10 }}
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
            
              color="#348578"
            />
          )}
          onValueChange={() => {}}
          items={[
            { label: "مدير", value: "football" },
            { label: "موزع القفة", value: "f" },
            { label: "رئيس قسم", value: "footbsall" },
            { label: "كافل", value: "footbaall" },
          ]}
        />
      </Stack>
      <Button style={styles.Button} mode="contained" onPress={() => {dispatch(action());navigation.goBack();setTimeout(() => {
        route.params.showToast()
      }, (600));}}>
        <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة مستخدم </Text>
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
