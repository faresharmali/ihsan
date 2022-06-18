import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { Input, Stack, Icon } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { CreateReservation } from "../api/user";
import { useSelector } from "react-redux";

import uuid from "react-native-uuid";
export default function AddReservation({ route, navigation }) {
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [date, setdate] = useState("");
  const [Reason, setReason] = useState("");
  const [showTimePicker, setshowTimePicker] = useState(false);
  const [showTimePicker2, setshowTimePicker2] = useState(false);
  const [showDatePicker, setshowDatePicker] = useState(false);
  const [time, setTime] = useState(null);
  const [DateObject, setDateObject] = useState(null);

  const HandleStartTime = (date) => {
    if (date.nativeEvent.timestamp) {
      const hours = new Date(date.nativeEvent.timestamp).getHours();
      const minutes = new Date(date.nativeEvent.timestamp).getMinutes();
      let startTime = hours + ":" + minutes;
      setstartTime(startTime);
      setTime({ ...time, start: { hours, minutes } });
    }

    setshowTimePicker(false);
  };
  const HandleEndTime = (date) => {
    if (date.nativeEvent.timestamp) {
      let MyDate = date.nativeEvent.timestamp;
      const hours = new Date(MyDate).getHours();
      const minutes = new Date(MyDate).getMinutes();
      let startTime = hours + ":" + minutes;
      setendTime(startTime);
      setTime({ ...time, end: { hours, minutes } });
    }
    setshowTimePicker2(false);
  };
  const HandleDate = (date) => {
    if (date.nativeEvent.timestamp) {
      let MyDate = new Date(date.nativeEvent.timestamp);
      setDateObject(MyDate);
      let month =
        (MyDate.getMonth() + 1 + "").length > 1
          ? MyDate.getMonth() + 1 + ""
          : "0" + (MyDate.getMonth() + 1);
      let day =
        (MyDate.getDate() + "").length > 1
          ? MyDate.getDate() + ""
          : "0" + MyDate.getDate();

      setdate(MyDate.getFullYear() + "-" + month + "-" + day);
    } else {
    }
    setshowDatePicker(false);
  };
  const inputHandler = (e) => {
    setReason(e);
  };

  const add = async () => {
  
    try {
      const response = await CreateReservation({
        id: uuid.v4(),
        description: Reason,
        date: DateObject,
        time: JSON.stringify(time),
        DateString: date,
      });
      if (response.ok) {
        navigation.goBack();
      } else {
        alert("error");
      }
    } catch (e) {}
  };
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontFamily: "Tajawal-Medium",
    fontSize: 14,
  };

  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}>حجز المقر</Text>
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
        <View style={styles.inputTitle}>
          <Icon
            style={{ marginRight: 10 }}
            as={<MaterialIcons name="lock" />}
            size={5}
            ml="2"
            color="#348578"
          />
          <Text style={styles.Title}>السبب</Text>
        </View>
        <Input
          w={{
            base: "95%",
            md: "25%",
          }}
          h={40.1}
          textAlign="right"
          {...styling}
          onChangeText={(text) => inputHandler(text, "Income")}
        />
        <View style={styles.inputTitle}>
          <Icon
            style={{ marginRight: 10 }}
            as={<FontAwesome name="calendar" />}
            size={5}
            ml="2"
            color="#348578"
          />
          <Text style={styles.Title}>التاريخ</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => setshowDatePicker(true)}>
          <View style={styles.dateContainer}>
            <Text style={styles.InputText}> {date}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.inputTitle}>
          <Icon
            style={{ marginRight: 10 }}
            as={<FontAwesome name="clock-o" />}
            size={5}
            ml="2"
            color="#348578"
          />
          <Text style={styles.Title}>من الساعة</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => setshowTimePicker(true)}>
          <View style={styles.dateContainer}>
            <Text style={styles.InputText}> {startTime} </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.inputTitle}>
          <Icon
            style={{ marginRight: 10 }}
            as={<FontAwesome name="clock-o" />}
            size={5}
            ml="2"
            color="#348578"
          />
          <Text style={styles.Title}>الى الساعة</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => setshowTimePicker2(true)}>
          <View style={styles.dateContainer}>
            <Text style={styles.InputText}>{endTime} </Text>
          </View>
        </TouchableWithoutFeedback>
        {showTimePicker && (
          <RNDateTimePicker
            locale="ar-dz"
            mode="time"
            value={new Date()}
            onChange={HandleStartTime}
          />
        )}
        {showTimePicker2 && (
          <RNDateTimePicker
            locale="ar-dz"
            mode="time"
            value={new Date()}
            onChange={HandleEndTime}
          />
        )}
        {showDatePicker && (
          <RNDateTimePicker
            is24Hour={true}
            locale="ar-dz"
            mode="date"
            value={new Date()}
            onChange={HandleDate}
          />
        )}
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
  dateContainer: {
    width: "95%",
    height: 40,
    borderColor: "#000",
    borderWidth: 0.5,
    borderRadius: 5,
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
  },
  inputTitle: {
    width: "100%",
    borderRadius: 5,
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
  },
  Title: {
    fontFamily: "Tajawal-Medium",
    fontSize: 17,
  },
  InputText: {
    fontFamily: "Tajawal-Medium",
    fontSize: 17,
    color: "#348578",
  },
});
