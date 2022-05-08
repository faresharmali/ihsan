import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import OrpahnsSectionBottomBar from "../../Navigation/OrpahansSectionBottomBar";
import { Icon } from "native-base";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import DataContainer from "../../Components/DataContainer";
import { useSelector } from "react-redux";
import { LogBox } from "react-native";
import Toast from "react-native-toast-message";
import toastConfig from "../../Components/ToastConfiguration";
import Man from "../../../assets/avatars/man.png";
LogBox.ignoreAllLogs();
export default function Members({ navigation, drawer }) {
  const openModal = (u) => {
    navigation.navigate("MemberProfile", {
      ...u,
    });
  };
  let users = useSelector((state) => state.users).filter(
    (u) => u[2].trim() == "قسم الأيتام"
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.ScreenEntity}>
        <TouchableOpacity
          onPress={() => drawer.openDrawer()}
          style={styles.menuContainer}
        >
          <Icon as={Entypo} name="menu" size={8} color="#fff" />
        </TouchableOpacity>

        <View style={styles.containerTitle}>
          <Text style={styles.ScreenEntityTitle}> الأعضاء : قسم الأيتام </Text>
          <MaterialCommunityIcons name="account-group" size={30} color="#fff" />
        </View>
      </View>
      <View style={styles.Section}>
        <ScrollView style={styles.Content}>
          {users.map((u) => (
            <DataContainer
              key={u[0]}
              AvatarSize={40}
              data={u}
              pic={Man}
              openFamily={() => openModal(u)}
            />
          ))}
        </ScrollView>
      </View>
      <Toast config={toastConfig} />
      <OrpahnsSectionBottomBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#348578",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 10,
  },
  containerTitle: {
    flexDirection: "row",
  },

  ScreenEntity: {
    flexDirection: "row",
    width: "100%",
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  ScreenEntityTitle: {
    color: "#fff",
    fontSize: 20,
    marginRight: 10,
    fontFamily: "Tajawal-Medium",
  },

  Content: {
    width: "100%",
    display: "flex",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  menuContainer: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: "#348578",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  Section: {
    width: "100%",
    flex: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
