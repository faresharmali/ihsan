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
export default function InformationSectionBottomBar({filterData}) {
  return (
    <View style={styles.Container}>
      <View style={{...styles.BottomBar}}>
        <View style={{...styles.itemContainer,flexDirection:"row-reverse"}}>
          <TouchableOpacity
            onPress={() => filterData("all")}
          >
            <View style={styles.bottomBarITem}>
              <Icon
                as={MaterialCommunityIcons}
                name="account-group"
                color={"#fff"}
                size={4}
              />

              <Text style={styles.bottomBarITemText}> جميع المعلومات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => filterData("information")}
          >
            <View style={styles.bottomBarITem}>
              <Icon
                as={MaterialCommunityIcons}
                name="account-group"
                color={"#fff"}
                size={4}
              />

              <Text style={styles.bottomBarITemText}>معلومات عامة</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => filterData("demand")}
          >
            <View style={styles.bottomBarITem}>
              <Icon
                as={MaterialIcons}
                name="family-restroom"
                color={"#fff"}
                size={4}
              />

              <Text style={styles.bottomBarITemText}>الطلبات</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => filterData("benefit")}
          >
            <View style={styles.bottomBarITem}>
              <Icon
                as={FontAwesome5}
                name="hand-holding-heart"
                color={"#fff"}
                size={4}
              />

              <Text style={styles.bottomBarITemText}>الاستفادات</Text>
            </View>
         </TouchableOpacity>
          <TouchableOpacity
            onPress={() => filterData("suggestion")}
          >
            <View style={styles.bottomBarITem}>
              <Icon
                as={FontAwesome5}
                name="hand-holding-heart"
                color={"#fff"}
                size={4}
              />

              <Text style={styles.bottomBarITemText}>مقترحات</Text>
            </View>
         </TouchableOpacity>
         
        </View>
      </View>
    </View>
  );
}

