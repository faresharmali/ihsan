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
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import Family from "../../../assets/avatars/family.png";
import { Box, Fab } from "native-base";
import icon from "../../../assets/icons/information.png";
import store from "../../store";
import DataContainer from "../../Components/DataContainer";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import toastConfig from "../../Components/ToastConfiguration";
export default function AdminProfile({ route, navigation }) {
  const [refresh, setRefresh] = useState(false);

  store.subscribe(() => {
    setRefresh(!refresh);
  });

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
        <Image style={styles.EntityImage} source={route.params.pic} />
        <Text style={styles.EntityTitle}>{route.params[0]}</Text>
        <Text style={styles.EntityTitle}>{route.params[1]}</Text>
      </View>
      <View style={styles.ProfileBody}>

      <View style={styles.InfosContainer}>
      <View style={styles.titleContainer}>
          <Text style={styles.title}>معلومات المستخدم </Text>
          <Icon
            as={Ionicons}
            size={8}
            color="#348578"
            name="information-circle"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>الاسم و اللقب : {route.params[0]} </Text>
          <Icon
            as={FontAwesome}
            size={6}
            color="#348578"
            name="user"
          />
        </View>
       
        <View style={styles.Info}>
          <Text style={styles.InfoText}>اسم المستخدم : </Text>
          <Icon
            as={FontAwesome}
            size={6}
            color="#348578"
            name="user"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>العنوان : </Text>
          <Icon
            as={FontAwesome}
            size={6}
            color="#348578"
            name="map-marker"
          />
        </View>
        <View style={styles.Info}>
          <Text style={styles.InfoText}>رقم الهاتف : </Text>
          <Icon
            as={FontAwesome}
            size={6}
            color="#348578"
            name="phone"
          />
        </View>
       
        <View style={styles.Info}>
          <Text style={styles.InfoText}> القسم : {route.params[1]}</Text>
          <Icon
            as={FontAwesome5}
            size={6}
            color="#348578"
            name="shopping-bag"
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
      </View>
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
    height: "25%",
    backgroundColor: "#348578",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
    paddingBottom: 25,
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
  ProfileBody:{
    width:"100%",
    height:"79%",
    marginTop:"-4%",
    backgroundColor:"#f5f5f5",
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
  },  
  InfosContainer: {
    width: "100%",
    height: 520,
    marginTop: 60,
    borderRadius: 15,
    padding:10,
paddingRight:30 
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
