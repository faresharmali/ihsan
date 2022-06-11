import { Text, View, TouchableOpacity } from "react-native";
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

export default function OrpahnsSectionBottomBar(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <View style={styles.BottomBar}>
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("OrpahnsMembers")}>
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
          <TouchableOpacity onPress={() => navigation.navigate("OrpahnsFamilies")}>
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

          <TouchableOpacity
            onPress={() => navigation.navigate("OrpahnsDonators")}
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
          <TouchableOpacity onPress={() => navigation.navigate("OrpahnsBureau")}>
            <View style={styles.bottomBarITem}>
              <Icon as={FontAwesome} name="building" color={"#ffff"} size={4} />

              <Text style={styles.bottomBarITemText}>المقر</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("DonationsStatus")}
          >
            <View style={styles.bottomBarITem}>
              <Icon as={FontAwesome5} name="child" color={"#fff"} size={4} />

              <Text style={styles.bottomBarITemText}>الكفالة</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("OrphansList")}>
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
