import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { Icon } from "native-base";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function FamilyInfo({ navigation, title, data }) {
  let date = new Date(data.signupDate);
  return (
    <View style={styles.InfosContainer}>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>
          اسم و لقب الأم : {data.motherFullName}{" "}
        </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="user" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>
          اسم و لقب الأب : {data.fatherFirstName} {data.fatherLastName}{" "}
        </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="user" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>العنوان : {data.adresse}</Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="map-marker" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>رقم الهاتف : {data.phone}</Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="phone" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}> المدخول : {data.salary} </Text>
        <Icon as={FontAwesome5} size={6} color="#348578" name="wallet" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}> مبلغ الكفالة : {data.donation} </Text>
        <Icon as={FontAwesome5} size={6} color="#348578" name="wallet" />
      </View>
    
      <View style={styles.Info}>
        <Text style={styles.InfoText}>الوسيط الاجتماعي : {data.wasseet} </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="users" />
      </View>
      
      <View style={styles.Info}>
        <Text style={styles.InfoText}>
          تاريخ التسجيل :{" "}
          {date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate()}
        </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="calendar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  InfosContainer: {
    width: "90%",
    height: 540,
    backgroundColor: "#fff",
    marginTop: 60,
    elevation: 1,
    borderRadius: 15,
    padding: 20,
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
