import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "native-base";
import { MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import toastConfig from "../../Components/ToastConfiguration";
import { useSelector } from "react-redux";
import { getReservations } from "../../api/user";
import { useDispatch } from "react-redux";
import BottomBar from "../../Navigation/BottomBar";
export default function Bureau({ navigation, drawer }) {
  const [active, setActive] = useState(6);
  const [MeetingList, setMeetingList] = useState([]);
  const [AllMeetingList, setAllMeetingList] = useState([]);

  let Meetings = useSelector((state) => state.Meetings);
  useEffect(() => {
    setMeetingList(Meetings);
    setAllMeetingList(Meetings);
    console.log("meets", Meetings);
  }, [Meetings]);

  const dispatch = useDispatch();
  const updateState = (data) => {
    return {
      type: "updateMeetList",
      data: data,
    };
  };
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "نجحت العملية",
      text2: " تمت اضافة الحجز بنجاح  👋",
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const res = await getReservations();
      setActive(6);
      dispatch(
        updateState(
          res.data.meetings
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .filter(
              (me) => new Date(me.date) >= new Date().setHours(0, 0, 0, 0)
            )
        )
      );
    });

    return unsubscribe;
  }, [navigation]);

  const Meet = ({ item }) => {
    return (
      <View style={{ marginRight: 10, marginTop: 10 }}>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: "#fff",
            elevation: 1,
            borderRadius: 5,
          }}
        >
          <View style={styles.TimeContainer}>
            <Text style={styles.time}>{item.DateString}</Text>
            <Text style={styles.time}>
              من :{" "}
              {JSON.parse(item.time).start.hours +
                ":" +
                JSON.parse(item.time).start.minutes}
            </Text>
            <Text style={styles.time}>
              الى :{" "}
              {JSON.parse(item.time).end.hours +
                ":" +
                JSON.parse(item.time).end.minutes}
            </Text>
          </View>
          <Text style={styles.ItemDetails}>{item.description}</Text>
        </View>
      </View>
    );
  };
  const filterInformations = (filter) => {
    if (filter == "all") {
      setMeetingList(AllMeetingList);
    } else if (filter == "day") {
      setMeetingList(
        AllMeetingList.filter(
          (meet) =>
            new Date(meet.date).setHours(0, 0, 0, 0) ==
            new Date().setHours(0, 0, 0, 0)
        )
      );
    } else if (filter == "week") {
      let date = new Date();
      let MaxDate = new Date();
      MaxDate.setDate(MaxDate.getDate() + 5);
      setMeetingList(
        AllMeetingList.filter(
          (meet) =>
            new Date(meet.date).setHours(0, 0, 0, 0) >=
              date.setHours(0, 0, 0, 0) &&
            new Date(meet.date).setHours(0, 0, 0, 0) <=
              MaxDate.setHours(0, 0, 0, 0)
        )
      );
    } else {
      let date = new Date();
      let MaxDate = new Date();
      MaxDate.setDate(MaxDate.getDate() + 30);
      setMeetingList(
        AllMeetingList.filter(
          (meet) =>
            new Date(meet.date).setHours(0, 0, 0, 0) >=
              date.setHours(0, 0, 0, 0) &&
            new Date(meet.date).setHours(0, 0, 0, 0) <=
              MaxDate.setHours(0, 0, 0, 0)
        )
      );
    }
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
      <View style={styles.containerFilter}>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("day");
            setActive(1);
          }}
        >
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 1 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 1 ? "#fff" : "#000",
              }}
            >
              اليوم
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("week");
            setActive(2);
          }}
        >
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 2 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 2 ? "#fff" : "#000",
              }}
            >
              الأسبوع{" "}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("month");
            setActive(3);
          }}
        >
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 3 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 3 ? "#fff" : "#000",
              }}
            >
              الشهر{" "}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("all");
            setActive(6);
          }}
        >
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 6 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 6 ? "#fff" : "#000",
              }}
            >
              الكل
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView style={styles.Content}>
          {MeetingList.map((m) => (
            <Meet item={m} />
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddReservation", { showToast })}
        style={styles.fab}
      >
        <Icon as={Entypo} name="plus" size={8} color="#fff" />
      </TouchableOpacity>

      <Toast config={toastConfig} />
      <BottomBar navigation={navigation} />
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

  contentContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f5f5f5",
    paddingBottom: 30,
    position: "relative",
  },
  Content: {
    width: "100%",
    maxHeight: "78%",
    backgroundColor: "#f5f5f5",
    paddingBottom: 200,
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
    alignItems: "flex-end",
    marginLeft: 20,
    backgroundColor: "#348578",
    width: "23%",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  time: {
    fontFamily: "Tajawal-Medium",
    color: "#fff",
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
    left: 20,
  },

  containerFilter: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: "#f5f5f5",
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingTop: 20,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  filterItem: {
    padding: 6,
    backgroundColor: "#fff",
    borderRadius: 5,
    minWidth: 85,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 3,
  },
  filterText: {
    fontFamily: "Tajawal-Medium",
  },
});
