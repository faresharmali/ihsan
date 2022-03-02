import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "native-base";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Family from "../../../assets/avatars/family.png";
import FamilyInfo from "./FamilyInfo";
import Kids from "./Kids";
export default function FamilyScreen({ navigation }) {
  const [section, setSection] = useState("infos");
const kids=[
  {
    name:"الابن الأول",
    sexe:"ذكر",
    age:"12"
  },
  {
    name:"الابن الثاني",
    sexe:"ذكر",
    age:"9"
  },
  {
    name:"الابن الثالث",
    sexe:"انثى",
    age:"13"
  },
  {
    name:"الابن الرابع",
    sexe:"ذكر",
    age:"11"
  },
  {
    name:"الابن الخامس",
    sexe:"أنثى",
    age:"14"
  },
 
]
  return (
    <View style={styles.container}>
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
        <Image style={styles.EntityImage} source={Family} />
        <Text style={styles.EntityTitle}>عائلة فلانة أرملة فلان</Text>
        <View style={styles.Navigation}>
          <TouchableOpacity onPress={() => setSection("infos")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>معلومات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("idk")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>الأبناء</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("idk")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>طلبات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("idk")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>استفادات</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {section == "infos" && <FamilyInfo />}

      {section != "infos" && (
        <ScrollView style={styles.Content}>
          <Kids kids={kids} />
         
        </ScrollView>
      )}
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
  pageEntity: {
    width: "100%",
    maxHeight: "25%",
    backgroundColor: "#348578",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  EntityImage: {
    width: 70,
    height: 70,
    marginBottom: 5,
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
  Navigation: {
    width: "90%",
    flexDirection: "row-reverse",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 3,
    height: 50,
    bottom: -25,
  },
  NavigationItemText: {
    fontFamily: "Tajawal-Medium",
  },
  NavigationItem: {
    height: "100%",
    justifyContent: "center",
    width: 80,
    margin: 5,
    marginTop: 0,
    marginBottom: 0,
    alignItems: "center",
  },

  Content: {
    marginTop: 30,
    width: "100%",
    maxHeight: "72.5%",
    display: "flex",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
