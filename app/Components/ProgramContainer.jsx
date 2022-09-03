import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import img from "../../assets/icons/information.png";
import { Icon } from "native-base";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
export default function ProgramContainer(props) {
  return (
    <TouchableOpacity onLongPress={()=>props.select(props.program.id)} style={styles.DataContainer}>
      <Image
        source={img}
        style={{ width: 30, height: 30, marginLeft: 5, marginRight: 5 }}
      />
      <View style={styles.infos}>
        <Text style={styles.UserPersonal}>{props.program.title} </Text>
        <View style={styles.secondaryInfos}>
          <>
            <Icon
              style={{ marginRight: 10, marginLeft: 5 }}
              as={Entypo}
              name="clock"
              size={4}
              color="#000"
            />
            <Text>
              {new Date(props.program.date).getFullYear() +
                "/" +
                (new Date(props.program.date).getMonth() + 1) +
                "/" +
                new Date(props.program.date).getDate()}
            </Text>
          </>
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
