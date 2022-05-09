import React, { useState, useEffect } from "react";
import { Text, View, Image, Keyboard } from "react-native";
import styles from "../Styles.js";
import { Spinner } from "native-base";
import { useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Loading({ PageHandler, SetloggedInUser }) {
  const dispatch = useDispatch();
  const setLoggedUser = (data) => {
    return {
      type: "setLoggedUser",
      data: data,
    };
  };
  useEffect(async () => {
    const LoggedUser = await AsyncStorage.getItem("LoggedUser");
    if (LoggedUser) {
      SetloggedInUser(JSON.parse(LoggedUser));
      dispatch(setLoggedUser(JSON.parse(LoggedUser)));
      PageHandler(2);
    } else {
      PageHandler(1);
    }
  });
  return (
    <View style={styles.LoadingContainer}>
      <Spinner size="lg" />
    </View>
  );
}
