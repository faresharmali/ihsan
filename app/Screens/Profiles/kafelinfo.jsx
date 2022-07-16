import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";

import { Icon } from "native-base";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function KafelInfo({ navigation, title, data }) {
  console.log("data", data);
  return (
    <View style={styles.InfosContainer}>
      <View style={styles.titleContainer}></View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>الاسم و اللقب: {data[0]} </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="user" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>المسؤولية : {data[2]} </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="user" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>رقم الهاتف : {data[1]}</Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="phone" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>الوسيط : {data[1]}</Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="phone" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>
          تاريخ التسجيل :{" "}
          {new Date(data.joined).getFullYear() +
            "/" +
            (new Date(data.joined).getMonth() + 1) +
            "/" +
            new Date(data.joined).getDate()}
        </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="calendar" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>
          تاريخ الدفع المقبل :{" "}
          {new Date(data.nextPayment).getFullYear() +
            "/" +
            (new Date(data.nextPayment).getMonth() + 1) +
            "/" +
            new Date(data.nextPayment).getDate()}
        </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="calendar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  InfosContainer: {
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 60,
    elevation: 1,
    borderRadius: 15,
    padding: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Info: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    margin: 10,
    fontSize: 20,
    fontFamily: "Tajawal-Medium",
  },
  InfoText: {
    margin: 10,
    fontSize: 16,
    fontFamily: "Tajawal-Medium",
  },
});
