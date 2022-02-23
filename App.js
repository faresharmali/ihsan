import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View } from "react-native";
import AdminDashboard from "./app/Screens/Admin/AdminDashboard";
import Login from "./app/Auth/Login";
import { NativeBaseProvider } from "native-base";
import { useState } from "react";

export default function App() {
  const [CurrentPage,PageHandler]=useState(0)
  return (
    <NativeBaseProvider style={styles.container}>
      <StatusBar style="light" />
     {CurrentPage==0 && <Login />} 
     {CurrentPage==1 && <AdminDashboard />} 
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "15%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
