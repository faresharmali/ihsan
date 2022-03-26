import "react-native-gesture-handler";
import React from "react";

import { StyleSheet, SafeAreaView, Text } from "react-native";
import Login from "./app/Auth/Login";
import { NativeBaseProvider } from "native-base";
import { useState } from "react";
import { useFonts } from "expo-font";
import Admin from "./app/Screens/Admin/Admin";
import { Provider } from "react-redux";
import store from "./app/store";
import Wasseet from "./app/Screens/Wasset/wasset";
export default function App() {

  const [CurrentPage, PageHandler] = useState(2);
  let [fontsLoaded] = useFonts({
    "Amiri-Bold": require("./assets/fonts/Amiri-Bold.ttf"),
    "Tajawal-Medium": require("./assets/fonts/Tajawal-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  }
  return (
    <Provider store={store}>
      <NativeBaseProvider style={styles.container}>
        {CurrentPage == 0 && <Login PageHandler={PageHandler} />}
        {CurrentPage == 1 && <Admin PageHandler={PageHandler} />}
        {CurrentPage == 2 && <Wasseet PageHandler={PageHandler} />}
      </NativeBaseProvider>
    </Provider>
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
