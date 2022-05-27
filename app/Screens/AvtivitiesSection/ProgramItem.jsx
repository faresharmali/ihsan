import { StyleSheet, Text, View, TouchableOpacity,Image } from "react-native";
import React from "react";
import img from "../../../assets/icons/information.png"

export default function ProgramItem({ program,setPressedProgram ,setDeletePannelActive}) {
  const date = new Date(program.date);
  return (
    <TouchableOpacity onLongPress={()=>{setPressedProgram(program);setDeletePannelActive(true)}} style={styles.DataContainer}>
      <Image source={img} style={{width:30,height:30}} />

      <View style={styles.infos}>
        <Text style={styles.UserPersonal}>{program.title}</Text>
        <View style={styles.secondaryInfos}>
          <Text style={styles.date}>
            التاريخ : 
            {date.getFullYear() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getDate()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  UserPersonal: {
    fontFamily: "Tajawal-Medium",
    fontSize: 15,
    color: "#000",
    marginBottom: 5,
  },
  date: {
    fontFamily: "Tajawal-Medium",
    fontSize: 15,
    color: "#000",
    marginBottom: 5,
  },
  DataContainer: {
    width: "95%",
    minHeight: 70,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 7,
    shadowColor: "#000",
    elevation: 1.5,
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingLeft: 10,
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
