import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome5, Entypo, MaterialIcons } from "@expo/vector-icons";
import Family from "../../../assets/icons/user.png";
import { Icon } from "native-base";
import { useSelector } from "react-redux";
import toastConfig from "../../Components/ToastConfiguration";
import Toast from "react-native-toast-message";
import DataContainer from "../../Components/DataContainer";
import { getFamilies } from "../../api/family";
import { useDispatch } from "react-redux";
import WidowSectionBottomBar from "../../Navigation/WidowSectionBottomBar";

export default function Widows({ navigation, drawer }) {
  const dispatch = useDispatch();


  const openModal = (data) => {
    navigation.navigate("Family", data);
  };
  let Widows = useSelector((state) => state.Families).map((w) => ({
    0: w.motherFullName,
    1: w.phone,
  }));
  const updateState = (data) => {
    return {
      type: "updateFamiliesList",
      data: data,
    };
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const res = await getFamilies();
      dispatch(updateState(res.data.result));
    });

    return unsubscribe;
  }, [navigation]);

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
          <Text style={styles.ScreenEntityTitle}>الأرامل : قسم الأرامل </Text>
          <FontAwesome5 name="hand-holding-heart" size={25} color="#fff" />
        </View>
      </View>
      <View style={styles.Section}>
        <ScrollView style={styles.Content}>
          {Widows.map((f) => (
            <DataContainer
              key={f.name}
              AvatarSize={22}
              data={f}
              pic={Family}
              openFamily={() => openModal(f)}
            />
          ))}
        </ScrollView>
      </View>
      <Toast config={toastConfig} />

     
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
  containerFilter: {
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  filterItem: {
    padding: 6,
    backgroundColor: "#fff",
    borderRadius: 5,
    minWidth: 55,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 3,
  },
  filterText: {
    fontFamily: "Tajawal-Medium",
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

  Section: {
    width: "100%",
    height: "90%",
    backgroundColor: "#f5f5f5",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    display: "flex",
    alignItems: "center",
  },
  Content: {
    width: "100%",
    maxHeight: "78%",
    backgroundColor: "#f5f5f5",
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
  fab: {
    width: 50,
    height: 50,
    backgroundColor: "#348578",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    elevation: 5,
    position: "absolute",
    bottom: 65,
    right: 10,
  },
});
