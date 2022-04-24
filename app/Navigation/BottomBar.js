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
  MaterialIcons ,
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import React from "react";

export default function BottomBar(props) {
  return (
    <View style={styles.Container}>
    <View style={styles.BottomBar}>
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Users")}>
          <View style={styles.bottomBarITem}>
            <Icon
              as={MaterialCommunityIcons}
              name="account-group"
              color={"#fff"}
              size={4}
            />

            <Text style={styles.bottomBarITemText}>الأعضاء</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Famillies")}
        >
          <View style={styles.bottomBarITem}>
            <Icon as={MaterialIcons} name="family-restroom" color={"#fff"} size={4} />

            <Text style={styles.bottomBarITemText}>العائلات</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("Kofal")}
        >
          <View style={styles.bottomBarITem}>
            <Icon
              as={FontAwesome5}
              name="hand-holding-heart"
              color={"#fff"}
              size={4}
            />

            <Text style={styles.bottomBarITemText}>الكفال</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Bureau")}
        >
          <View style={styles.bottomBarITem}>
            <Icon
              as={FontAwesome}
              name="building"
              color={"#ffff"}
              size={4}
            />

            <Text style={styles.bottomBarITemText}>المقر</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Orphans")}
        >
          <View style={styles.bottomBarITem}>
            <Icon
              as={FontAwesome5}
              name="child"
              color={"#fff"}
              size={4}
            />

            <Text style={styles.bottomBarITemText}>الأيتام</Text>
          </View>
        </TouchableOpacity>
       
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container:{
    backgroundColor: "#f5f5f5",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
  },
  BottomBar: {
    backgroundColor: "#348578",
    width: "100%",
    height: 50,
  
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    borderTopRightRadius:15,
    borderTopLeftRadius:15,
  },
  bottomBarITem: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBarITemText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Tajawal-Medium",
    fontSize:12
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
