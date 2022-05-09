import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "native-base";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import Kid from "../../../../assets/icons/kid.png";
export default function Kids(props) {
  console.log(props)
  return (
    <View>
    {props.kids.map((k) => (
      <TouchableOpacity onLongPress={()=>alert("wech ?")} key={k.name} style={styles.DataContainer}>
        <Image source={Kid} style={styles.avatar} />
        <View style={styles.infos}>
          <Text style={styles.UserPersonal}>{k.name} {props.lastName} </Text>
          <View style={styles.secondaryInfos}>
            <Icon
              as={MaterialIcons}
              name="admin-panel-settings"
              size={4}
              color="#000"
            />
            <Text> الجنس : {k.gender}</Text>
            <Icon
              style={{ marginRight: 10, marginLeft: 5 }}
              as={Entypo}
              name="clock"
              size={4}
              color="#000"
            />
            <Text>العمر : {k.age} </Text>
            <Icon
              style={{ marginRight: 10, marginLeft: 5 }}
              as={Entypo}
              name="clock"
              size={4}
              color="#000"
            />
            <Text>المستوى : {k.scolarity} </Text>
          </View>
        </View>
      </TouchableOpacity>
    ))}
  </View>
  );
}

const styles = StyleSheet.create({
  UserPersonal: {
    fontFamily: "Tajawal-Medium",

    fontSize: 15,
    color: "#000",
    marginBottom: 5,
  },
  DataContainer: {
    width: "100%",
    minHeight: 50,
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
    height: 20,
    width: 20,
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
