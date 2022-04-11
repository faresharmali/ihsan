import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Man from "../../assets/avatars/man2.png";
import React, { useState } from "react";
import { Icon } from "native-base";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import edit from "../../assets/icons/edit.png";
import lock from "../../assets/icons/password-code.png";
import customer from "../../assets/icons/support.png";
import arrow from "../../assets/icons/left-arrow.png";
import logout from "../../assets/icons/log-out.png";
export default function UserProfile({ navigation, drawer }) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.ProfileContainer}>
        <View style={styles.backButton}>
          <Text style={styles.BackText}>العودة</Text>
          <TouchableOpacity style={styles.circle}>
          <Image style={styles.arrow2} source={arrow} />

          </TouchableOpacity>
        </View>
        <Image source={Man} style={styles.profilePic} />
        <Text style={styles.userName}>حرمالي فارس</Text>
        <Text style={styles.occupation}>رئيس قسم المالية</Text>

        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.section}>
            <View style={styles.sectionTitle}>
              <Image style={styles.sectionIcon} source={edit} />
              <Text style={styles.sectionText}>تعديل المعلومات الشخصية</Text>
            </View>

            <Image style={styles.arrow} source={arrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.section}>
            <View style={styles.sectionTitle}>
              <Image style={styles.sectionIcon} source={lock} />
              <Text style={styles.sectionText}>تغيير كلمة المرور</Text>
            </View>
            <Image style={styles.arrow} source={arrow} />
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.section, borderBottomWidth: 0 }}>
            <View style={styles.sectionTitle}>
              <Image style={styles.sectionIcon} source={customer} />
              <Text style={styles.sectionText}>التبليغ عن مشكلة</Text>
            </View>
            <Image style={styles.arrow} source={arrow} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.Logout}>
          <Image style={styles.LogoutIcon} source={logout} />

          <Text style={styles.sectionText}>تسجيل الخروج</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    zIndex: 10,
    backgroundColor: "#E9ECF4",
  },
  ProfileContainer: {
    marginTop: "15%",
    height: "95%",
    width: "100%",
    backgroundColor: "#F6F8FA",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    padding: 10,
    elevation: 5,
    paddingTop:30
  },
  backButton: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    alignContent: "center",
    width: "100%",
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    width: 100,
    height: 100,
  },
  userName: {
    fontSize: 25,
    fontFamily: "Tajawal-Medium",
  },
  BackText: {
    fontSize: 15,
    marginLeft: 10,
    marginTop:5,
    fontFamily: "Tajawal-Medium",
  },
  occupation: {
    fontSize: 15,
    fontFamily: "Tajawal-Medium",
  },
  sectionContainer: {
    width: "90%",
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 15,
    elevation: 2,
  },
  Logout: {
      flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
    width: "65%",
    height: 60,
    backgroundColor: "#fff",
    marginTop: 50,
    borderRadius: 15,
    elevation: 2,
  },
  sectionIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  arrow: {
    width: 20,
    height: 20,
  },
  arrow2: {
    width: 15,
    height: 15,
  },
  LogoutIcon: {
    width: 20,
    height: 20,
  },
  sectionText: {
    fontSize: 15,
    fontFamily: "Tajawal-Medium",
    marginLeft:10
  },
  section: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
  },
  sectionTitle: {
    flexDirection: "row-reverse",
  },
});
