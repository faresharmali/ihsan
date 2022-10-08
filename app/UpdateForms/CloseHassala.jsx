import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Input, Stack, Icon, Radio } from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { CloseHassalaTransaction } from "../api/Finance";
import Swipable from "../Components/Containers/swipable";

export default function CloseHassala({ route, navigation }) {
    const [Donator, setDonator] = useState("المسؤول");

    const [showButton, setshowButton] = useState(true);
    const [ErrorMessageVisible, setErrorMessageVisible] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [ReceiverPannel, setReceiverPannel] = useState(false);
    let users = useSelector((state) => state.users);
    const openPanel = (name) => {
        Keyboard.dismiss();
        setshowButton(false);
        SetErrors({ ...errors, receiver: false });
        setReceiverPannel(true);
    };

    const [errors, SetErrors] = useState({
        amount: false,
        receiver: false,
    });
    const [ActivityInfos, setuserInfos] = useState({
        ...route.params.infos,
        amount:""
    });

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                if (ReceiverPannel) {
                    setReceiverPannel(false);
                    return true;
                } else {
                    return false;
                }
            }
        );
        return () => backHandler.remove();
    }, [ReceiverPannel]);

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
        if (isNaN(parseInt(ActivityInfos.amount))) {
            (FieldErrors.amount = true), (valid = false);
        }
        if (ActivityInfos.receiver.trim() == "") {
            (FieldErrors.receiver = true), (valid = false);
        }
    
        SetErrors(FieldErrors);
        return valid;
    };
    const AddActivity = async () => {
        Keyboard.dismiss();
        if (validate()) {
            const res = await CloseHassalaTransaction({
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

    const Famillies = useSelector((state) => state.Families);
    let Orphans = [];
    Famillies.forEach((f) => {
        f.kids.forEach((k) => {
            Orphans.push({ ...k, lastName: f.fatherLastName });
        });
    });


    const ChooseDonator = (donator) => {
        setReceiverPannel(false);
        SetErrors({ ...errors, receiver: false });
        setuserInfos({ ...ActivityInfos, receiver: donator });
        setDonator(donator);
        setshowButton(true);
    };
    return (
        <View style={styles.Container}>
            <View style={styles.TitleContainer}>
                <View style={{ flexDirection: "row-reverse" }}>
                    <Icon as={FontAwesome} name="user-plus" size={7} color="#348578" />

                    <Text style={styles.PageTitile}>استلام الحصالة</Text>
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
                <Text
                    style={{ width: "95%", fontSize: 17, fontFamily: "Tajawal-Medium" }}
                >
                    المبلغ
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
                    placeholder="المبلغ"
                    {...styling}
                    borderWidth={1}
                    value={ActivityInfos.amount}
                    borderColor={errors.amount ? "#c21a0e" : "grey"}
                    onChangeText={(text) => handleUserInput(text, "amount")}
                />
                <Text
                    style={{ width: "95%", fontSize: 17, fontFamily: "Tajawal-Medium" }}
                >
                    المستلم
                </Text>
                <TouchableWithoutFeedback onPress={() => openPanel("user")}>
                    <View
                        style={{
                            ...styles.dateContainer,
                            borderColor: errors.section ? "#c21a0e" : "grey",
                        }}
                    >
                        <Icon
                            as={<MaterialIcons name="lock" />}
                            size={5}
                            ml="2"
                            color="#348578"
                        />
                        <Text style={styles.InputText}> {Donator}</Text>
                    </View>
                </TouchableWithoutFeedback>


            </Stack>
            <Swipable
                title="اختيار المستلم"
                ChooseJob={ChooseDonator}
                data={users.map((t) => ({ title: t.name }))}
                isPanelActive={ReceiverPannel}
                setIsPanelActive={setReceiverPannel}
                setshowButton={setshowButton}
            />
            {ErrorMessageVisible && (
                <View style={styles.ErrorMessage}>
                    <FontAwesome name="exclamation-triangle" size={20} color="#BE123C" />
                    <Text style={styles.errorText}>{ErrorMessage}</Text>
                </View>
            )}
            {showButton && (
                <Button style={styles.Button} mode="contained" onPress={AddActivity}>
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>تعديل</Text>
                </Button>

            )}
       


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
