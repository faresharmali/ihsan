import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function IngredientContainer(props) {
  return (
    <TouchableOpacity onLongPress={()=>props.select(props.data.id)} onPress={props.openFamily} style={styles.DataContainer}>
      <Image
        source={props.pic}
        style={{ width: props.AvatarSize, height: props.AvatarSize,marginLeft:20 }}
      />
      <View style={styles.infos}>
        <Text style={styles.UserPersonal}>{props.data[0]} - </Text>
        <Text style={styles.UserPersonal}> {props.data[2]}  </Text>
        <Text style={styles.UserPersonal}>{props.data[1]} </Text>
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
  DataContainer: {
    width: "100%",
    height: 55,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 7,
    shadowColor: "#000",
    elevation: 1.5,
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 10,
  },

  secondaryInfos: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  infos: {
    marginRight: 5,
    width: "100%",
    flexDirection: "row-reverse",
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
