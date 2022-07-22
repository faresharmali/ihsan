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
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import Family from "../../../assets/avatars/family.png";

import man from "../../../assets/avatars/man.png";
import info from "../../../assets/icons/information.png";
import DataContainer from "../../Components/DataContainer";
import UserInfos from "./userInfos";
import FamilyInfosContainer from "../../Components/Containers/FamilyInfosContainer";
import { useSelector } from "react-redux";
export default function Wasset({ route, navigation }) {
  const [section, setSection] = useState("infos");

  const Familli = useSelector((state) => state.Families)

  let Informations = useSelector((state) => state.Informations).filter((info)=>info.author==route.params.name);
  const openModal = (data) => {
    navigation.navigate("InformationAdmin", data);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.pageEntity}>
        <View style={styles.IconsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Users")}>
            <Icon as={Ionicons} size={8} color="#fff" name="md-chevron-back" />
          </TouchableOpacity>
          <Icon
            as={MaterialCommunityIcons}
            size={8}
            color="#fff"
            name="square-edit-outline"
          />
        </View>
        <Image style={styles.EntityImage} source={man} />
        <Text style={styles.EntityTitle}>{route.params[0]}</Text>
        <View style={styles.Navigation}>
          <TouchableOpacity onPress={() => setSection("infos")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>معلومات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("children")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>العائلات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("posts")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>المنشورات</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {section == "infos" && (
        <UserInfos title="معلومات العضو" data={route.params} />
      )}
      {section == "children" && (
        <ScrollView style={styles.Content}>
          {route.params.famillies &&
            route.params.famillies.map((f) => (
              <FamilyInfosContainer
                key={f._id}
                AvatarSize={40}
                data={Familli.filter((fa)=>fa.id==f.id)[0]}
                pic={Family}
              />
              
            ))}
        </ScrollView>
      )}
      {section == "posts" && (
        <ScrollView style={styles.Content}>
         {Informations.map((f) => (
            <DataContainer
              key={f.id}
              AvatarSize={22}
              data={f}
              pic={info}
              openFamily={() => openModal(f)}
            />
          ))}
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
    width: 105,
    margin: 5,
    marginTop: 0,
    marginBottom: 0,
    alignItems: "center",
  },

  Content: {
    marginTop: 30,
    width: "100%",
    maxHeight: "71.5%",
    display: "flex",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
});
