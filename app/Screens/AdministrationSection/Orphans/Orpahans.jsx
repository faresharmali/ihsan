import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import BottomBar from "../../../Navigation/BottomBar";
import { Icon } from "native-base";
import { FontAwesome5, Entypo, AntDesign } from "@expo/vector-icons";
import { Input, Stack } from "native-base";
import { useSelector } from "react-redux";
import toastConfig from "../../../Components/ToastConfiguration";
import Toast from "react-native-toast-message";
import Kids from "../Famillies/Kids";
import { useDispatch } from "react-redux";
import { getFamilies } from "../../../api/family";
import { PrintData } from "../../../Components/Print";
import { getAge } from "../../../Components/Print";
export default function Orphans({ navigation, drawer }) {
  const dispatch = useDispatch();
  const [kids, setKids] = useState([]);
  const [Displayedkids, setDisplayedkids] = useState([]);
  const styling = {
    backgroundColor: "#fff",
    marginTop: 5,
  };

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
  }, [MyFamilies]);

  const viewKid = (kid) => {
    navigation.navigate("KidProfile", { kid ,fetchFamillies});
  };
  const handleSearch = (text) => {
    setDisplayedkids(kids.filter((k) => k.title.includes(text)));
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
        scolarity: t.scolarity,age: getAge(t.year + "-" + t.month + "-" + t.day),gender: t.gender, name: t.title
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
    paddingTop:10
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
});
