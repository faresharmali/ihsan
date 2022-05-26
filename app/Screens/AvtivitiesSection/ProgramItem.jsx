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
  export default function ProgramItem(props) {
    return (
      <TouchableOpacity  style={styles.DataContainer}>

        <View style={styles.infos}>
          <Text style={styles.UserPersonal}>
              برنامج عنصر
          </Text>
          <View style={styles.secondaryInfos}>
  
        
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
  