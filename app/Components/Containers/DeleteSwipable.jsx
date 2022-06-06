import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Icon } from "native-base";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { SwipeablePanel } from "rn-swipeable-panel";

export default function DeleteSwipable({
  isPanelActive,
  setIsPanelActive,
  PressedItem,
  title,
}) {
  const panelProps = {
    fullWidth: true,
    openLarge: false,
    closeOnTouchOutside: true,
    showCloseButton: false,

    onClose: () => {
      setIsPanelActive(false);
    },
    onPressCloseButton: () => {
      setIsPanelActive(false);
    },
  };

  return (
    <SwipeablePanel  {...panelProps} isActive={isPanelActive}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.deleteText}>حذف</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.deleteBtn,backgroundColor:"#348578"}}>
          <Text style={{...styles.deleteText}}>تعديل</Text>
        </TouchableOpacity>
      </View>
    </SwipeablePanel>
  );
}

const styles = StyleSheet.create({

  container: {
    width: "100%",
    height:250,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
  deleteBtn: {
    width: "80%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor:"#d42a2a",
    marginBottom:20
  },
  deleteText: {
    fontFamily: "Tajawal-Medium",
    fontSize: 17,
    color: "#fff",
  },
});
