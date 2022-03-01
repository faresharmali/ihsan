import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import BottomBar from "../../Navigation/BottomBar";
import { Icon } from "native-base";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import DataContainer from "../../Components/DataContainer";
import Family from "../../../assets/avatars/family.png";

export default function FamilyScreen({ navigation }) {
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
      <View style={styles.pageEntity}>
        <View style={styles.IconsContainer}>
          <Icon as={Ionicons} size={8} color="#fff" name="md-chevron-back" />
          <Icon
            as={MaterialCommunityIcons}
            size={8}
            color="#fff"
            name="square-edit-outline"
          />
        </View>
        <Image style={styles.EntityImage} source={Family} />
        <Text style={styles.EntityTitle}>عائلة فلانة أرملة فلان</Text>
        <View style={styles.Navigation}>
          <View style={styles.NavigationItem}>
            <Text style={styles.NavigationItemText}>معلومات</Text>
          </View>
          <View style={styles.NavigationItem}>
            <Text style={styles.NavigationItemText}>الأبناء</Text>
          </View>
          <View style={styles.NavigationItem}>
            <Text style={styles.NavigationItemText}>طلبات</Text>
          </View>
          <View style={styles.NavigationItem}>
            <Text style={styles.NavigationItemText}>استفادات</Text>
          </View>
        </View>
      </View>
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
  pageEntity: {
    width: "100%",
    maxHeight: "25%",
    backgroundColor: "#348578",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  EntityImage: {
    width: 70,
    height: 70,
    marginBottom: 5,
  },

  EntityTitle: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Tajawal-Medium",
  },
  IconsContainer: {
    top: 20,
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  Navigation: {
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    backgroundColor:"#fff",
    padding:15,
    borderRadius:10,
    shadowColor: "#000",
    elevation: 3,
    height:50,
    bottom:-25
  },
  NavigationItemText:{
    fontFamily: "Tajawal-Medium",
 
  }
});
