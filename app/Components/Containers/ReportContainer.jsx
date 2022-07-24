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
  import { MaterialIcons, Entypo } from "@expo/vector-icons";
  export default function ReportContainer(props) {
    return (
      <TouchableOpacity onPress={props.openFamily} style={styles.DataContainer}>
        <Image
          source={props.pic}
          style={{ width: props.AvatarSize, height: props.AvatarSize }}
        />
        <View style={styles.infos}>
          <Text style={styles.UserPersonal}>{props.data[0]} </Text>
          <View style={styles.secondaryInfos}>
            {props.data[1] && (
              <>
                <Icon as={MaterialIcons} name="phone" size={4} color="#000" />
                <Text> {props.data[1]}</Text>
              </>
            )}
  
            <>
              <Icon
                style={{ marginRight: 10, marginLeft: 5 }}
                as={Entypo}
                name="clock"
                size={4}
                color="#000"
              />
              <Text>{props.data[2].trim() != "" && props.data[2]}</Text>
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
  