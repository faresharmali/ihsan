import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { Icon, Input } from "native-base";
import {
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import toastConfig from "../../Components/ToastConfiguration";
import Toast from "react-native-toast-message";
import { getDonators, GetStatus } from "../../api/user";
import KofaSectionBottomBar from "../../Navigation/KofaSectionBottomBar";
import { useState } from "react";

const Statu = ({ item }) => {
  var months = [
    "جانفي",
    "فبراير",
    "مارس",
    "إبريل",
    "ماي",
    "جوان",
    "جويلية",
    "أوت",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  return (
    <View style={styles.statusContainer}>
      <View style={styles.TimeContainer}>
        <Text style={styles.time}>{months[item.month - 1]}</Text>
        <Text style={styles.time}>{item.year}</Text>
      </View>
      <Text style={styles.ItemDetails}>{item.status}</Text>
    </View>
  );
};
export default function KofaStatus({ navigation, drawer }) {
  const [kofaStat, setKofaStat] = useState([]);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "نجحت العملية",
      text2: " تمت اضافة المكون بنجاح  👋",
    });
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const res = await GetStatus();
      setKofaStat(res.result.reverse());
    
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.ScreenEntity}>
        <TouchableOpacity
          onPress={() => drawer.openDrawer()}
          style={styles.menuContainer}
        >
          <Icon as={Entypo} name="menu" size={8} color="#fff" />
        </TouchableOpacity>

        <View style={styles.containerTitle}>
          <Text style={styles.ScreenEntityTitle}> حالة القفة </Text>
          <FontAwesome5 name="hand-holding-heart" size={25} color="#fff" />
        </View>
      </View>
      <ScrollView style={styles.Section}>
        {kofaStat.map((s) => (
          <Statu item={s} />
        ))}
      </ScrollView>
      <Toast config={toastConfig} />
      <TouchableOpacity
        onPress={() => navigation.navigate("ChangeKofaStatus", { showToast })}
        style={styles.fab}
      >
        <Icon
          as={MaterialCommunityIcons}
          name="database-edit"
          size={8}
          color="#fff"
        />
      </TouchableOpacity>
      <KofaSectionBottomBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#348578",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 10,
  },
  containerTitle: {
    flexDirection: "row",
  },

  ScreenEntity: {
    flexDirection: "row",
    width: "100%",
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  ScreenEntityTitle: {
    color: "#fff",
    fontSize: 20,
    marginRight: 10,
    fontFamily: "Tajawal-Medium",
  },

  Section: {
    width: "100%",
    maxHeight: "83.9%",
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
  status: {
    height: 80,
    width: "90%",
    backgroundColor: "#348578",
    marginTop: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  StatusTitle: {
    color: "#fff",
    fontSize: 21,
    fontFamily: "Tajawal-Medium",
  },
  fab: {
    width: 50,
    height: 50,
    backgroundColor: "#348578",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    elevation: 5,
    position: "absolute",
    bottom: 65,
    right: 10,
  },
  statusContainer: {
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 1,
    borderRadius: 5,
    width: "100%",
    height: 70,
    marginBottom: 10,
    elevation: 2,
  },
  TimeContainer: {
    height: 70,

    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    backgroundColor: "#348578",
    width: "23%",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  time: {
    fontFamily: "Tajawal-Medium",
    color: "#fff",
  },

  ItemDetails: {
    fontFamily: "Tajawal-Medium",
  },
});
