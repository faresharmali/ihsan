import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "native-base";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import Family from "../../../assets/avatars/family.png";

import man from "../../../assets/avatars/man.png";
import info from "../../../assets/icons/information.png";
import DataContainer from "../../Components/DataContainer";
import UserInfos from "./userInfos";
import FamilyInfosContainer from "../../Components/Containers/FamilyInfosContainer";
import DeleteConfirmation from "../../Components/Modals/DeleteConfirmation";
import { UpdateUser, getUsers } from "../../api/user";
import { useSelector, useDispatch } from "react-redux";
export default function Distributeur({ route, navigation }) {
  const [section, setSection] = useState("infos");
  const [deleteModal, showDeleteModal] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState(null);

  const dispatch = useDispatch();
  const updateState = (data) => {
    return {
      type: "updateUserList",
      data: data,
    };
  };
  const Familli = useSelector((state) => state.Families);
  const StateUser = useSelector((state) => state.users).filter(
    (u) => u.id == route.params.id
  )[0];
  let Informations = useSelector((state) => state.Informations).filter(
    (info) => info.author == StateUser.name
  );
  const openModal = (data) => {
    navigation.navigate("Information", {data,updatePath:"UpdateInformationKofa"});
  };
  const deleteFamily = async () => {
    let User = { ...StateUser };
    User.famillies = StateUser.famillies.filter((f) => f.id != selectedFamily);
    const res = await UpdateUser(User);
    if (res.ok) {
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
    } else {
    }
    showDeleteModal(false);
  };
  const selectFamily = (id) => {
    showDeleteModal(true);
    setSelectedFamily(id);
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

  const AddFamily = async (famillies) => {
    let User = { ...StateUser };
    User.famillies = [...User.famillies, ...famillies];
    const res = await UpdateUser(User);
    if (res.ok) {
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
    } else {
    }
    showDeleteModal(false);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.pageEntity}>
        <View style={styles.IconsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Users")}>
            <Icon as={Ionicons} size={8} color="#fff" name="md-chevron-back" />
          </TouchableOpacity>
        </View>
        <Image style={styles.EntityImage} source={man} />
        <Text style={styles.EntityTitle}>{StateUser[0]}</Text>
        <View style={styles.Navigation}>
          <TouchableOpacity onPress={() => setSection("infos")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>معلومات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("children")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>العائلات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("posts")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>المنشورات</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {section == "infos" && (
        <UserInfos title="معلومات العضو" data={StateUser} />
      )}
      {section == "children" && (
        <>
          <ScrollView style={styles.Content}>
            {StateUser.famillies &&
              StateUser.famillies.map((f) => (
                <FamilyInfosContainer
                  key={f._id}
                  AvatarSize={40}
                  data={Familli.filter((fa) => fa.id == f.id)[0]}
                  pic={Family}
                  selectFamily={selectFamily}
                />
              ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UpdateWasset", {
                Infos: StateUser,
                AddFamily,
              })
            }
            style={styles.Fab}
          >
            <Icon color="#fff" as={<AntDesign name="plus" />} size="sm" />
          </TouchableOpacity>
        </>
      )}
      {section == "posts" && (
        <ScrollView style={styles.Content}>
          {Informations.map((f) => (
            <DataContainer
              key={f.id}
              AvatarSize={22}
              data={f}
              pic={info}
              openFamily={() => openModal(f)}
            />
          ))}
        </ScrollView>
      )}
      {deleteModal && <DeleteConfirmation Confirme={deleteFamily} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    zIndex: 10,
  },
  pageEntity: {
    width: "100%",
    maxHeight: "25%",
    backgroundColor: "#348578",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  EntityImage: {
    width: 70,
    height: 70,
    marginBottom: 5,
  },

  EntityTitle: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Tajawal-Medium",
  },
  IconsContainer: {
    top: 20,
    width: "90%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  Navigation: {
    width: "90%",
    flexDirection: "row-reverse",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 3,
    height: 50,
    bottom: -25,
  },
  NavigationItemText: {
    fontFamily: "Tajawal-Medium",
  },
  NavigationItem: {
    height: "100%",
    justifyContent: "center",
    width: 105,
    margin: 5,
    marginTop: 0,
    marginBottom: 0,
    alignItems: "center",
  },

  Content: {
    marginTop: 30,
    width: "100%",
    maxHeight: "71.5%",
    display: "flex",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  DataContainer: {
    width: "100%",
    minHeight: 70,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 7,
    shadowColor: "#000",
    elevation: 1.5,
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingLeft: 10,
  },
  infos: {
    marginRight: 5,
    width: "75%",
  },
  UserPersonal: {
    fontFamily: "Tajawal-Medium",
    fontSize: 15,
    color: "#000",
    marginBottom: 5,
  },
  Fab: {
    width: 50,
    height: 50,
    backgroundColor: "#348578",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 20,
    bottom: 30,
  },
});
