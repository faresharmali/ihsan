import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { Icon,Input } from "native-base";
import { FontAwesome5, Entypo, MaterialIcons } from "@expo/vector-icons";
import Family from "../../../assets/icons/user.png";
import { useSelector,useDispatch } from "react-redux";
import toastConfig from "../../Components/ToastConfiguration";
import Toast from "react-native-toast-message";
import DataContainer from "../../Components/DataContainer";
import { getDonators } from "../../api/user";
import ActivitiesSectionBottomBar from "../../Navigation/ActivitiesSectionBottomBar";
export default function ActivityDonators({ navigation, drawer }) {
  const styling = {
    backgroundColor: "#fff",
    marginTop: 5,
  };
  const openModal = (data) => {
    navigation.navigate("Family", data);
  };
  let Donators = useSelector((state) => state.Donators).filter(
    (d) => d[2].trim() == "قسم الأنشطة الخيرية"
  );
  const dispatch = useDispatch();

  const updateState = (data) => {
    return {
      type: "updateDonatorsList",
      data: data,
    };
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const res = await getDonators();
      dispatch(
        updateState(
          res.data.result.map((user) => ({
            0: user.name,
            1: user.phone,
            2: user.job,
          }))
        )
      );
    });

    return unsubscribe;
  }, [navigation]);

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
          <Text style={styles.ScreenEntityTitle}>المحسنين : قسم الأنشطة الخيرية </Text>
          <FontAwesome5 name="hand-holding-heart" size={25} color="#fff" />
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
          placeholder="البحث عن محسن"
          {...styling}
        />

        <ScrollView style={styles.Content}>
          {Donators.map((f) => (
            <DataContainer
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
  },
  Content: {
    width: "100%",
    maxHeight: "78%",
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
