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
import styles from "./styles";

export default function FinanceSectionBottomBar(props) {
  return (
    <View style={styles.Container}>
      <View style={styles.BottomBar}>
        <View style={styles.itemContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("FinanceMembers")}
          >
            <View style={styles.bottomBarITem}>
              <Icon
                as={MaterialCommunityIcons}
                name="account-group"
                color={"#fff"}
                size={6}
              />

              <Text style={styles.bottomBarITemText}>الأعضاء</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Hassalat")}
          >
            <View style={styles.bottomBarITem}>
              <Icon
                as={MaterialCommunityIcons }
                name="piggy-bank"
                color={"#fff"}
                size={6}
              />

              <Text style={styles.bottomBarITemText}>حصالات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("Income")}>
            <View style={styles.bottomBarITem}>
              <Icon
                as={MaterialCommunityIcons}
                name="bank-transfer-in"
                color={"#fff"}
                size={6}
              />

              <Text style={styles.bottomBarITemText}>المداخيل</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("Outcome")}
          >
            <View style={styles.bottomBarITem}>
              <Icon
                as={MaterialCommunityIcons}
                name="bank-transfer-out"
                color={"#fff"}
                size={6}
              />

              <Text style={styles.bottomBarITemText}>المصاريف</Text>
            </View>
          </TouchableOpacity>
      
        </View>
      </View>
    </View>
  );
}
