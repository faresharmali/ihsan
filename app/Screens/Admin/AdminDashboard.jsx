import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "native-base";
import { MaterialCommunityIcons, Entypo ,FontAwesome,MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import NumberStat from "../../Components/statistics components/NumberStat";
export default function AdminDashboard({ navigation }) {
  var date = new Date();
  var months = [
    "يناير",
    "فبراير",
    "مارس",
    "إبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  var days = [
    "اﻷحد",
    "اﻷثنين",
    "الثلاثاء",
    "اﻷربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  var DateString =
    days[date.getDay()] +
    " , " +
    date.getDate() +
    " " +
    months[date.getMonth()] +
    " , " +
    date.getFullYear();

  let [fontsLoaded] = useFonts({
    "Amiri-Bold": require("../../../assets/fonts/Amiri-Bold.ttf"),
    "Tajawal-Medium": require("../../../assets/fonts/Tajawal-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.ScreenEntity}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()} style={styles.menuContainer}>
          <Icon as={Entypo} name="menu" size={8} color="#fff" />
        </TouchableOpacity>
        <View style={styles.containerTitle}>
          <Text style={styles.ScreenEntityTitle}>{DateString} </Text>
        </View>
        <MaterialCommunityIcons name="home" size={30} color="#348578" />
      </View>
      <View style={styles.StatContainer}>
      <NumberStat backgroundColor={"red"}  number={79} Title={"العائلات"} IconType={FontAwesome} IconName={"group"}/>
      <NumberStat backgroundColor={"red"}  number={160} Title={"الأطفال"}  IconType={FontAwesome} IconName={"child"}/>
      <NumberStat backgroundColor={"red"}  number={75} Title={"الأعضاء"}  IconType={MaterialIcons} IconName={"group"}/>
      <NumberStat backgroundColor={"red"}  number={35} Title={"الكفال"}  IconType={FontAwesome} IconName={"user-secret"}/>
      </View>
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
  containerTitle: {
    flexDirection: "row",
  },
  containerFilter: {
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  filterItem: {
    padding: 6,
    backgroundColor: "#fff",
    borderRadius: 5,
    minWidth: 65,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 3,
  },
  filterText: {
    fontFamily: "Tajawal-Medium",
  },
  ScreenEntity: {
    flexDirection: "row",
    width: "100%",
    marginTop: "15%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  ScreenEntityTitle: {
    color: "#000",
    fontSize: 18,
    marginRight: 10,
    fontFamily: "Tajawal-Medium",
  },

  Content: {
    width: "100%",
    maxHeight: "72.5%",
    backgroundColor: "#f5f5f5",
    display: "flex",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  menuContainer: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: "#348578",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  StatContainer:{
    flexDirection:"row-reverse",
    width:"90%",
    justifyContent:"space-between",
    marginTop:20
  },
});
