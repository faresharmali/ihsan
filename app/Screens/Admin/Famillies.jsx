import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import BottomBar from "../../Navigation/BottomBar";
import { Icon } from "native-base";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import DataContainer from "../../Components/DataContainer";
import Family from "../../../assets/avatars/family.png";
import { Input, Stack } from "native-base";

export default function Families({ navigation }) {
  const [active, setActive] = useState(1);
  let [fontsLoaded] = useFonts({
    "Amiri-Bold": require("../../../assets/fonts/Amiri-Bold.ttf"),
    "Tajawal-Medium": require("../../../assets/fonts/Tajawal-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  }
  const styling = {
    backgroundColor: "#fff",
    marginTop: 5,
  };
  const openModal = () => {
    navigation.navigate("Family");
  };
  const Famillies = [
    {
      0: "عائلة مريم أرملة محمد",
      1: "0660818412",
    },

    {
      0: "عائلة فاطمة أرملة عمر",
      1: "0660818412",
    },

    {
      0: "عائلة كريمة أرملة اسلام",
      1: "0660818412",
    },

    {
      0: "عائلة مريم أرملة عبد الله",
      1: "0660818412",
    },
    {
      0: "عائلة سعدية أرملة أسامة",
      1: "0660818412",
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.ScreenEntity}>
        <View style={styles.menuContainer}>
          <Icon as={Entypo} name="menu" size={8} color="#fff" />
        </View>

        <View style={styles.containerTitle}>
          <Text style={styles.ScreenEntityTitle}>العائلات </Text>
          <MaterialCommunityIcons
            name="account-group"
            size={30}
            color="#348578"
          />
        </View>
      </View>
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
        {Famillies.map((f) => (
          <DataContainer
            AvatarSize={40}
            data={f}
            pic={Family}
            openFamily={openModal}
          />
        ))}
      </ScrollView>
      <BottomBar
        navigation={navigation}
        adduser={() => navigation.navigate("AddFamily")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginTop: "15%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
  },
  ScreenEntityTitle: {
    color: "#000",
    fontSize: 25,
    marginRight: 10,
    fontFamily: "Tajawal-Medium",
  },

  Content: {
    width: "100%",
    maxHeight: "80%",
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
