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
import { Ionicons,FontAwesome,FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";


export default function FamilyInfo({ navigation,title,data }) {
console.log(data)
  return (

      <View style={styles.InfosContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{`عائلة ${data.Mother} ارملة ${data.FatherFirstName} ${data.FatherLastName}`} </Text>
          <Icon
            as={Ionicons}
            size={8}
            color="#348578"
            name="information-circle"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>اسم و لقب الأم: {data.Mother}  </Text>
          <Icon
            as={FontAwesome}
            size={6}
            color="#348578"
            name="user"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>اسم و لقب الأب : {data.FatherFirstName} {data.FatherLastName} </Text>
          <Icon
            as={FontAwesome}
            size={6}
            color="#348578"
            name="user"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>العنوان :{data.Adresse}</Text>
          <Icon
            as={FontAwesome}
            size={6}
            color="#348578"
            name="map-marker"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>رقم الهاتف : {data.Phone}</Text>
          <Icon
            as={FontAwesome}
            size={6}
            color="#348578"
            name="phone"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}> المدخول : {data.Income} </Text>
          <Icon
            as={FontAwesome5}
            size={6}
            color="#348578"
            name="wallet"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}> مبلغ الكفالة : {data.Donation} </Text>
          <Icon
            as={FontAwesome5}
            size={6}
            color="#348578"
            name="wallet"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>موزع القفة : فلان بن فلان</Text>
          <Icon
            as={FontAwesome5}
            size={6}
            color="#348578"
            name="shopping-bag"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>الوسيط الاجتماعي : فلان بن فلان</Text>
          <Icon
            as={FontAwesome}
            size={6}
            color="#348578"
            name="users"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>عدد الأفراد : 5</Text>
          <Icon
            as={FontAwesome}
            size={6}
            color="#348578"
            name="users"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>تاريخ التسجيل : 25/08/2021</Text>
          <Icon
            as={FontAwesome}
            size={6}
            color="#348578"
            name="calendar"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>معلومات اخرى : لا يوجد</Text>
          <Icon
            as={Ionicons}
            size={6}
            color="#348578"
            name="information-circle"
          />
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
    padding:10
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
