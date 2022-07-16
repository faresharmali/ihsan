import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Icon } from "native-base";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { Button } from "react-native-paper";

import { Box, Fab } from "native-base";
import icon from "../../../assets/icons/information.png";

export default function ConfirmationModal({ kafel, userInfos ,confirm }) {
  let periode = userInfos.amount / kafel.donationAmount;
  console.log("periode", periode);
  return (
    <View style={styles.Modal}>
      <View style={styles.ModalContent}>
        <Text style={styles.ModalText}> الكافل : {kafel.name} </Text>
        <Text style={styles.ModalText}> المبلغ : {userInfos.amount} دج</Text>
        <Text style={styles.ModalText}> تاريخ الدفع : 25/08/2022</Text>

        <Text style={styles.ModalText}> المدة : {periode} شهر </Text>
        <Text style={styles.ModalText}> تاريخ الدفع المقبل : 25/08/2022</Text>
        <Button
          onPress={confirm}
          style={styles.Button}
          mode="contained"
        >
          <Text style={{ fontSize: 16, marginLeft: 10 }}>تأكيد</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Modal: {
    position: "absolute",
    backgroundColor: "#000000A8",
    height: "115%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    zIndex: 10,
  },
  ModalContent: {
    paddingTop: 30,
    paddingBottom: 30,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 11,
    opacity:1,
  },
  ModalText: {
    fontFamily: "Tajawal-Medium",
    fontSize: 17,
    color: "#000",
  },
  Button: {
    flexDirection: "row-reverse",
    height: 50,
    width: 230,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#348578",
    marginTop: 25,
    borderRadius: 60,
  },
});
