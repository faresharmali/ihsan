import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "native-base";
export default function TransactionStat({
  number,
  Title,
  IconName,
  IconType,
  iconSize,
  fullSize
}) {
  return (
    <View style={{...styles.StatContainer,width:fullSize ?  "100%" : "49%"}}>
      <Icon
        as={IconType}
        name={IconName}
        color="#fff"
        size={iconSize ? iconSize : 5}
      />
      <View style={styles.DataContainer}>
        <Text style={styles.title}>{number}</Text>
        <Text style={styles.title}>{Title}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  DataContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginRight: 10,
  },
  StatContainer: {
    height: 60,
    backgroundColor: "#348578",
    borderRadius: 7,
    shadowColor: "#000",
    elevation: 1.5,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Tajawal-Medium",
  },
});
