import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Stack, Icon, TextArea } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import Swipable from "../Components/Containers/swipable";
import { CreateIngredient } from "../api/user";
import uuid from "react-native-uuid";
export default function AddIngredient({ route, navigation }) {
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [isUsersPannel, setisUsersPannel] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [type, setType] = useState("الوحدة");
  const [ErrorMessage, setErrorMessage] = useState("");

  const [errors, SetErrors] = useState({
    title: false,
    unite: false,
    quantity: false,
  });
  const [Reportinfos, setuserInfos] = useState({
    id: uuid.v4(),
    name: "",
    unite: "",
    quantity: "",
  });
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isUsersPannel) {
          setisUsersPannel(false);
          return true;
        } else {
          return false;
        }
      }
    );
    return () => backHandler.remove();
  }, [isUsersPannel]);

  const handleUserInput = (text, name) => {
    setErrorMessageVisible(false);
    SetErrors({ ...errors, [name]: false });
    setuserInfos({ ...Reportinfos, [name]: text });
  };

  const openUsersPanel = () => {
    Keyboard.dismiss();
    setisUsersPannel(true);
    setshowButton(false);
  };

  let ReportTypes = [{ title: "علبة" }, { title: "كلغرام" }, { title: "لتر" }];
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontFamily: "Tajawal-Medium",
    fontSize: 14,
  };

  const ChooseUser = (unite) => {
    SetErrors({ ...errors, unite: false });
    setuserInfos({ ...Reportinfos, unite });
    setType(unite);
    setisUsersPannel(false);
    setshowButton(true);
  };
  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (Reportinfos.name.trim() == "") {
      (FieldErrors.name = true), (valid = false);
    }
    if (Reportinfos.unite.trim() == "") {
      (FieldErrors.unite = true), (valid = false);
    }

    if (Reportinfos.quantity.trim() == "") {
      (FieldErrors.quantity = true), (valid = false);
    }
    SetErrors(FieldErrors);
    return valid;
  };
  const AddDonator = async () => {
    Keyboard.dismiss();
    if (validate()) {
      const res = await CreateIngredient({ ...Reportinfos });
      if (res.ok) {
        route.params.showToast();
        navigation.goBack();
      } else {
      }
    } else {
      setErrorMessage("كل الخانات اجبارية");
      setErrorMessageVisible(true);
    }
  };
  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}>اضافة مكون</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Kofal")}>
          <Icon
            style={styles.back}
            as={FontAwesome}
            name="close"
            size={7}
            color="#348578"
          />
        </TouchableWithoutFeedback>
      </View>

      <Stack space={4} w="100%" alignItems="center">
        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<FontAwesome name="user" />}
              size={5}
              ml="2"
              color="#348578"
            />
          }
          w={{
            base: "95%",
            md: "25%",
          }}
          h={50}
          name="name"
          textAlign="right"
          placeholder="اسم المكون"
          {...styling}
          borderWidth={1}
          borderColor={errors.name ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "name")}
        />

        <TouchableWithoutFeedback onPress={() => openUsersPanel()}>
          <View
            style={{
              ...styles.dateContainer,
              borderColor: errors.unite ? "#c21a0e" : "grey",
            }}
          >
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="#348578"
            />
            <Text style={styles.InputText}> {type}</Text>
          </View>
        </TouchableWithoutFeedback>

        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<FontAwesome name="user" />}
              size={5}
              ml="2"
              color="#348578"
            />
          }
          w={{
            base: "95%",
            md: "25%",
          }}
          h={50}
          name="name"
          textAlign="right"
          placeholder="الكمية"
          {...styling}
          borderWidth={1}
          borderColor={errors.quantity ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "quantity")}
        />
      </Stack>
      {ErrorMessageVisible && (
        <View style={styles.ErrorMessage}>
          <FontAwesome name="exclamation-triangle" size={20} color="#BE123C" />
          <Text style={styles.errorText}>{ErrorMessage}</Text>
        </View>
      )}
      {showButton && (
        <Button style={styles.Button} mode="contained" onPress={AddDonator}>
          <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة</Text>
        </Button>
      )}

      <Swipable
        title="اختيار الوحدة"
        ChooseJob={ChooseUser}
        data={ReportTypes}
        isPanelActive={isUsersPannel}
        setIsPanelActive={setisUsersPannel}
        setshowButton={setshowButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    width: "95%",
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 10,
  },
  InputText: {
    fontFamily: "Tajawal-Medium",
  },
  Container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "20%",
  },
  PageTitile: {
    fontSize: 25,
    marginRight: 10,
    fontFamily: "Tajawal-Medium",
  },
  TitleContainer: {
    width: "100%",
    flexDirection: "row-reverse",
    alignContent: "center",
    justifyContent: "space-between",
    padding: 15,
    paddingBottom: 0,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "red",
  },

  Button: {
    flexDirection: "row-reverse",
    height: 50,
    width: 230,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#348578",
    marginTop: 25,
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.41,
    elevation: 6,
  },
  back: {
    left: 0,
  },
  Modal: {
    width: "100%",
  },
  ErrorMessage: {
    width: "80%",
    height: 40,
    backgroundColor: "#FECDD3",
    marginTop: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 10,
  },
  errorText: {
    fontFamily: "Tajawal-Medium",
    marginRight: 10,
    fontSize: 13,
  },
});
