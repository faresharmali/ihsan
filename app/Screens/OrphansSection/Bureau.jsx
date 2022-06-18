import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "native-base";
import { MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";
import { LocaleConfig, Agenda } from "react-native-calendars";
import Toast from "react-native-toast-message";
import toastConfig from "../../Components/ToastConfiguration";
import { useSelector } from "react-redux";
import { getReservations } from "../../api/user";
import { useDispatch } from "react-redux";
export default function Bureau({ navigation, drawer }) {
  const [date, setDate] = useState("2022-04-12");

  LocaleConfig.locales["ar"] = {
    monthNames: [
      "يناير",
      "فبراير",
      "مارس",
      "إبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    monthNamesShort: [
      "يناير",
      "فبراير",
      "مارس",
      "إبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    dayNames: [
      "اﻷحد",
      "اﻷثنين",
      "الثلاثاء",
      "اﻷربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ],
    dayNamesShort: [
      "اﻷحد",
      "اﻷثنين",
      "الثلاثاء",
      "اﻷربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ],
    today: "اليوم",
  };
  LocaleConfig.defaultLocale = "ar";
  let Meetings = useSelector((state) => state.Meetings);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "نجحت العملية",
      text2: " تمت اضافة المعلومة بنجاح  👋",
    });
  };
  const updateState = (data) => {
    return {
      type: "setMeetings",
      data: data,
    };
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const res = await getReservations();
      dispatch(updateState(res.data.result));
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = (item) => {
    return (
      <View style={{ marginRight: 10, marginTop: 30 }}>
        <View
          style={{
            padding: 7,
            flexDirection: "row-reverse",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "#fff",
            elevation: 1,
            borderRadius: 5,
          }}
        >
          <Icon
            marginLeft={2}
            as={Entypo}
            name="clock"
            size={5}
            color="#348578"
          />
          <View style={styles.TimeContainer}>
            <Text style={styles.StartTime}> {item.starttime}</Text>
            <Text style={styles.EndTime}>{item.endtime}</Text>
          </View>
          <Text style={styles.ItemDetails}>{item.description}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.ScreenEntity}>
        <TouchableOpacity
          onPress={() => drawer.openDrawer()}
          style={styles.menuContainer}
        >
          <Icon as={Entypo} name="menu" size={8} color="#fff" />
        </TouchableOpacity>

        <View style={styles.containerTitle}>
          <Text style={styles.ScreenEntityTitle}>المقر </Text>
          <MaterialCommunityIcons
            name="office-building"
            size={30}
            color="#fff"
          />
        </View>
      </View>
      <View style={styles.Content}>
        <Agenda
          renderItem={renderItem}
          items={Meetings}
          refreshing={false}
          selected={"2022-04-16"}
          hideExtraDays={false}
          theme={{
            calendarBackground: "#f5f5f5",
            textSectionTitleColor: "#000",
            selectedDayBackgroundColor: "#348578",
            selectedDayTextColor: "#fff",
            todayTextColor: "#000",
            dayTextColor: "#000",
            dotColor: "#000",
            selectedDotColor: "#ffffff",
            textDayFontSize: 14,
            textDayHeaderFontSize: 10,
            textDayHeaderFontWeight: "bold",
            agendaKnobColor: "#348578",
          }}
          style={{
            width: "100%",
            borderRadius: 15,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddReservation", { showToast })}
        style={styles.fab}
      >
        <Icon as={Entypo} name="plus" size={8} color="#fff" />
      </TouchableOpacity>
      <Toast config={toastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#348578",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 10,
  },
  containerTitle: {
    flexDirection: "row",
  },

  ScreenEntity: {
    flexDirection: "row",
    width: "100%",
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  ScreenEntityTitle: {
    color: "#fff",
    fontSize: 25,
    marginRight: 10,
    fontFamily: "Tajawal-Medium",
  },

  Content: {
    width: "100%",
    height: "87%",
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
  ItemTime: {
    fontFamily: "Tajawal-Medium",
  },
  ItemDetails: {
    fontFamily: "Tajawal-Medium",
  },
  TimeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  StartTime: {
    fontFamily: "Tajawal-Medium",
  },
  EndTime: {
    fontFamily: "Tajawal-Medium",
  },
  fab: {
    width: 50,
    height: 50,
    backgroundColor: "#348578",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    elevation: 5,
    position: "absolute",
    bottom: 65,
    right: 10,
  },
});
