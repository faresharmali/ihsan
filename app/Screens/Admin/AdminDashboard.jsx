import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "native-base";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import NumberStat from "../../Components/statistics components/NumberStat";
import { useEffect } from "react";
import { getUsers, getDonators } from "../../api/user";
import { getFamilies } from "../../api/family";
import { getInformations } from "../../api/informations";
import { useSelector } from "react-redux";
import { GetEducationGroupes } from "../../api/activities";
export default function AdminDashboard({ navigation }) {
  let LoggedUser = useSelector((state) => state.Auth);

  const [usersCount, setUsersNumber] = useState(0);
  const [KofalNumber, seKofalNumber] = useState(0);
  const [FamilyNumber, seFamilyNumber] = useState(0);
  const [KafalaFikriya, setKafalaFikriya] = useState(0);
  const [Education, setEducation] = useState(0);
  const [orphans, setOrphans] = useState(0);
  const [Kafala, setKafala] = useState(0);
  const [Mohsins, setMohsins] = useState(0);
  const [KafelKids, setKafelKids] = useState(0);
  const [DonationFamilyNumber, setDonationFamilyNumber] = useState(0);
  var date = new Date();
  var months = [
    "جانفي",
    "فبراير",
    "مارس",
    "إبريل",
    "ماي",
    "جوان",
    "جويلية",
    "أوت",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  var days = [
    "اﻷحد",
    "اﻷثنين",
    "الثلاثاء",
    "اﻷربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  var DateString =
    days[date.getDay()] +
    " , " +
    date.getDate() +
    " " +
    months[date.getMonth()] +
    " , " +
    date.getFullYear();
  const dispatch = useDispatch();

  const updateState = (action, data) => {
    return {
      type: action,
      data: data,
    };
  };
  useEffect(async () => {
    const unsubscribe = navigation.addListener("focus", async () => {
      let res = await getUsers();
      dispatch(
        updateState(
          "updateUserList",
          res.data.result.map((user) => ({
            0: user.name,
            1: user.phone,
            2: user.job,
            ...user,
          }))
        )
      );
      setUsersNumber(res.data.result.length);
      res = await getDonators();
      dispatch(
        updateState(
          "updateDonatorsList",
          res.data.result.map((user) => ({
            0: user.name,
            1: user.phone,
            2: user.job,
            ...user,
          }))
        )
      );
      let kafalaAmount = 0;
      seKofalNumber(res.data.result.filter((k) => k.type == "kafel").length);
      setMohsins(res.data.result.filter((k) => k.type != "kafel").length);
      let donatedKids = [];

      res.data.result
        .filter((k) => k.type == "kafel")
        .forEach((k) => {
          donatedKids = [...donatedKids, ...k.orphans];
          kafalaAmount += k.donationAmount;
        });
      let kids = donatedKids.map((k) => k.id);
      setKafala(kafalaAmount);

      res = await getFamilies();
      dispatch(updateState("updateFamiliesList", res.data.result));
      setDonationFamilyNumber(
        res.data.result.filter((f) => f.donation > 0).length
      );
      let SoutientEduc = 0;
      let orphans = 0;
      let DoneKids = 0;
      res.data.result.forEach((f) => {
        f.kids.forEach((k) => {
          orphans++;
          if (k.Education) SoutientEduc++;
          if (kids.includes(k.id)) DoneKids++;
        });
      });
      setKafelKids(DoneKids)
      setEducation(SoutientEduc);
      setOrphans(orphans);
      seFamilyNumber(res.data.result.length);

      res = await getInformations(LoggedUser.token);
      dispatch(
        updateState(
          "UpdateInformations",
          res.data.result.map((information) => ({
            0: information.title,
            1: information.section,
            ...information,
          }))
        )
      );
      res = await GetEducationGroupes();
      setKafalaFikriya(res.data.result.length);
      dispatch(updateState("updateEducationMembers", res.data.result));
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.ScreenEntity}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuContainer}
        >
          <Icon as={Entypo} name="menu" size={8} color="#fff" />
        </TouchableOpacity>
        <View style={styles.containerTitle}>
          <Text style={styles.ScreenEntityTitle}>{DateString} </Text>
        </View>
        <MaterialCommunityIcons name="home" size={30} color="#fff" />
      </View>

      <ScrollView contentContainerStyle={styles.Content}>
        <View style={styles.Section}>
          <Text style={styles.sectionTitle}> الجمعية :</Text>
          <View style={styles.StatContainer}>
            <NumberStat
              number={usersCount}
              Title={" الأعضاء "}
              IconName={"group"}
              IconType={FontAwesome}
            />
            <NumberStat
              number={Mohsins}
              Title={" المحسنين"}
              IconName={"charity"}
              IconType={MaterialCommunityIcons}
            />
          </View>
          <View style={styles.StatContainer}>
            <NumberStat
              number={KofalNumber}
              Title={" الكفال "}
              IconName={"charity"}
              IconType={MaterialCommunityIcons}
            />
            <NumberStat
              number={Kafala}
              Title={" مبلغ الكفالة الاجمالي"}
              IconName={"donate"}
              IconType={FontAwesome5}
            />
          </View>
        </View>
        <View style={styles.Section}>
          <Text style={styles.sectionTitle}> قسم الكفالة :</Text>

          <View style={styles.StatContainer}>
            <NumberStat
              number={orphans}
              Title={" الأيتام المسجلين"}
              IconName={"child"}
              IconType={FontAwesome}
            />
            <NumberStat
              number={KafelKids}
              Title={" الأيتام المكفولين"}
              IconName={"child"}
              IconType={FontAwesome}
            />
          </View>
          <View style={styles.StatContainer}>
            <NumberStat
              number={FamilyNumber}
              Title={" الأسر المسجلة"}
              IconName={"family-restroom"}
              IconType={MaterialIcons}
            />
            <NumberStat
              number={DonationFamilyNumber}
              Title={" الأسر المكفولة"}
              IconName={"family-restroom"}
              IconType={MaterialIcons}
            />
          </View>
        </View>

        <View style={styles.Section}>
          <Text style={styles.sectionTitle}> قسم التعليم :</Text>

          <View style={styles.StatContainer}>
            <NumberStat
              number={Education}
              Title={"دروس الدعم"}
              IconName={"school"}
              IconType={Ionicons}
            />
            <NumberStat
              number={KafalaFikriya}
              Title={"الكفالة الفكرية"}
              IconName={"school"}
              IconType={Ionicons}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    zIndex: 10,
    backgroundColor: "#348578",
  },
  containerTitle: {
    flexDirection: "row",
  },
  ScreenEntity: {
    flexDirection: "row",
    width: "100%",
    marginTop: "15%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 0,
  },
  ScreenEntityTitle: {
    color: "#fff",
    fontSize: 18,
    marginRight: 10,
    fontFamily: "Tajawal-Medium",
  },

  Content: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    minHeight: "90%",
  },
  menuContainer: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: "#348578",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  StatContainer: {
    flexDirection: "row-reverse",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 20,
  },
  Section: {
    width: "100%",
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Tajawal-Medium",
    textAlign: "center",
  },
});
