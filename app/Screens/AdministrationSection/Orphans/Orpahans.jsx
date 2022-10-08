import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  BackHandler
} from "react-native";
import React, { useState, useEffect } from "react";
import BottomBar from "../../../Navigation/BottomBar";
import { Icon } from "native-base";
import { FontAwesome5, Entypo, AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import toastConfig from "../../../Components/ToastConfiguration";
import Toast from "react-native-toast-message";
import Kids from "../Famillies/Kids";
import { useDispatch } from "react-redux";
import { getFamilies } from "../../../api/family";
import { PrintData } from "../../../Components/Print";
import { getAge } from "../../../Components/Print";
import AgeFilterModal from "../../../Components/Containers/FilterOrphansSwipeable";
export default function Orphans({ navigation, drawer }) {
  const [date, setdate] = useState(null);

  const dispatch = useDispatch();
  const [active, setActive] = useState(6);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [kids, setKids] = useState([]);
  const [Displayedkids, setDisplayedkids] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  let MyFamilies = useSelector((state) => state.Families);
  useEffect(() => {
    let kids = [];
    MyFamilies.forEach((f) => {
      f.kids.forEach((k) => {
        kids.push({
          familyId: f.id,
          ...k,
          lastName: f.fatherLastName,
          title: k.name + " " + f.fatherLastName,
        });
      });
    });
    setKids(kids);
    setDisplayedkids(kids);
    setfilteredData(kids);
  }, [MyFamilies]);


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isPanelActive) {
          setIsPanelActive(false);
          return true;
        } else {
          return false;
        }
      }
    );
    return () => backHandler.remove();
  }, [isPanelActive]);

  const viewKid = (kid) => {
    navigation.navigate("KidProfile", { kid, fetchFamillies });
  };


  const updateState = (data) => {
    return {
      type: "updateFamiliesList",
      data: data,
    };
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      fetchFamillies();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchFamillies = async () => {
    const res = await getFamilies();
    dispatch(updateState(res.data.result));
  };

  const print = async () => {
    console.log(Displayedkids)
    let headings = [

      "المستوى الدراسي",
      "العمر",
      "الجنس",
      " اليتيم",

    ]
    PrintData("قائمة اللأيتام ", headings, Displayedkids.map((t) => (
      {
        scolarity: t.scolarity, age: getAge(t.year + "-" + t.month + "-" + t.day), gender: t.gender, name: t.title
      })))

  }

  const filterInformations = (filter) => {
    if (filter == "all") {
      setdate("العمر")
      setDisplayedkids(kids);
      setfilteredData(kids);

    } else if (filter == "age") {
      setIsPanelActive(true)
    } else if (filter == "sick") {
      setfilteredData(filteredData.filter((kid) => kid.sick));
      setDisplayedkids(filteredData.filter((kid) => kid.sick));

    } else if (filter == "education") {

      setfilteredData(filteredData.filter((kid) => kid.Education));
      setDisplayedkids(filteredData.filter((kid) => kid.Education));
    }
  };

  const FilterByAge = (inputs) => {
    let MyKids = [...filteredData]

    setIsPanelActive(false)
    if (inputs.min.trim() != "") {
      MyKids = MyKids.filter((k) => getAge(k.year + "-" + k.month + "-" + k.day) >= parseInt(inputs.min))
    }
    if (inputs.max.trim() != "") {
      MyKids = MyKids.filter((k) => getAge(k.year + "-" + k.month + "-" + k.day) <= parseInt(inputs.max))
    }
    setdate(inputs.min + "-" + inputs.max)
    setfilteredData(MyKids)
    setDisplayedkids(MyKids)

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
          <Text style={styles.ScreenEntityTitle}>الأيتام </Text>
          <FontAwesome5 name="child" size={25} color="#fff" />
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
            filterInformations("age");
            setActive(0);
          }}
        >
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 0 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 0 ? "#fff" : "#000",
              }}
            >
              {date ? date : "العمر"}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("sick");
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
              مرضى{" "}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("education");
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
              دروس الدعم{" "}
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
      <View style={styles.Section}>

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 25,
          }}
          style={styles.Content}
        >
          <Kids kids={Displayedkids} viewKid={viewKid} />
        </ScrollView>
      </View>
      <Toast config={toastConfig} />
      {isPanelActive && <AgeFilterModal confirm={FilterByAge} />}
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

    display: "flex",
    alignItems: "center",
  },
  Content: {
    width: "100%",
    maxHeight: "85%",
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
