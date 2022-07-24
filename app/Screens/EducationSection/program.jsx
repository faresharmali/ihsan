import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon, ScrollView } from "native-base";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { LogBox } from "react-native";
import Toast from "react-native-toast-message";
import toastConfig from "../../Components/ToastConfiguration";
import { getProgram } from "../../api/activities";
import { useSelector } from "react-redux";
import DeleteSwipable from "../../Components/Containers/DeleteSwipable";
LogBox.ignoreAllLogs();
import ProgramContainer from "../../Components/ProgramContainer";
import EducationSectionBottomBar from "../../Navigation/EducationSectionBottomBar";

export default function Program({ navigation, drawer }) {
  const [program, setProgram] = useState([]);
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
      text2: " تمت اضافة البرنامج  بنجاح  👋",
    });
  };
  const fetchProgram = async () => {
    const res = await getProgram({ departement: "activities" }, user);
    if (res.data.ok) {
      setProgram(res.data.result.filter((p) => p.section == "قسم التعليم"));
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
          <Text style={styles.ScreenEntityTitle}> البرنامج : قسم التعليم </Text>
          <MaterialCommunityIcons name="account-group" size={30} color="#fff" />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 25,
        }}
        style={styles.Content}
      >
        {program.map((program) => (
          <ProgramContainer
            setDeletePannelActive={setDeletePannelActive}
            setPressedProgram={setPressedProgram}
            program={program}
          />
        ))}
      </ScrollView>
      <Toast config={toastConfig} />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AddProgramItem", {
            showToast,
            fetchProgram,
            section: "قسم التعليم",
          })
        }
        style={styles.fab}
      >
        <Icon as={Entypo} name="plus" size={8} color="#fff" />
      </TouchableOpacity>

      <DeleteSwipable
        PressedItem={PressedProgram}
        title=""
        isPanelActive={DeletePannelActive}
        setIsPanelActive={setDeletePannelActive}
      />
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
    position: "absolute",
    bottom: 65,
    right: 10,
  },
  Content: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    width: "100%",
    display: "flex",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#f5f5f5",
  },
});
