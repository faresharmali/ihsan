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
import { FontAwesome5, Entypo, MaterialIcons } from "@expo/vector-icons";
import Family from "../../../assets/icons/information.png";
import { Input, Icon } from "native-base";
import { useSelector } from "react-redux";
import toastConfig from "../../Components/ToastConfiguration";
import Toast from "react-native-toast-message";
import DataContainer from "../../Components/DataContainer";
import { getInformations,DeleteInformation } from "../../api/informations";
import { useDispatch } from "react-redux";
import InformationSectionBottomBar from "../../Navigation/InformationsBottomBar";
import DeleteConfirmation from "../../Components/Modals/DeleteConfirmation";
export default function Informations({ navigation, drawer }) {
  const [InformationsList, setInformationList] = useState([]);
  const [deleteModal,showDeleteModal]=useState(false)
  const [selectedInfo,setSelectedInfo]=useState(null)

  const [filteringSection, setfilteringSection] = useState("all");
  const dispatch = useDispatch();
  let Informations = useSelector((state) => state.Informations);

  useEffect(() => {
    if (filteringSection == "all") {
      setInformationList(Informations);
    } else {
      setInformationList(
        Informations.filter((info) => info[1] == filteringSection)
      );
    }
  }, [Informations]);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "نجحت العملية",
      text2: " تمت اضافة المعلومة بنجاح  👋",
    });
  };

  const openModal = (data) => {
    navigation.navigate("Information", {data,   fetchInformations});
  };
  let LoggedUser = useSelector((state) => state.Auth);
  const updateState = (data) => {
    return {
      type: "UpdateInformations",
      data: data,
    };
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      fetchInformations();
    });

    return unsubscribe;
  }, [navigation]);

  const filterData = (type) => {
    if (type == "all") {
      setInformationList(Informations);
    } else {
      setInformationList(Informations.filter((info) => info.type == type));
    }
  };
  const [active, setActive] = useState(6);

  const filterInformations = (section) => {
    if (section == "all") {
      setInformationList(Informations);
    } else {
      setInformationList(Informations.filter((info) => info[1] == section));
    }
  };
  const fetchInformations = async () => {
    const res = await getInformations(LoggedUser.token);
    dispatch(
      updateState(
        res.data.result.map((information) => ({
          0: information.title,
          1: information.section,
          ...information,
        }))
      )
    );
  };
  const selectInformation=async (id)=>{
    setSelectedInfo(id)
    showDeleteModal(true)
  }

  const deleteInfo=async ()=>{
    const res = await DeleteInformation({id:selectedInfo})
    if(res.ok){
      fetchInformations()
      showDeleteModal(false)
    }else{
      alert("error")
    }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (  deleteModal ) {
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
          <Text style={styles.ScreenEntityTitle}>قسم المعلومات </Text>
          <FontAwesome5 name="hand-holding-heart" size={25} color="#fff" />
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
      <View style={styles.Section}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 25,
          }}
          style={styles.Content}
        >
          {InformationsList.map((f) => (
            <DataContainer
            select={selectInformation}
              key={f.id}
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
        onPress={() =>
          navigation.navigate("AddInformation", {
            showToast,
            fetchInformations,
          })
        }
        style={styles.fab}
      >
        <Icon as={Entypo} name="plus" size={8} color="#fff" />
      </TouchableOpacity>

     {deleteModal && <DeleteConfirmation Confirme={deleteInfo} />} 
      <InformationSectionBottomBar
        filterData={filterData}
        navigation={navigation}
      />

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
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  secondFilterContainer: {
    backgroundColor: "#f5f5f5",
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    padding: 5,
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
});
