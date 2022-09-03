import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "native-base";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import Family from "../../../assets/avatars/family.png";

import Kids from "../AdministrationSection/Famillies/Kids";
import Toast from "react-native-toast-message";
import toastConfig from "../../Components/ToastConfiguration";
import { useSelector } from "react-redux";
export default function Kafala({ route, navigation, updatePath }) {


    let Donation = useSelector((state) => state.Donations).filter(
    (i) => i.identifier == route.params.id
  )[0];
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.pageEntity}>
        <View style={styles.IconsContainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>

          <Icon as={Ionicons} size={8} color="#fff" name="md-chevron-back" />
        </TouchableOpacity>
        
        </View>
        <Text style={styles.EntityTitle}>كفالة</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.Content}
      >
        <View style={styles.ActivityDetails}>
          <Text style={styles.Text}>
            <Text style={styles.textTitle}> الكافل :</Text> {JSON.parse(Donation.donatorInfos).name}
          </Text>
          <Text style={styles.Text}>
            {" "}
            <Text style={styles.textTitle}> مبلغ الكفالة :</Text> {Donation.amount}
          </Text>

        
         
          <Text style={styles.Text}>
            {" "}
            <Text style={styles.textTitle}>التاريخ :</Text>{" "}
            {Donation.date
              ? new Date(Donation.date).getFullYear() +
                "/" +
                (new Date(Donation.date).getMonth() + 1) +
                "/" +
                new Date(Donation.date).getDate()
              : ""}
          </Text>
        </View>
     
      </ScrollView>

      <Toast config={toastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 10,
  },
  infos: {
    marginRight: 5,
    width: "75%",
  },
  UserPersonal: {
    fontFamily: "Tajawal-Medium",
    fontSize: 15,
    color: "#000",
    marginBottom: 5,
  },
  DataContainer: {
    width: "100%",
    minHeight: 70,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 7,
    shadowColor: "#000",
    elevation: 1.5,
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingLeft: 10,
  },
  pageEntity: {
    width: "100%",
    maxHeight: "25%",
    backgroundColor: "#348578",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
    paddingBottom: 25,
  },

  EntityTitle: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Tajawal-Medium",
  },
  IconsContainer: {
    top: 20,
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  Content: {
    marginTop: 10,
    width: "100%",
    paddingTop: 10,
  },
  ActivityDetails: {
    width: "95%",
    backgroundColor: "#fff",
    elevation: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  People: {
    width: "95%",
    borderRadius: 10,
    padding: 10,
  },
  Text: {
    fontSize: 17,
    fontFamily: "Tajawal-Medium",
  },
  title: {
    fontSize: 20,
    fontFamily: "Tajawal-Medium",
    margin: 15,
    width: "100%",
    textAlign: "center",
  },
  textTitle: {
    color: "#348578",
  },
});
