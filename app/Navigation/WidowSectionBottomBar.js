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

export default function WidowSectionBottomBar(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <View style={styles.BottomBar}>
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Members")}>
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
          <TouchableOpacity onPress={() => navigation.navigate("Widows")}>
            <View style={styles.bottomBarITem}>
              <Icon
                as={MaterialIcons}
                name="family-restroom"
                color={"#fff"}
                size={4}
              />

              <Text style={styles.bottomBarITemText}>الأرامل</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("WidowsDonators")}
          >
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
          <TouchableOpacity onPress={() => navigation.navigate("Bureau")}>
            <View style={styles.bottomBarITem}>
              <Icon as={FontAwesome} name="building" color={"#ffff"} size={4} />

              <Text style={styles.bottomBarITemText}>المقر</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Reports")}>
            <View style={styles.bottomBarITem}>
              <Icon as={FontAwesome5} name="child" color={"#fff"} size={4} />

              <Text style={styles.bottomBarITemText}>التقارير</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Orphans")}>
            <View style={styles.bottomBarITem}>
              <Icon as={FontAwesome5} name="child" color={"#fff"} size={4} />

              <Text style={styles.bottomBarITemText}>المالية</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
