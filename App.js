import "react-native-gesture-handler";
import React from "react";

import { StyleSheet, SafeAreaView, View } from "react-native";
import Login from "./app/Auth/Login";
import { NativeBaseProvider } from "native-base";
import { useState } from "react";
import Admin from "./app/Screens/Admin/Admin"
export default function App() {
  const [CurrentPage, PageHandler] = useState(1);
  return (
    <NativeBaseProvider style={styles.container}>
      {CurrentPage == 0 && <Login PageHandler={PageHandler} />}
      {CurrentPage == 1 && <Admin PageHandler={PageHandler} />}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
