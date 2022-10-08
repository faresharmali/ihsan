import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "native-base";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import Family from "../../../../assets/icons/child.png";
import KidInfo from "./Kidinfo";
import icon from "../../../../assets/icons/information.png";
import store from "../../../store";
import DataContainer from "../../../Components/DataContainer";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import toastConfig from "../../../Components/ToastConfiguration";
import { UpdateFamilyInfos } from "../../../api/family";
export default function KidProfile({ route, navigation }) {
  let Families = useSelector((state) => state.Families);
  let family = Families.filter((f) => f.id == route.params.kid.familyId)[0];
  console.log("paramss", route.params)
  console.log("familss", family)
  let kid = family.kids.filter((k) => k.id == route.params.kid.id)[0];
  kid = { ...kid, lastName: family.fatherLastName, familyId: family.id };
  const [section, setSection] = useState("infos");
  const [refresh, setRefresh] = useState(false);

  let Benifits = useSelector((state) => state.Informations).filter(
    (info) =>
      info.kids.some((kid) => kid.id === route.params.kid.id) &&
      info.type == "benefit"
  );
  let Demands = useSelector((state) => state.Informations).filter(
    (info) =>
      info.kids.some((kid) => kid.id === route.params.kid.id) &&
      info.type == "demand"
  );
  let Kofal = useSelector((state) => state.Donators).filter((Donator) =>
    Donator.orphans.some((kid) => kid.id == route.params.kid.id)
  );
  store.subscribe(() => {
    setRefresh(!refresh);
  });

  const updateInfos = async (infos) => {
    let family = Families.filter((f) => f.id == infos.familyId)[0];
    let kids = family.kids.filter((k) => k.id != infos.id);
    kids.push(infos);
    family.kids = [...kids];
    const res = await UpdateFamilyInfos(family);
    if (res.ok) {
      route.params.fetchFamillies();
    } else {
      alert("error");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.pageEntity}>
        <View style={styles.IconsContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
          >
            <Icon as={Ionicons} size={8} color="#fff" name="md-chevron-back" />

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UpdateOrphan", { infos: kid, updateInfos })
            }
          >
            <Icon
              as={MaterialCommunityIcons}
              size={8}
              color="#fff"
              name="square-edit-outline"
            />
          </TouchableOpacity>
        </View>
        <Image style={styles.EntityImage} source={Family} />

        <Text style={styles.EntityTitle}>{`${kid.name}  ${kid.lastName}`}</Text>
        <View style={styles.Navigation}>
          <TouchableOpacity onPress={() => setSection("infos")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>معلومات</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSection("demands")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>طلبات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("benefits")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>استفادات</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection("kofal")}>
            <View style={styles.NavigationItem}>
              <Text style={styles.NavigationItemText}>الكفال</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {section == "infos" && <KidInfo data={kid} />}
      {section == "demands" && (
        <ScrollView style={styles.Content}>
          {Demands.map((u) => (
            <DataContainer AvatarSize={25} data={u} pic={icon} />
          ))}
        </ScrollView>
      )}
      {section == "benefits" && (
        <ScrollView style={styles.Content}>
          {Benifits.map((u) => (
            <DataContainer AvatarSize={25} data={u} pic={icon} />
          ))}
        </ScrollView>
      )}
      {section == "kofal" && (
        <ScrollView style={styles.Content}>
          {Kofal.map((u) => (
            <DataContainer AvatarSize={25} data={u} pic={icon} />
          ))}
        </ScrollView>
      )}
      <Toast config={toastConfig} />
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
    justifyContent: "center",
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
    margin: 5,
    marginTop: 0,
    marginBottom: 0,
    width: 80,
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
