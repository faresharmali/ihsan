import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from "react-native";
import React, { useState } from "react";
import { Input, Stack, Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { UpdateHassalaTransaction } from "../api/Finance";
export default function UpdateHassala({ route, navigation }) {
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);

  const [ErrorMessage, setErrorMessage] = useState("");

  const [errors, SetErrors] = useState({
    name: false,
    location: false,
  });
  const [ActivityInfos, setuserInfos] = useState({
    ...route.params.infos,
  });

  const handleUserInput = (text, name) => {
    setErrorMessageVisible(false);
    SetErrors({ ...errors, [name]: false });
    setuserInfos({ ...ActivityInfos, [name]: text });
  };
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontFamily: "Tajawal-Medium",
    fontSize: 14,
  };


  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (ActivityInfos.name.trim() == "") {
      (FieldErrors.name = true), (valid = false);
    }
    if (ActivityInfos.location.trim() == "") {
      (FieldErrors.location = true), (valid = false);
    }

    SetErrors(FieldErrors);
    return valid;
  };
  const AddActivity = async () => {
    Keyboard.dismiss();
    if (validate()) {
      const res = await UpdateHassalaTransaction({
        ...ActivityInfos,
      });
      if (res.ok) {
        navigation.navigate("Hassalat");
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

          <Text style={styles.PageTitile}>تعديل حصالة</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
        <Text
          style={{ width: "95%", fontSize: 17, fontFamily: "Tajawal-Medium" }}
        >
          اسم الحصالة
        </Text>
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
          placeholder="اسم الحصالة"
          {...styling}
          borderWidth={1}
          value={ActivityInfos.name}
          borderColor={errors.name ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "name")}
        />
        <Text
          style={{ width: "95%", fontSize: 17, fontFamily: "Tajawal-Medium" }}
        >
          مكان الحصالة
        </Text>
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
          placeholder="مكان الحصالة"
          {...styling}
          borderWidth={1}
          value={ActivityInfos.location}
          borderColor={errors.location ? "#c21a0e" : "grey"}
          onChangeText={(text) => handleUserInput(text, "location")}
        />



      </Stack>
      {ErrorMessageVisible && (
        <View style={styles.ErrorMessage}>
          <FontAwesome name="exclamation-triangle" size={20} color="#BE123C" />
          <Text style={styles.errorText}>{ErrorMessage}</Text>
        </View>
      )}

      <Button style={styles.Button} mode="contained" onPress={AddActivity}>
        <Text style={{ fontSize: 16, marginLeft: 10 }}>تعديل</Text>
      </Button>


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
