import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
import React from "react";
import Man from "../../assets/avatars/man.png";
import { Icon } from "native-base";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
export default function DataContainer(props) {
  return (
    <View style={styles.DataContainer}>
      <Image source={props.pic} style={styles.avatar} />
      <View style={styles.infos}>
        <Text style={styles.UserPersonal}>حرمالي فارس </Text>
        <View style={styles.secondaryInfos}>
          <Icon
            as={MaterialIcons}
            name="admin-panel-settings"
            size={4}
            color="#000"
          />

          <Text> قسم الادارة</Text>
          <Icon style={{marginRight:10,marginLeft:5}} as={Entypo} name="clock" size={4} color="#000" />

          <Text>اخر تواجد اليوم</Text>
        </View>
      </View>
      <TouchableOpacity onPress={props.openFamily}>
      <View style={styles.menuBtn}>
        <Icon as={Entypo} name="dots-three-horizontal" size={5} color="#fff" />
      </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  UserPersonal: {
    fontFamily: "Tajawal-Medium",

    fontSize: 15,
    color: "#000",
    marginBottom:5
  },
  DataContainer: {
    width: "100%",
    height:60,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 7,
    shadowColor: "#000",
    elevation: 1.5,
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    height: 45,
    width: 45,
  },
  secondaryInfos: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  infos: {
    marginRight: 5,
    width: "75%",
  },
  menuBtn: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#348578",
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
