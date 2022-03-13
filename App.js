import "react-native-gesture-handler";
import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View } from "react-native";
import AdminDashboard from "./app/Screens/Admin/AdminDashboard";
import Login from "./app/Auth/Login";
import { NativeBaseProvider } from "native-base";
import { useState } from "react";
export default function App() {
  const [CurrentPage, PageHandler] = useState(1);
  return (
    <NativeBaseProvider style={styles.container}>
      {CurrentPage == 0 && <Login PageHandler={PageHandler} />}
      {CurrentPage == 1 && <AdminDashboard PageHandler={PageHandler} />}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
