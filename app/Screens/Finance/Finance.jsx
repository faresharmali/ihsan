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
  Ionicons,
} from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTransactions,getHassalat } from "../../api/Finance";
import FinanceSectionBottomBar from "../../Navigation/FinanceSectionBottomBar";
import TransactionStat from "../../Components/statistics components/TransactionStat";
export default function Finance({ navigation }) {
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
  const [Income, setIncome] = useState(0);
  const [Outcome, setOut] = useState(0);
  const [Difference, setDifference] = useState(0);
  const [Hassalat, setHassalat] = useState(0);

  const dispatch = useDispatch();

  const updateState = (data) => {
    return {
      type: "UpdateTransactions",
      data: data,
    };
  };
  useEffect(async () => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const res = await getTransactions();
      dispatch(updateState(res.data.result));
      let outcomes = res.data.result.filter((t) => !t.income);
      let outComesCount = 0;
      outcomes.forEach((outcome) => {
        outComesCount += outcome.amount;
      });
      let incomes = res.data.result.filter((t) => t.income);
      let inComesCount = 0;
      incomes.forEach((income) => {
        inComesCount += income.amount;
      });
      setIncome(inComesCount);
      setOut(outComesCount);
      setDifference(inComesCount - outComesCount);
      const res2 = await getHassalat();
      setHassalat(res2.data.result.length);
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
          <Text style={styles.ScreenEntityTitle}>قسم المالية </Text>
        </View>
        <FontAwesome name="bar-chart" size={30} color="#fff" />
      </View>

      <ScrollView contentContainerStyle={styles.Content}>
        <View style={styles.Section}>
          <View style={styles.dateContainer}>
            <Text style={styles.sectionTitle}>{DateString} </Text>
            <Icon as={Ionicons} name="md-calendar" size={8} color="#348578" />
          </View>
          <View style={styles.StatContainer}>
            <TransactionStat
              number={Income}
              Title={"المداخيل"}
              IconName={"bank-transfer-in"}
              IconType={MaterialCommunityIcons}
              iconSize={30}
              fullSize={false}
            />
            <TransactionStat
              number={Outcome}
              Title={" المصاريف"}
              IconName={"bank-transfer-out"}
              IconType={MaterialCommunityIcons}
              iconSize={30}
              fullSize={false}
            />
          </View>
          <View style={styles.StatContainer}>
            <TransactionStat
              number={Difference}
              Title={"الفرق"}
              IconName={"bank-transfer-in"}
              IconType={MaterialCommunityIcons}
              iconSize={30}
              fullSize={true}
            />
          </View>
          <View style={styles.StatContainer}>
            <TransactionStat
              number={Hassalat}
              Title={"عدد الحصالات"}
              IconName={"piggy-bank"}
              IconType={MaterialCommunityIcons}
              iconSize={30}
              fullSize={true}
            />
          </View>
        </View>
      </ScrollView>
      <FinanceSectionBottomBar navigation={navigation} />
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
    fontSize: 19,
    fontFamily: "Tajawal-Medium",
    textAlign: "center",
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
