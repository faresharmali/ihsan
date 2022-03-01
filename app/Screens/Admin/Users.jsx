import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import BottomBar from "../../Navigation/BottomBar";
import { Icon } from "native-base";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import DataContainer from "../../Components/DataContainer";
import Man from "../../../assets/avatars/man.png";
import Man2 from "../../../assets/avatars/man2.png";
import Woman from "../../../assets/avatars/user.png";
import Woman2 from "../../../assets/avatars/woman.png";
import User from "../../../assets/avatars/woman2.png";
import Gamer from "../../../assets/avatars/gamer.png";

export default function Users({navigation}) {
  const [active, setActive] = useState(1);
  let [fontsLoaded] = useFonts({
    "Amiri-Bold": require("../../../assets/fonts/Amiri-Bold.ttf"),
    "Tajawal-Medium": require("../../../assets/fonts/Tajawal-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.ScreenEntity}>
        <View style={styles.menuContainer}>
          <Icon as={Entypo} name="menu" size={8} color="#fff" />
        </View>

        <View style={styles.containerTitle}>
          <Text style={styles.ScreenEntityTitle}>الأعضاء </Text>
          <MaterialCommunityIcons
            name="account-group"
            size={30}
            color="black"
            color="#348578"
          />
        </View>
      </View>
      <View style={styles.containerFilter}>
        <TouchableWithoutFeedback onPress={() => setActive(1)}>
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 1 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 1 ? "#fff" : "#000",
              }}
            >
              ادراة
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setActive(2)}>
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 2 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 2 ? "#fff" : "#000",
              }}
            >
              وسطاء{" "}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setActive(3)}>
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 3 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 3 ? "#fff" : "#000",
              }}
            >
              موزعين{" "}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setActive(4)}>
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 4 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 4 ? "#fff" : "#000",
              }}
            >
              كفال
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setActive(5)}>
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 5 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 5 ? "#fff" : "#000",
              }}
            >
              رؤساء الأقسام
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView style={styles.Content}>
        <DataContainer pic={Man} />
        <DataContainer pic={Man2} />
        <DataContainer pic={Woman} />
        <DataContainer pic={Woman2} />
        <DataContainer pic={User} />
        <DataContainer pic={Gamer} />
        <DataContainer pic={Man} />
        <DataContainer pic={Woman} />
      
      </ScrollView>
      <BottomBar navigation={navigation} adduser={()=>navigation.navigate('AddUser')} />
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
    backgroundColor: "#f5f5f5",
    backgroundColor: "#f5f5f5",
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
    maxHeight: "72.5%",
    backgroundColor: "#f5f5f5",
    display:"flex",
    paddingTop:10,
    paddingLeft:20,
    paddingRight:20,
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
