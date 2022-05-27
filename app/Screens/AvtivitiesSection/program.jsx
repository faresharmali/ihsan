import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "native-base";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { LogBox } from "react-native";
import Toast from "react-native-toast-message";
import toastConfig from "../../Components/ToastConfiguration";
import ActivitiesSectionBottomBar from "../../Navigation/ActivitiesSectionBottomBar";
import { getProgram } from "../../api/activities";
import { useSelector } from "react-redux";
import DeleteSwipable from "../../Components/Containers/DeleteSwipable";
import ProgramItem from "./ProgramItem";
LogBox.ignoreAllLogs();
export default function ActivitiesProgram({ navigation, drawer }) {
  const [program, setProgram] = useState({ items: [] });
  const [DeletePannelActive, setDeletePannelActive] = useState(false);
  const [PressedProgram, setPressedProgram] = useState(false);

  const user = useSelector((state) => state.Auth).token;
  useEffect(async () => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await fetchProgram();
    });
    return unsubscribe;
  }, [navigation]);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "نجحت العملية",
      text2: " تمت اضافة الأبن بنجاح  👋",
    });
  };
  const fetchProgram = async () => {
    const res = await getProgram({ departement: "activities" }, user);
    if (res.data.ok) {
      setProgram(res.data.data);
    } else {
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
          <Text style={styles.ScreenEntityTitle}>
            {" "}
            البرنامج : قسم الأنشطة الخيرية{" "}
          </Text>
          <MaterialCommunityIcons name="account-group" size={30} color="#fff" />
        </View>
      </View>
      <View style={styles.Section}>
        <Text style={styles.title}>البرنامج</Text>
        {program.items.map((program) => (
          <ProgramItem
            setDeletePannelActive={setDeletePannelActive}
            setPressedProgram={setPressedProgram}
            program={program}
          />
        ))}
      </View>
      <Toast config={toastConfig} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AddProgramItem", { showToast, fetchProgram })
        }
        style={styles.fab}
      >
        <Icon as={Entypo} name="plus" size={8} color="#fff" />
      </TouchableOpacity>

      <DeleteSwipable
        PressedItem={PressedProgram}
        title="اختيار الوسيط"
        isPanelActive={DeletePannelActive}
        setIsPanelActive={setDeletePannelActive}
      />
      <ActivitiesSectionBottomBar navigation={navigation} />
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
    fontSize: 19,
    marginRight: 10,
    fontFamily: "Tajawal-Medium",
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
  title: {
    fontSize: 20,
    margin: 10,
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
