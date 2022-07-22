import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import React from "react";
import styles from "./styles"

export default function EducationSectionBottomBar(props) {
  return (
    <View style={styles.Container}>
      <View style={styles.BottomBar}>
        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Members")}
          >
            <View style={styles.bottomBarITem}>
              <Icon
                as={MaterialCommunityIcons}
                name="account-group"
                color={"#fff"}
                size={4}
              />

              <Text style={styles.bottomBarITemText}>الأعضاء</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("EducationDonators")}
          >
            <View style={styles.bottomBarITem}>
              <Icon
                as={MaterialIcons}
                name="family-restroom"
                color={"#fff"}
                size={4}
              />

              <Text style={styles.bottomBarITemText}>المحسنين</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("EducationOrphans")}
          >
            <View style={styles.bottomBarITem}>
              <Icon
                as={FontAwesome5}
                name="hand-holding-heart"
                color={"#fff"}
                size={4}
              />

              <Text style={styles.bottomBarITemText}>المستفيدين</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("KafalaFekriya")}>
            <View style={styles.bottomBarITem}>
              <Icon as={FontAwesome} name="building" color={"#ffff"} size={4} />

              <Text style={styles.bottomBarITemText}>الكفالة الفكرية</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

