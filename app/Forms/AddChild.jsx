import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Input, Stack, Icon, Radio } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { AddKid } from "../api/family";
import uuid from "react-native-uuid";

export default function AddChild({ route, navigation }) {
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [gender, setgender] = useState("ذكر");
  const [ChildData, setChildData] = useState({
    id: uuid.v4(),
    name: "",
    age: "",
    gender: "",
    scolarity: "",
  });
  const [errors, SetErrors] = useState({
    name: false,
    age: false,
    scolarity: false,
  });

  const validate = () => {
    let valid = true;
    let FieldErrors = { ...errors };
    if (ChildData.name.trim() == "") {
      (FieldErrors.name = true), (valid = false);
    }
    if (ChildData.age.trim() == "") {
      (FieldErrors.age = true), (valid = false);
    }
    if (ChildData.scolarity.trim() == "") {
      (FieldErrors.scolarity = true), (valid = false);
    }

    SetErrors(FieldErrors);
    return valid;
  };
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
  };

  const CreateKid = async () => {
    Keyboard.dismiss();
    if (validate()) {
      const res = await AddKid(ChildData);
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

  const inputHandler = (e, name) => {
    setChildData({ ...ChildData, [name]: e });
  };
  return (
    <View style={styles.Container}>
      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}>اضافة ابن</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Users")}>
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
          textAlign="right"
          placeholder="الاسم"
          {...styling}
          borderWidth={1}
          borderColor={errors.name ? "#c21a0e" : "grey"}
          onChangeText={(text) => inputHandler(text, "name")}
        />
        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<FontAwesome name="birthday-cake" />}
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
          textAlign="right"
          placeholder="العمر "
          {...styling}
          borderWidth={1}
          borderColor={errors.age ? "#c21a0e" : "grey"}
          onChangeText={(text) => inputHandler(text, "age")}
        />

        <Input
          InputRightElement={
            <Icon
              style={{ marginRight: 10 }}
              as={<FontAwesome name="map-marker" />}
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
          textAlign="right"
          placeholder="المستوى الدراسي"
          {...styling}
          borderWidth={1}
          borderColor={errors.scolarity ? "#c21a0e" : "grey"}
          onChangeText={(text) => inputHandler(text, "scolarity")}
        />
        <Radio.Group
          value={gender}
          style={{ flexDirection: "row" }}
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          onChange={(gender) => {
            setgender(gender);
          }}
        >
          <Radio size="lg" colorScheme="rgb(52, 133, 120)" value="ذكر" my={1}>
            ذكر
          </Radio>
          <Radio
            size="lg"
            colorScheme="rgb(52, 133, 120)"
            style={{ marginLeft: 20 }}
            value="أنثى"
            my={1}
          >
            أنثى
          </Radio>
        </Radio.Group>
        {ErrorMessageVisible && (
          <View style={styles.ErrorMessage}>
            <FontAwesome
              name="exclamation-triangle"
              size={20}
              color="#BE123C"
            />
            <Text style={styles.errorText}>{ErrorMessage}</Text>
          </View>
        )}
      </Stack>
      <Button style={styles.Button} mode="contained" onPress={CreateKid}>
        <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
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
