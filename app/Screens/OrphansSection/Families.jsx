import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import OrpahnsSectionBottomBar from "../../Navigation/OrpahansSectionBottomBar";
import { Icon } from "native-base";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import FamilyInfosContainer from "../../Components/Containers/FamilyInfosContainer";
import Family from "../../../assets/avatars/family.png";
import { Input, Stack } from "native-base";
import { useSelector } from "react-redux";
import toastConfig from "../../Components/ToastConfiguration";
import Toast from "react-native-toast-message";

export default function Families({ navigation, drawer }) {
  const styling = {
    backgroundColor: "#fff",
    marginTop: 5,
  };
  const openModal = (data) => {
    navigation.navigate("FamilyInfos", data);
  };
  let MyFamilies = useSelector((state) => state.Families).filter(
    (f) => f.donation > 0
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
          <Text style={styles.ScreenEntityTitle}>العائلات المكفولة</Text>
          <MaterialCommunityIcons name="account-group" size={30} color="#fff" />
        </View>
      </View>
      <View style={styles.Section}>
        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<MaterialIcons name="search" />}
              size={5}
              ml="2"
              color="#348578"
            />
          }
          style={styles.input}
          w={{
            base: "90%",
            md: "50%",
          }}
          h={42}
          textAlign="right"
          placeholder="البحث عن عائلة"
          {...styling}
        />

        <ScrollView style={styles.Content}>
          {MyFamilies.map((f) => (
            <FamilyInfosContainer
              key={f._id}
              AvatarSize={40}
              data={f}
              pic={Family}
              openFamily={() => openModal(f)}
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
});
