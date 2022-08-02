import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import { Button } from "react-native-paper";


export default function DeleteConfirmation({ Confirme }) {
  return (
    <View style={styles.Modal}>
      <View style={styles.ModalContent}>
        <Text style={styles.ModalText}> تأكيد عملية الحذف</Text>
        <Button onPress={Confirme} style={styles.Button} mode="contained">
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
    height: "100%",
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
    opacity: 1,
    elevation: 2,
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
    backgroundColor: "#ad1a1a",
    marginTop: 25,
    borderRadius: 60,
  },
});
