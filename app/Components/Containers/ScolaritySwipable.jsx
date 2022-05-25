import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { SwipeablePanel } from "rn-swipeable-panel";

export default function ScolaritySwipeable({
  isPanelActive,
  setIsPanelActive,
  ChooseLevel,
  title,
}) {
  const panelProps = {
    fullWidth: true,
    openLarge: true,
    closeOnTouchOutside: true,
    showCloseButton: true,

    onClose: () => {
      setIsPanelActive(false);
    },
    onPressCloseButton: () => {
      setIsPanelActive(false);
    },
  };
  const levels = [
    {
      title: "التعليم الابتدائي",
      level: "ابتدائي",
      levels: [
        "السنة الأولى",
        "السنة الثانية",
        "السنة الثالثة",
        "السنة الرابعة",
        "السنة الخامسة",
      ],
    },
    {
      title: "التعليم المتوسط",
      level: "متوسط",
      levels: [
        "السنة الأولى",
        "السنة الثانية",
        "السنة الثالثة",
        "السنة الرابعة",
      ],
    },
    {
      title: "التعليم الثانوي",
      level: "ثانوي",
      levels: ["السنة الأولى", "السنة الثانية", "السنة الثالثة"],
    },
  ];
  return (
    <SwipeablePanel {...panelProps} isActive={isPanelActive}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        {levels.map((l) => (
          <>
            <Text style={{fontSize:17}}>{l.title}</Text>
            <View style={styles.levelContainer}>
              {l.levels.map((year) => (
                <TouchableOpacity onPress={()=>ChooseLevel((year+" "+l.level))} style={styles.Btn}>
                  <Text> {year}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
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
  },
  ItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#348578",
    borderRadius: 10,
  },
  Item: {
    fontFamily: "Tajawal-Medium",
  },
  levelContainer: {
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
    alignItems:"center"
  },
  Btn: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    marginTop:10,
    alignItems:"center",
    width:"80%"
  },
});
