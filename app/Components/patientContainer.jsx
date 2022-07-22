import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Icon } from "native-base";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
export default function PatientContainer(props) {
  return (
    <TouchableOpacity onPress={props.openFamily} style={styles.DataContainer}>
      <Icon as={MaterialIcons} name="sick" size={28} color="#348578" />

      <View style={styles.infos}>
        <Text style={styles.UserPersonal}>{props.data.name} </Text>
        <View style={styles.secondaryInfos}>
          <>
            <Icon
              as={MaterialIcons}
              style={{ marginLeft: 5 }}
              name="phone"
              size={4}
              color="#000"
            />
            <Text> {props.data.number}</Text>
          </>

          <Icon
            style={{ marginRight: 10, marginLeft: 5 }}
            as={Entypo}
            name="clock"
            size={4}
            color="#000"
          />
          <Text>{props.data.address}</Text>
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
