import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import BottomBar from "../../Navigation/BottomBar";
import { Icon } from "native-base";
import {
  MaterialCommunityIcons,
  Entypo,
  AntDesign ,
  MaterialIcons,
} from "@expo/vector-icons";
import FamilyInfosContainer from "../../Components/Containers/FamilyInfosContainer";
import Family from "../../../assets/avatars/family.png";
import { Input, Stack } from "native-base";
import { useSelector } from "react-redux";
import toastConfig from "../../Components/ToastConfiguration";
import Toast from "react-native-toast-message";
import { getFamilies } from "../../api/family";
import { useDispatch } from "react-redux";
import { PrintData } from "../../Components/Print";

export default function Families({ navigation, drawer }) {
  const dispatch = useDispatch();
  const [famillies, setfamillies] = useState([]);
  const [Displayedfamillies, setDisplayedfamillies] = useState([]);
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "نجحت العملية",
      text2: " تمت اضافة العائلة بنجاح  👋",
    });
  };
  const styling = {
    backgroundColor: "#fff",
    marginTop: 5,
    fontSize: 15,
    fontFamily: "Tajawal-Medium",

  };
  const openModal = (data) => {
    navigation.navigate("Family", { ...data });
  };
  let MyFamilies = useSelector((state) => state.Families);
  const updateState = (data) => {
    return {
      type: "updateFamiliesList",
      data: data,
    };
  };
  useEffect(() => {
    setfamillies(MyFamilies);
    setDisplayedfamillies(MyFamilies);
  }, [MyFamilies]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const res = await getFamilies();
      dispatch(
        updateState(
          res.data.result.map((f) => ({
            ...f,
            title:
              f.motherFullName +
              " " +
              f.fatherFirstName +
              " " +
              f.fatherLastName,
          }))
        )
      );
    });

    return unsubscribe;
  }, [navigation]);

  const handleSearch = (text) => {
    setDisplayedfamillies(famillies.filter((k) => k.title.includes(text)));
  };

  const print = async () => {
    let headings = [
      "الأم",
      "الأب",
      "العنوان",
      " الهاتف",
      " الكفالة",
      " الوسيط",

    ]
    PrintData("قائمة العائلات", headings, Displayedfamillies.map((t) => ({ name: t.motherFullName, father: t.fatherFirstName + " " + t.fatherLastName, address: t.adresse, phone: t.phone, donation: t.donation, wasset: t.wasseet })))

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
          <Text style={styles.ScreenEntityTitle}>العائلات </Text>
          <MaterialCommunityIcons name="account-group" size={30} color="#fff" />
          <TouchableOpacity
          onPress={() => print()}
          style={styles.menuContainer}
          >
          <Icon as={AntDesign} name="printer" size={8} color="#fff" />
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Section}>
        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<MaterialIcons name="search" />}
              size={5}
              ml="2"
              color="#348578"
            />
          }
          style={styles.input}
          w={{
            base: "90%",
            md: "50%",
          }}
          h={42}
          textAlign="right"
          placeholder="البحث عن عائلة"
          {...styling}
          onChangeText={(text) => handleSearch(text)}
        />

        <ScrollView contentContainerStyle={{
          paddingBottom: 25,
        }} style={styles.Content}>
          {Displayedfamillies.map((f) => (
            <FamilyInfosContainer
              key={f._id}
              AvatarSize={40}
              data={f}
              pic={Family}
              openFamily={() => openModal(f)}
            />
          ))}
        </ScrollView>
      </View>
      <Toast config={toastConfig} />
      <TouchableOpacity
        onPress={() => navigation.navigate("AddFamily", { showToast })}
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
    fontSize: 25,
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
