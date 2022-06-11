import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import BottomBar from "../../Navigation/BottomBar";
import { Icon } from "native-base";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import DataContainer from "../../Components/DataContainer";
import { useSelector } from "react-redux";
import { LogBox } from "react-native";
import Toast from "react-native-toast-message";
import toastConfig from "../../Components/ToastConfiguration";
import { useDispatch } from "react-redux";
import { getUsers } from "../../api/user";

import Man from "../../../assets/avatars/man.png";
LogBox.ignoreAllLogs();
export default function Users({ navigation, drawer }) {
  const [active, setActive] = useState(6);
  const [filteringSection, setfilteringSection] = useState("all");
  const [UsersList, setUsersList] = useState([]);

  const openModal = (u) => {
    navigation.navigate("AdminProfile", {
      ...u,
    });
  };
  let userList = useSelector((state) => state.users);
  useEffect(() => {
    if (filteringSection == "all") {
      setUsersList(userList);
    } else {
      setUsersList(userList.filter((info) => info[2] == filteringSection));
    }
  }, [userList]);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "نجحت العملية",
      text2: " تمت اضافة المستخدم بنجاح  👋",
    });
  };
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

  const filterInformations = (section) => {
    if (section == "all") {
      setUsersList(userList);
    } else if (section == "قسم الأيتام") {
      setUsersList(
        userList.filter(
          (info) => info[2] == section || info[2] == "وسيط اجتماعي"
        )
      );
    } else {
      setUsersList(userList.filter((info) => info[2] == section));
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
          <Text style={styles.ScreenEntityTitle}>الأعضاء </Text>
          <MaterialCommunityIcons name="account-group" size={30} color="#fff" />
        </View>
      </View>
      <View style={styles.containerFilter}>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("قسم الادارة");
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
              الادارة
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("قسم الصحة");
            setfilteringSection("قسم الصحة");
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
              الصحة{" "}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("قسم الأيتام");
            setfilteringSection("قسم الأيتام");
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
              الأيتام{" "}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("قسم القفة");
            setfilteringSection("قسم القفة");
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
              القفة
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("قسم التعليم");
            setfilteringSection("قسم التعليم");
            setActive(5);
          }}
        >
          <View
            style={{
              ...styles.filterItem,
              backgroundColor: active == 5 ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{
                ...styles.filterText,
                color: active == 5 ? "#fff" : "#000",
              }}
            >
              التعليم
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            filterInformations("all");
            setfilteringSection("all");
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
      <ScrollView style={styles.Content}>
        {UsersList.map((u) => (
          <DataContainer
            key={u[0]}
            AvatarSize={40}
            data={u}
            pic={Man}
            openFamily={() => openModal(u)}
          />
        ))}
      </ScrollView>
      <Toast config={toastConfig} />
      <TouchableOpacity
        onPress={() => navigation.navigate("AddUser", { showToast })}
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
    minWidth: 50,
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

  Content: {
    width: "100%",
    maxHeight: "76.2%",
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
