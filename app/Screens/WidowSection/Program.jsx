import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Icon, ScrollView } from "native-base";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { LogBox } from "react-native";
import Toast from "react-native-toast-message";
import toastConfig from "../../Components/ToastConfiguration";
import { getProgram, DeleteProgramItem } from "../../api/activities";
import { useSelector } from "react-redux";
import DeleteSwipable from "../../Components/Containers/DeleteSwipable";
LogBox.ignoreAllLogs();
import ProgramContainer from "../../Components/ProgramContainer";
import DeleteConfirmation from "../../Components/Modals/DeleteConfirmation";
import WidowSectionBottomBar from "../../Navigation/WidowSectionBottomBar";
export default function Program({ navigation, drawer }) {
  const user = useSelector((state) => state.Auth).token;
  const [program, setProgram] = useState([]);
  const [DeletePannelActive, setDeletePannelActive] = useState(false);
  const [PressedProgram, setPressedProgram] = useState(false);
  const [deleteModal, showDeleteModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const selectProgram = (id) => {
    setSelectedProgram(id);
    showDeleteModal(true);
  };
  const deleteprogram = async () => {
    const res = await DeleteProgramItem({ id: selectedProgram }, user);
    if (res.ok) {
      fetchProgram();
      showDeleteModal(false);
    } else {
      alert("error");
    }
  };
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
    const res = await getProgram({ departement: "Education" }, user);
    if (res.data.ok) {
      setProgram(res.data.result.filter((p) => p.section == "قسم الأرامل"));
    } else {
    }
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (deleteModal) {
          showDeleteModal(false);

          return true;
        } else {
          return false;
        }
      }
    );
    return () => backHandler.remove();
  }, [deleteModal]);
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
          <Text style={styles.ScreenEntityTitle}> البرنامج : قسم الأرامل </Text>
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
            select={selectProgram}
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
            section: "قسم الأرامل",
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
      {deleteModal && <DeleteConfirmation Confirme={deleteprogram} />}
      <WidowSectionBottomBar navigation={navigation} />
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
