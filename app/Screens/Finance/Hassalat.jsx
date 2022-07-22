import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome5, Entypo, MaterialIcons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import toastConfig from "../../Components/ToastConfiguration";
import Toast from "react-native-toast-message";
import { getHassalat } from "../../api/Finance";
import FinanceSectionBottomBar from "../../Navigation/FinanceSectionBottomBar";
import styles from "./styles";
import TransactionContainer from "../../Components/TransactionContainer";
import HassalaContainer from "../../Components/HassalaContainer";
export default function Hassalat({ navigation, drawer }) {
  const dispatch = useDispatch();
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "نجحت العملية",
      text2: " تمت اضافة الكفالة بنجاح  👋",
    });
  };
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
          <FontAwesome5 name="hand-holding-heart" size={25} color="#fff" />
        </View>
      </View>
      <View style={{ ...styles.containerFilter, paddingTop: 0 }}></View>
      <View style={styles.Section}>
        <ScrollView style={styles.Content}>
          {Transactions.map((transaction) => (
            <HassalaContainer data={transaction} />
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
