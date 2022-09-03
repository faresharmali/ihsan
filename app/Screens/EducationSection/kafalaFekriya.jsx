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
import EducationMemberContainer from "../../Components/EducationMemberContainer";
import { useDispatch } from "react-redux";
import EducationSectionBottomBar from "../../Navigation/EducationSectionBottomBar";
import {GetEducationGroupes} from "../../api/activities"
LogBox.ignoreAllLogs();
export default function KafalaFekriya({ navigation, drawer }) {
  const [active, setActive] = useState(4);
  const [PatientList, setPatientList] = useState([]);
  const [DisplayedPatientList, setDisplayedPatientList] = useState([]);
  const [filtered, setFiltered] = useState("all");
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "نجحت العملية",
      text2: " تمت اضافة المتمدرس بنجاح  👋",
    });
  };
  let EducationMembers = useSelector((state) => state.EducationMembers);
  useEffect(() => {
    setPatientList(EducationMembers);
    filtered == "all"
      ? setDisplayedPatientList(EducationMembers)
      : setDisplayedPatientList(EducationMembers.filter((p) => p.groupe == filtered));
  }, [EducationMembers]);

  const dispatch = useDispatch();
  const updateState = (data) => {
    return {
      type: "updateEducationMembers",
      data: data,
    };
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const res = await GetEducationGroupes();
      dispatch(
        updateState(
        res.data.result
        )
      );
    });

    return unsubscribe;
  }, [navigation]);
  const filterInformations = (groupe) => {
    console.log(groupe)
    if (groupe == "all") {
      setDisplayedPatientList(PatientList);
    } else {
      setDisplayedPatientList(PatientList.filter((p) => p.groupe.trim() == groupe.trim()));
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
          <Text style={styles.ScreenEntityTitle}> الكفالة الفكرية</Text>
          <MaterialCommunityIcons name="account-group" size={30} color="#fff" />
        </View>
      </View>
      <View style={styles.Section}>
        <View style={styles.containerFilter}>
          <TouchableWithoutFeedback
            onPress={() => {
              filterInformations(" المجموعة 1");
              setFiltered(" المجموعة 1");
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
                المجموعة 1
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              filterInformations(" المجموعة 2");
              setFiltered(" المجموعة 2");
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
                المجموعة 2
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              filterInformations(" المجموعة 3");
              setFiltered(" المجموعة 3");
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
                المجموعة 3{" "}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              filterInformations("all");
              setFiltered("all");
              setActive(4);
            }}
          >
            <View
              style={{
                ...styles.filterItem,
                backgroundColor: active == 4 ? "#348578" : "#fff",
              }}
            >
              <Text
                style={{
                  ...styles.filterText,
                  color: active == 4 ? "#fff" : "#000",
                }}
              >
                الكل{" "}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.Content}>
            {DisplayedPatientList.map((E)=>(
                    <EducationMemberContainer data={E} />
            ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddEducationMember", { showToast })
          }
          style={{ ...styles.fab, ...styles.filter }}
        >
          <Icon as={Entypo} name="plus" size={8} color="#fff" />
        </TouchableOpacity>
      </View>
      <Toast config={toastConfig} />
      <EducationSectionBottomBar navigation={navigation} />
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
    right: 20,
  },
});
