import { StyleSheet, Button, View } from "react-native";
import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Administration from "./Administration";
import DrawerContent from "../../Navigation/DrawerContent";
import { NavigationContainer } from "@react-navigation/native";
import AdminDashboard from "./AdminDashboard";
import OrpahansSection from "../OrphansSection";
const Drawer = createDrawerNavigator();

export default function Dashboard(props) {
  useEffect(() => {
    console.log("token changed", props.Token);
  }, [props.Token]);

  return (
    <React.Fragment>
      <NavigationContainer>
        <Drawer.Navigator
          drawerPosition="right"
          drawerContent={(prop) => (
            <DrawerContent {...prop} pageHandler={props.pageHandler} />
          )}
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Drawer.Screen
            name="Home"
            component={(props) => (
              <AdminDashboard {...props} pageHandler={props.pageHandler} />
            )}
          />
          <Drawer.Screen
            name="Administration"
            component={(props) => (
              <Administration {...props} pageHandler={props.pageHandler} />
            )}
          />
          <Drawer.Screen
            name="OrpahansSection"
            component={(props) => (
              <OrpahansSection {...props} pageHandler={props.pageHandler} />
            )}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 35,
    backgroundColor: "#232e42",
  },
  sidebar: {},
});
