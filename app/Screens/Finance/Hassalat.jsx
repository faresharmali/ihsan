import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import toastConfig from "../../Components/ToastConfiguration";
import Toast from "react-native-toast-message";
import { getHassalat } from "../../api/Finance";
import FinanceSectionBottomBar from "../../Navigation/FinanceSectionBottomBar";
import styles from "./styles";
import HassalaContainer from "../../Components/HassalaContainer";
import { PrintData } from "../../Components/Print";


export default function Hassalat({ navigation, drawer }) {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "نجحت العملية",
      text2: " تمت اضافة الحصالة بنجاح  👋",
    });
  };
  const dispatch = useDispatch();

  const updateState = (data) => {
    return {
      type: "UpdateHassalat",
      data: data,
    };
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const res = await getHassalat();
      dispatch(updateState(res.data.result));
    });

    return unsubscribe;
  }, [navigation]);
  let Transactions = useSelector((state) => state.Finance).hassalat;

  const print = () => {
    let headings = [
      "المبلغ",
      "المكان",
      "المسؤول",
      "الحصالة",

    ]
   
    PrintData("قائمة الحصالات", headings, Transactions.map((t) => ({ amount: t.amount, location: t.location, receiver: t.receiver, name: t.name })))
  }

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
          <Text style={styles.ScreenEntityTitle}>حصالات : قسم المالية </Text>

          <MaterialCommunityIcons name="piggy-bank" size={25} color="#fff" />
          <TouchableOpacity
          onPress={() => print()}
          style={styles.menuContainer}
          >
          <Icon as={AntDesign} name="printer" size={8} color="#fff" />
        </TouchableOpacity>
        </View>
      </View>
      <View style={{ ...styles.containerFilter, paddingTop: 0 }}></View>
      <View style={styles.Section}>
        <ScrollView style={styles.Content}>
          {Transactions.map((transaction) => (
            <HassalaContainer navigation={navigation} data={transaction} />
          ))}
        </ScrollView>
      </View>
      <Toast config={toastConfig} />
      <TouchableOpacity
        onPress={() => navigation.navigate("AddHassala", { showToast })}
        style={styles.fab}
      >
        <Icon as={Entypo} name="plus" size={8} color="#fff" />
      </TouchableOpacity>
      <FinanceSectionBottomBar navigation={navigation} />
    </View>
  );
}
