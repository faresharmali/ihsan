import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "native-base";
import { MaterialIcons, FontAwesome5, FontAwesome,MaterialCommunityIcons } from "@expo/vector-icons";
export default function HassalaContainer({data,navigation}) {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("HassalaInfos",{data})} style={styles.DataContainer}>
      <MaterialCommunityIcons
        style={{ marginLeft: 10 }}
        name="piggy-bank"
        size={25}
        color="#348578"
      />

      <View style={styles.infos}>
        <Text style={styles.UserPersonal}>
          {data.name}
        </Text>
        <View style={styles.secondaryInfos}>
          <>
            <Icon
              as={FontAwesome}
              name="calendar"
              size={4}
              color="#348578"
              style={{ marginLeft: 5 }}
            />
            <Text>

              {new Date(data.date).getFullYear() +
                "/" +
                (new Date(data.date).getMonth() + 1) +
                "/" +
                new Date(data.date).getDate()}
            </Text>
          </>
          <Icon
            style={{ marginRight: 10 }}
            as={MaterialIcons}
            name="attach-money"
            size={4}
            color="#348578"
          />
          <Text>{data.amount} دج</Text>
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
