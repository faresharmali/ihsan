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
import Man from "../../../../assets/avatars/man.png" 

import { Box, Fab } from "native-base";
import icon from "../../../../assets/icons/information.png";
import UserInfos from "./UserInfos.jsx"
import DataContainer from "../../../Components/DataContainer";
export default function UserProfile({ route,navigation }) {
  const [section, setSection] = useState("infos");
  const users = [
    {
      0: "طلب العائلة 1",
      1: "معلومات الطلب",
      2: "معلومات الطلب",
    },

    {
      0: "طلب العائلة 1",
      1: "معلومات الطلب",
      2: "معلومات الطلب",
    },

    {
      0: "طلب العائلة 1",
      1: "معلومات الطلب",
      2: "معلومات الطلب",
    },
    {
      0: "طلب العائلة 1",
      1: "معلومات الطلب",
      2: "معلومات الطلب",
    },

    {
      0: "طلب العائلة 1",
      1: "معلومات الطلب",
      2: "معلومات الطلب",
    },

    {
      0: "طلب العائلة 1",
      1: "معلومات الطلب",
      2: "معلومات الطلب",
    },
    {
      0: "طلب العائلة 1",
      1: "معلومات الطلب",
      2: "معلومات الطلب",
    },

    {
      0: "طلب العائلة 1",
      1: "معلومات الطلب",
      2: "معلومات الطلب",
    },

    {
      0: "طلب العائلة 1",
      1: "معلومات الطلب",
      2: "معلومات الطلب",
    },
    {
      0: "طلب العائلة 1",
      1: "معلومات الطلب",
      2: "معلومات الطلب",
    },

    {
      0: "طلب العائلة 1",
      1: "معلومات الطلب",
      2: "معلومات الطلب",
    },

    {
      0: "طلب العائلة 1",
      1: "معلومات الطلب",
      2: "معلومات الطلب",
    },
  ];
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

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.pageEntity}>
        <View style={styles.IconsContainer}>
            <TouchableOpacity
            onPress={()=> navigation.navigate("Users")}
            >

          <Icon as={Ionicons} size={8} color="#fff" name="md-chevron-back" />
            </TouchableOpacity>
          <Icon
            as={MaterialCommunityIcons}
            size={8}
            color="#fff"
            name="square-edit-outline"
          />
        </View>
        <Image style={styles.EntityImage} source={route.params.pic} />
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
          <TouchableOpacity onPress={() => setSection("demands")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>النشاطات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("benefits")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>استفادات</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {section == "infos" && ( <UserInfos title="معلومات العضو"  data={route.params}/>)}
      {section == "children" && (
        <ScrollView style={styles.Content}>
          <Box position="relative" h={100} w="100%">
            <Fab
              onPress={() => navigation.navigate("AddChild")}
              position="absolute"
              size="sm"
              backgroundColor="#348578"
              icon={
                <Icon color="#fff" as={<AntDesign name="plus" />} size="sm" />
              }
            />
          </Box>
        </ScrollView>
      )}
      {section == "demands" && (
        <ScrollView style={styles.Content}>
          {users.map((u) => (
            <DataContainer AvatarSize={25} data={u} pic={icon} />
          ))}
        </ScrollView>
      )}
      {section == "benefits" && (
        <ScrollView style={styles.Content}>
          {benifits.map((u) => (
            <DataContainer AvatarSize={25} data={u} pic={icon} />
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
