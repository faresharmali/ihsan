import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { SwipeablePanel } from "rn-swipeable-panel";

export default function DeleteSwipable({
  isPanelActive,
  setIsPanelActive,
  PressedItem,title
}) {
  const panelProps = {
    fullWidth: true,
    openLarge: false,
    closeOnTouchOutside: true,
    showCloseButton: true,

    onClose: () => {
      setIsPanelActive(false);
    },
    onPressCloseButton: () => {
      setIsPanelActive(false);
    },
  };


  return (
    <SwipeablePanel {...panelProps} isActive={isPanelActive}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>

      </View>
    </SwipeablePanel>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Tajawal-Medium",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    margin: 10,
    color: "#348578",

  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop:20
  },
  ItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 50,
    marginBottom:10,
    borderWidth:1,
    borderColor:"#348578",
    borderRadius:10
  },
  Item:{
    fontFamily: "Tajawal-Medium",

  }
});
