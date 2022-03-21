import React, { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "native-base";
import Logo from "../../assets/Logo2.png";
export default function DrawerContent(props) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 30 }}>
          <View style={{ marginLeft: 15, flexDirection: "column" }}>
            <Title style={styles.title}>جمعية إحسان</Title>
            <Caption style={styles.caption}>جمعية إحسان</Caption>
          </View>
          <Avatar.Image source={Logo} size={60} marginLeft={10} />
        </View>
      </View>
      <Drawer.Section>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              style={styles.icon}
              as={<MaterialIcons name="home" />}
            />
          )}
          label="الرئيسية"
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              style={styles.icon}
              as={<MaterialIcons name="account-circle" />}
            />
          )}
          label="قسم الكفالة"
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate("Kafala");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              style={styles.icon}
              as={<MaterialIcons name="account-circle" />}
            />
          )}
          label="قسم المالية"
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate("venteetachat");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              style={styles.icon}
              as={<MaterialIcons name="account-circle" />}
            />
          )}
          label="المقر"
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate("venteetachat");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              style={styles.icon}
              as={<MaterialIcons name="account-circle" />}
            />
          )}
          label="قسم الصحة"
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate("venteetachat");
          }}
        />
        <DrawerItem
          label="قسم التعليم"
          icon={({ color, size }) => (
            <Icon
              style={styles.icon}
              as={<MaterialIcons name="account-circle" />}
            />
          )}
          labelStyle={styles.label}
          onPress={() => {
            props.navigation.navigate("venteetachat");
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.7,
    marginRight: 10,
  },
  container: {
    height: "100%",
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingTop: StatusBar.currentHeight,
    paddingRight: 20,
    backgroundColor: "#348578",
    height: "18%",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 15,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    letterSpacing: 1,
    marginTop: 3,
    fontWeight: "bold",
    textAlign: "right",
  },
  caption: {
    color: "#fff",

    fontSize: 15,
    lineHeight: 14,
    marginTop: 5,
    textAlign: "right",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    alignSelf: "center",
    position: "absolute",
    right: 5,
  },
});
