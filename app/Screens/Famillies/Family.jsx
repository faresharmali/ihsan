import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState,useEffect } from "react";
import { Icon } from "native-base";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import Family from "../../../assets/avatars/family.png";
import FamilyInfo from "./FamilyInfo";
import Kids from "./Kids";
import { Box, Fab } from "native-base";
import icon from "../../../assets/icons/information.png";
import store from "../../store";
import DataContainer from "../../Components/DataContainer";
import { useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import toastConfig from "../../Components/ToastConfiguration"
export default function FamilyScreen({route,navigation }) {
  const [section, setSection] = useState("infos");
  const [refresh, setRefresh] = useState(false);
 
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
  store.subscribe(()=>{
    setRefresh(!refresh)
    })
    const showToast=()=>{
      Toast.show({
        type: "success",
        text1: "نجحت العملية",
        text2: " تمت اضافة الأبن بنجاح  👋",
      });
    }
  let family = useSelector(state=>state.Families.filter((f)=>f.id==route.params.id)[0])
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
        <Image style={styles.EntityImage} source={Family} />
        <Text style={styles.EntityTitle}>{`عائلة ${family.Mother} ارملة ${family.Father}`}</Text>
        <View style={styles.Navigation}>
          <TouchableOpacity onPress={() => setSection("infos")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>معلومات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("children")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>الأبناء</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("demands")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>طلبات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("benefits")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>استفادات</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>


      {section == "children" &&
        <ScrollView style={styles.Content}>
         <Kids kids={family.Children} />
          <Box position="relative" h={100} w="100%">
            <Fab
              onPress={() => navigation.navigate("AddChild",{...route.params,showToast})}
              position="absolute"
              size="sm"
              backgroundColor="#348578"
              icon={
                <Icon color="#fff" as={<AntDesign name="plus" />} size="sm" />
              }
            />
          </Box>
        </ScrollView>
        } 
      {section == "infos" && (
         <FamilyInfo data={family}/>
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
