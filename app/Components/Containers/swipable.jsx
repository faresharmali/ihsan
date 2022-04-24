import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { SwipeablePanel } from "rn-swipeable-panel";

export default function Swipable({
  isPanelActive,
  setIsPanelActive,
  setshowButton,
  data,
  ChooseJob
}) {
  const panelProps = {
    fullWidth: true,
    openLarge: true,
    closeOnTouchOutside: true,
    showCloseButton: true,

    onClose: () => {
      setIsPanelActive(false);
      setshowButton(true);
    },
    onPressCloseButton: () => {
      setIsPanelActive(false);
      setshowButton(true);
    },
  };

  return (
    <SwipeablePanel {...panelProps} isActive={isPanelActive}>
      <Text style={styles.title}>اختيار القسم</Text>
      <View style={styles.container}>
        {data.map((d) => (
          <TouchableOpacity onPress={()=>ChooseJob(d.title)} style={styles.ItemContainer}>
            <Text style={styles.Item}>{d.title}</Text>
          </TouchableOpacity>
        ))}
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
