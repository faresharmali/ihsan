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
import HealthSectionBottomBar from "../../Navigation/HealthSectionBottomBar";
import { Icon } from "native-base";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import DataContainer from "../../Components/DataContainer";
import { useSelector } from "react-redux";
import { LogBox } from "react-native";
import Toast from "react-native-toast-message";
import toastConfig from "../../Components/ToastConfiguration";
import PatientContainer from "../../Components/patientContainer";
import { useDispatch } from "react-redux";
import { getUsers } from "../../api/user";
LogBox.ignoreAllLogs();
export default function Patients({ navigation, drawer }) {
  const [active, setActive] = useState(3);
  const [PatientList, setPatientList] = useState([]);
  const [DisplayedPatientList, setDisplayedPatientList] = useState([]);
  const [filtered, setFiltered] = useState("all");

  const openModal = (u) => {
    navigation.navigate("MemberProfile", {
      ...u,
    });
  };
  let Families = useSelector((state) => state.Families);

  useEffect(() => {
    let kids = [];
    Families.forEach((f) => {
      f.kids.forEach((k) => {
        kids.push({
          name: k.name + " " + f.fatherLastName,
          number: f.phone,
          address: f.adresse,
          type: "kid",
        });
      });
    });
    let moms = Families.map((f) => ({
      name: f.motherFullName,
      number: f.phone,
      address: f.adresse,
      type: "mom",
    }));
    let List = [...moms, ...kids];
    setPatientList(List);
    filtered == "all"
      ? setDisplayedPatientList(List)
      : setDisplayedPatientList(PatientList.filter((p) => p.type == filtered));
  }, [Families]);

  const dispatch = useDispatch();
  const updateState = (data) => {
    return {
      type: "updateUserList",
      data: data,
    };
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const res = await getUsers();
      dispatch(
        updateState(
          res.data.result.map((user) => ({
            0: user.name,
            1: user.phone,
            2: user.job,
            ...user,
          }))
        )
      );
    });

    return unsubscribe;
  }, [navigation]);
  const filterInformations = (type) => {
    if (type == "all") {
      setDisplayedPatientList(PatientList);
    } else {
      setDisplayedPatientList(PatientList.filter((p) => p.type == type));
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
          <Text style={styles.ScreenEntityTitle}> المرضى : قسم الصحة </Text>
          <MaterialCommunityIcons name="account-group" size={30} color="#fff" />
        </View>
      </View>
      <View style={styles.Section}>
        <View style={styles.containerFilter}>
          <TouchableWithoutFeedback
            onPress={() => {
              filterInformations("kid");
              setFiltered("kid");
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
                الأطفال
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              filterInformations("mom");
              setFiltered("mom");
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
                الأرامل{" "}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              filterInformations("all");
              setFiltered("all");
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
                الكل{" "}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.Content}>
          {DisplayedPatientList.map((p) => (
            <PatientContainer data={p} />
          ))}
        </ScrollView>
      </View>
      <Toast config={toastConfig} />
      <HealthSectionBottomBar navigation={navigation} />
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
    fontSize: 20,
    marginRight: 10,
    fontFamily: "Tajawal-Medium",
  },

  Content: {
    width: "100%",
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
  Section: {
    width: "100%",
    flex: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
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
