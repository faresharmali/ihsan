import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import BottomBar from "../../../Navigation/BottomBar";
import { FontAwesome5, Entypo, AntDesign } from "@expo/vector-icons";
import Family from "../../../../assets/icons/user.png";
import { Input, Icon } from "native-base";
import { useSelector } from "react-redux";
import toastConfig from "../../../Components/ToastConfiguration";
import Toast from "react-native-toast-message";
import DataContainer from "../../../Components/DataContainer";
import { getDonators } from "../../../api/user";
import { useDispatch } from "react-redux";
import { PrintData } from "../../../Components/Print";
export default function Kofal({ navigation, drawer }) {
  const dispatch = useDispatch();

  const [AllDonatorList, setAllDonatorList] = useState([]);
  const [DonatorList, setDonatorList] = useState([]);
  const [active, setActive] = useState(1);
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "نجحت العملية",
      text2: " تمت اضافة المحسن بنجاح  👋",
    });
  };
  const openModal = (data) => {
    navigation.navigate("KafelProfile", data);
  };
  let Donators = useSelector((state) => state.Donators);
  useEffect(() => {
    setDonatorList(Donators);
    setAllDonatorList(Donators);
  }, [Donators]);
  const updateState = (data) => {
    return {
      type: "updateDonatorsList",
      data: data,
    };
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const res = await getDonators();
      dispatch(
        updateState(
          res.data.result.map((user) => ({
            0: user.name,
            1: user.phone,
            2: user.job,
            ...user

          }))
        )
      );
    });

    return unsubscribe;
  }, [navigation]);

  const filterInformations = (type) => {
    if (type == "all") {
      setDonatorList(AllDonatorList);
    } else {
      setDonatorList(AllDonatorList.filter((info) => info.type == type));
    }
  };
  
  const print = async () => {
    let headings = [
     
      " مبلغ الكفالة",
      "الدور",
      " رقم الهاتف",
      " الكافل",

    ]
    PrintData("قائمة الكفال و المحسنين", headings, DonatorList.map((t) => (
      {
      donation: t.donationAmount,job: t.job,phone: t.phone, name: t.name
      })))

  }

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
          <Text style={styles.ScreenEntityTitle}>الكفال و المحسنين </Text>
          <FontAwesome5 name="hand-holding-heart" size={25} color="#fff" />
          <TouchableOpacity
            onPress={() => print()}
            style={styles.menuContainer}
          >
            <Icon as={AntDesign} name="printer" size={8} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerFilter}>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("kafel");
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
              الكفال
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("Mohsin");
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
              المحسنين{" "}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("all");
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
              الكل{" "}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.Section}>
        <ScrollView style={styles.Content}>
          {DonatorList.map((f) => (
            <DataContainer
              key={f.name}
              AvatarSize={22}
              data={f}
              pic={Family}
              openFamily={() => openModal(f)}
            />
          ))}
        </ScrollView>
      </View>
      <Toast config={toastConfig} />
      <TouchableOpacity
        onPress={() => navigation.navigate("AddDonator", { showToast })}
        style={styles.fab}
      >
        <Icon as={Entypo} name="plus" size={8} color="#fff" />
      </TouchableOpacity>
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
  containerFilter: {
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
  },
  filterItem: {
    padding: 6,
    backgroundColor: "#fff",
    borderRadius: 5,
    minWidth: 55,
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
    fontSize: 20,
    marginRight: 10,
    fontFamily: "Tajawal-Medium",
  },

  Section: {
    width: "100%",
    height: "90%",
    backgroundColor: "#f5f5f5",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    display: "flex",
    alignItems: "center",
  },
  Content: {
    width: "100%",
    maxHeight: "78%",
    backgroundColor: "#f5f5f5",
    display: "flex",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
  containerFilter: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: "#f5f5f5",
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingTop: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  filterItem: {
    padding: 6,
    backgroundColor: "#fff",
    borderRadius: 5,
    minWidth: 110,
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
