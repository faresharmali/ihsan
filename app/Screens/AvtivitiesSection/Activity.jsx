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
import FamilyInfosContainer from "../../Components/Containers/FamilyInfosContainer";
export default function Activity({ route, navigation }) {
  const [section, setSection] = useState("infos");

  const benifits = [
    {
      0: "استفادة العائلة 1",
      1: "معلومات الاستفادة",
      2: "معلومات الاستفادة",
    },
    {
      0: "استفادة العائلة 1",
      1: "معلومات الاستفادة",
      2: "معلومات الاستفادة",
    },
    {
      0: "استفادة العائلة 1",
      1: "معلومات الاستفادة",
      2: "معلومات الاستفادة",
    },
    {
      0: "استفادة العائلة 1",
      1: "معلومات الاستفادة",
      2: "معلومات الاستفادة",
    },
  ];

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "نجحت العملية",
      text2: " تمت اضافة الأبن بنجاح  👋",
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.pageEntity}>
        <View style={styles.IconsContainer}>
          <Icon as={Ionicons} size={8} color="#fff" name="md-chevron-back" />
          <Icon
            as={MaterialCommunityIcons}
            size={8}
            color="#fff"
            name="square-edit-outline"
          />
        </View>
        <Text style={styles.EntityTitle}>{route.params[0]}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.Content}
      >
        <View style={styles.ActivityDetails}>
          <Text style={styles.Text}>النشاط : {route.params[0]}</Text>
          <Text style={styles.Text}>نوع النشاط : {route.params[1]}</Text>
          <Text style={styles.Text}>اضيف من قبل : {route.params.author}</Text>
          <Text style={styles.Text}>التاريح : 25/09/2022</Text>
        </View>
        <View style={styles.People}>
          <Text style={styles.title}>المستفيدين من النشاط</Text>
          {route.params.benificier == "orphan" && (
            <Kids kids={route.params.kids} />
          )}
          {route.params.benificier == "family" &&
            route.params.famillies.map((f) => (
              <TouchableOpacity style={styles.DataContainer}>
                <Image source={Family} style={{ width: 40, height: 40 }} />
                <View style={styles.infos}>
                  <Text style={styles.UserPersonal}>{`عائلة ${f.name}`}</Text>
                </View>
              </TouchableOpacity>
            ))}
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
});
