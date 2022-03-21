import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Icon } from "native-base";
import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import React from "react";

export default function BottomBar(props) {
  return (
    <View style={styles.BottomBar}>
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Users")}>
          <View style={styles.bottomBarITem}>
            <Icon
              as={MaterialCommunityIcons}
              name="account-group"
              color={"#348578"}
              size={5}
            />

            <Text style={styles.bottomBarITemText}>الأعضاء</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Famillies")}
        >
          <View style={styles.bottomBarITem}>
            <Icon as={FontAwesome} name="building" color={"#348578"} size={5} />

            <Text style={styles.bottomBarITemText}>العائلات</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => props.adduser()}>
        <View style={styles.Circle}>
          <Icon as={Entypo} name="plus" color={"#fff"} size={8} />
        </View>
      </TouchableOpacity>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Informations")}
        >
          <View style={styles.bottomBarITem}>
            <Icon
              as={FontAwesome5}
              name="money-check-alt"
              color={"#348578"}
              size={5}
            />

            <Text style={styles.bottomBarITemText}>معلومات</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Activities")}
        >
          <View style={styles.bottomBarITem}>
            <Icon
              as={MaterialCommunityIcons}
              name="truck-fast"
              color={"#348578"}
              size={5}
            />

            <Text style={styles.bottomBarITemText}>أنشطة</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  BottomBar: {
    backgroundColor: "#fff",
    width: "95%",
    height: 60,
    position: "absolute",
    bottom: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,

    elevation: 2,
  },
  bottomBarITem: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBarITemText: {
    color: "#000",
    fontWeight: "600",
    fontFamily: "Tajawal-Medium",
  },
  Circle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: "#348578",
    borderRadius: 35,
    shadowColor: "#000",
    elevation: 3,
  },
  itemContainer: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
