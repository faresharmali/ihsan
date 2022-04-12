import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { Input, Stack, Icon } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import store from "../store";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function AddReservation({ route, navigation }) {
  const myAction = () => {
    return {
      type: "AddChild",
      id: route.params.id,
    };
  };
  let dispatch = useDispatch();
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
  };
  const add = () => {
    dispatch(myAction());
    navigation.goBack();
    setTimeout(() => {
      route.params.showToast();
    }, 600);
  };
  const [date, setDate] = useState("2022-04-15");
  const [showTimePicker, setshowTimePicker] = useState(false);
  const [showDatePicker, setshowDatePicker] = useState(false);

  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}>اضافة ريزيرفاسيون</Text>
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
          <Button onPress={()=>setshowTimePicker(true)}>time</Button>
          <Button onPress={()=>setshowDatePicker(true)}>date</Button>

        {showTimePicker && <RNDateTimePicker locale="ar-dz" mode="time" value={new Date()} onChange={()=>setshowTimePicker(false)} />}
        {showDatePicker && <RNDateTimePicker is24Hour={true} locale="ar-dz" mode="date" value={new Date()} onChange={()=>setshowDatePicker(false)} />}
        
      </Stack>
      <Button style={styles.Button} mode="contained" onPress={() => add()}>
        <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة </Text>
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
