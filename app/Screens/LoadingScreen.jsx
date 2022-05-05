import React, { useState, useEffect } from "react";
import { Text, View, Image, Keyboard } from "react-native";
import styles from "../Styles.js";
import { Spinner } from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Loading({PageHandler,SetloggedInUser}) {
  useEffect(async () => {
    const LoggedUser = await AsyncStorage.getItem("LoggedUser");
    if(LoggedUser){
        SetloggedInUser(JSON.parse(LoggedUser))
        PageHandler(2)
    }else{
        PageHandler(1)

    }
  });
  return (
    <View style={styles.LoadingContainer}>
      <Spinner size="lg" />
    </View>
  );
}
