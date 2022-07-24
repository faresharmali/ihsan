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
import DeleteConfirmation from "../../Components/Modals/DeleteConfirmation";
import OrphanContainer from "../../Components/OrphanContainer";
import man from "../../../assets/avatars/man.png";
import icon from "../../../assets/icons/information.png";
import DataContainer from "../../Components/DataContainer";
import KafelInfo from "./kafelinfo";
import { useSelector, useDispatch } from "react-redux";
import { getDonators, UpdateDonator } from "../../api/user";
import FamilyInfosContainer from "../../Components/Containers/FamilyInfosContainer";
export default function KafelProfile({ route, navigation }) {
  const [section, setSection] = useState("infos");
  const [deleteModal, showDeleteModal] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const users = [];
  const benifits = [];
  const StateKafel = useSelector((state) => state.Donators).filter(
    (u) => u.id == route.params.id
  )[0];
  const Familli = useSelector((state) => state.Families);

  let kids = [];
  Familli.forEach((f) => {
    f.kids.forEach((k) => {
      kids.push({
        ...k,
        lastName: f.fatherLastName,
        phone: f.phone,
        address: f.adresse,
      });
    });
  });
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

  const dispatch = useDispatch();
  const updateState = (data) => {
    return {
      type: "updateDonatorsList",
      data: data,
    };
  };
  const deleteFamily = async () => {
    let User = { ...StateKafel };
    User.famillies = StateKafel.famillies.filter((f) => f.id != selectedFamily);
    const res = await UpdateDonator(User);
    if (res.ok) {
      const res = await getDonators();
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
  const AddFamily = async (famillies) => {
    let User = { ...StateKafel };
    User.famillies = [...User.famillies, ...famillies];
    const res = await UpdateDonator(User);
    if (res.ok) {
      const res = await getDonators();
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
          <Icon
            as={MaterialCommunityIcons}
            size={8}
            color="#fff"
            name="square-edit-outline"
          />
        </View>
        <Image style={styles.EntityImage} source={man} />
        <Text style={styles.EntityTitle}>{route.params[0]}</Text>
        <View style={styles.Navigation}>
          <TouchableOpacity onPress={() => setSection("infos")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>معلومات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("Famillies")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>العائلات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("kids")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>الأيتام</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {section == "infos" && (
        <KafelInfo title="معلومات العضو" data={route.params} />
      )}
      {section == "Famillies" && (
        <>
          <ScrollView style={styles.Content}>
            {StateKafel.famillies &&
              StateKafel.famillies.map((f) => (
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
                Infos: StateKafel,
                AddFamily,
              })
            }
            style={styles.Fab}
          >
            <Icon color="#fff" as={<AntDesign name="plus" />} size="sm" />
          </TouchableOpacity>
        </>
      )}
      {section == "demands" && (
        <ScrollView style={styles.Content}>
          {users.map((u) => (
            <DataContainer AvatarSize={25} data={u} pic={icon} />
          ))}
        </ScrollView>
      )}
      {section == "kids" && (
        <>
          <ScrollView style={styles.Content}>
            {StateKafel.famillies &&
              StateKafel.orphans.map((f) => (
                <OrphanContainer
                  key={f._id}
                  AvatarSize={40}
                  data={kids.filter((fa) => fa.id == f.id)[0]}
                  pic={Family}
                  selectFamily={selectFamily}
                />
              ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UpdateWasset", {
                Infos: StateKafel,
                AddFamily,
              })
            }
            style={styles.Fab}
          >
            <Icon color="#fff" as={<AntDesign name="plus" />} size="sm" />
          </TouchableOpacity>
        </>
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
    maxHeight: "72.5%",
    display: "flex",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
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
