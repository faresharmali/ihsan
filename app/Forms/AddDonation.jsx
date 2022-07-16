import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Stack, Icon } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import KafelSwipable from "../Components/Containers/KafelSwipable";
import { useSelector } from "react-redux";
import { CreateDonation,ExtendKafala } from "../api/user";
import ConfirmationModal from "../Components/Modals/DonationConfirmation";
import uuid from "react-native-uuid";

export default function AddDonation({ route, navigation }) {
  const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
  const [confirmation, setconfirmation] = useState(false);
  const [isUsersPannel, setisUsersPannel] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const [user, setUser] = useState("الكافل");
  const [ChosenDonator, setChosenDonator] = useState(null);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [errors, SetErrors] = useState({
    donator: false,
    amount: false,
    nextPayement: false,
  });
  const [userInfos, setuserInfos] = useState({
    id: uuid.v4(),
    donator: "",
    amount: "",
    nextPayement: "",
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isUsersPannel || confirmation) {
          setisUsersPannel(false);
          setconfirmation(false);
          return true;
        } else {
          return false;
        }
      }
    );
    return () => backHandler.remove();
  }, [isUsersPannel, confirmation]);

  const handleUserInput = (text) => {
    setErrorMessageVisible(false);
    SetErrors({ ...errors, amount: false });
    setuserInfos({ ...userInfos, amount: text });
  };

  const openUsersPanel = () => {
    Keyboard.dismiss();
    setisUsersPannel(true);
    setshowButton(false);
  };
  let Donators = useSelector((state) => state.Donators).filter(
    (donator) => donator.type == "kafel"
  );
  let allUSers = Donators.map((u) => ({ ...u, title: u[0] }));
  const styling = {
    borderColor: "#000",
    borderWidth: 0.5,
    fontFamily: "Tajawal-Medium",
    fontSize: 14,
  };

  const ChooseUser = (user) => {
    setuserInfos({ ...userInfos, user });
    setUser(user.title);
    setChosenDonator(user);
    setisUsersPannel(false);
    setshowButton(true);
  };

  const AddDonator = () => {
    if (userInfos.amount.trim() != "") {
      Keyboard.dismiss();
      setconfirmation(true);
    } else {
      SetErrors({ ...errors, amount: true });
    }
  };
  const confirmDonation = async () => {
    let data = {
      name: uuid.v4(),
      identifier: ChosenDonator.id,
      donatorInfos: JSON.stringify(ChosenDonator),
      type: "kafala",
      date: new Date(),
      amount: parseFloat(userInfos.amount),
    };
    let res = await CreateDonation(data);
    if (res.ok) {
      res = await ExtendKafala({
        id: ChosenDonator.id,
        amount: userInfos.amount
      });
      setconfirmation(false);
      route.params.showToast();
      navigation.goBack();
    } else {
      alert("error");
    }
  };

  return (
    <View style={styles.Container}>
      {confirmation && (
        <ConfirmationModal
          kafel={ChosenDonator}
          userInfos={userInfos}
          confirm={confirmDonation}
        />
      )}

      <View style={styles.TitleContainer}>
        <View style={{ flexDirection: "row-reverse" }}>
          <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

          <Text style={styles.PageTitile}>اضافة كفالة</Text>
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
        <TouchableWithoutFeedback onPress={() => openUsersPanel()}>
          <View
            style={{
              ...styles.dateContainer,
              borderColor: errors.user ? "#c21a0e" : "grey",
            }}
          >
            <Icon
              as={<FontAwesome name="user" />}
              size={5}
              ml="2"
              color="#348578"
            />
            <Text style={styles.InputText}>{user} </Text>
          </View>
        </TouchableWithoutFeedback>

        {ChosenDonator && (
          <>
            <View style={styles.DonatorInfos}>
              <Text style={styles.nextPayement}>
                مبلغ الكفالة : {ChosenDonator.donationAmount} دج
              </Text>
              <Text style={styles.nextPayement}>
                تاريخ الدفع المقبل :{" "}
                {new Date(ChosenDonator.nextPayment).getFullYear() +
                  "/" +
                  (new Date(ChosenDonator.nextPayment).getMonth() + 1) +
                  "/" +
                  new Date(ChosenDonator.nextPayment).getDate()}
              </Text>
            </View>
            <Input
              InputRightElement={
                <Icon
                  style={{ marginRight: 10 }}
                  as={<MaterialIcons name="attach-money" />}
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
              placeholder="المبلغ"
              {...styling}
              borderWidth={1}
              borderColor={errors.amount ? "#c21a0e" : "grey"}
              onChangeText={(text) => handleUserInput(text)}
            />
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
            {!confirmation && showButton && (
              <Button
                style={styles.Button}
                mode="contained"
                onPress={AddDonator}
              >
                <Text style={{ fontSize: 16, marginLeft: 10 }}>اضافة</Text>
              </Button>
            )}
          </>
        )}
      </Stack>

      <KafelSwipable
        title="اختيار الكافل"
        ChooseJob={ChooseUser}
        data={allUSers}
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
    position: "relative",
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
  nextPayement: {
    fontFamily: "Tajawal-Medium",
    fontSize: 17,
  },
});
