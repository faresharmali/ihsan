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
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function KofaSectionBottomBar(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <View style={styles.BottomBar}>
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("KofaMembers")}>
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
          <TouchableOpacity onPress={() => navigation.navigate("KofaFamilies")}>
            <View style={styles.bottomBarITem}>
              <Icon
                as={MaterialIcons}
                name="family-restroom"
                color={"#fff"}
                size={4}
              />

              <Text style={styles.bottomBarITemText}>العائلات</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("KofaDonators")}>
            <View style={styles.bottomBarITem}>
              <Icon
                as={FontAwesome5}
                name="hand-holding-heart"
                color={"#fff"}
                size={4}
              />

              <Text style={styles.bottomBarITemText}>المحسنين</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("KofaBureau")}>
            <View style={styles.bottomBarITem}>
              <Icon as={FontAwesome} name="building" color={"#ffff"} size={4} />

              <Text style={styles.bottomBarITemText}>المقر</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Ingredients")}>
            <View style={styles.bottomBarITem}>
              <Icon as={FontAwesome} name="list" color={"#fff"} size={4} />

              <Text style={styles.bottomBarITemText}>المكونات</Text>
            </View>
          </TouchableOpacity>
         
          <TouchableOpacity onPress={() => navigation.navigate("KofaStatus")}>
            <View style={styles.bottomBarITem}>
              <Icon
                as={FontAwesome5}
                name="shopping-bag"
                color={"#fff"}
                size={4}
              />

              <Text style={styles.bottomBarITemText}>الحالة</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
