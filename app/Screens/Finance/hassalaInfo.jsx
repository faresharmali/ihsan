import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    BackHandler
} from "react-native";
import React from "react";
import { Icon } from "native-base";
import {
    MaterialCommunityIcons,
    Ionicons,
} from "@expo/vector-icons";
import { Button } from "react-native-paper";
import DeleteConfirmation from "../../Components/Modals/DeleteConfirmation";
import Toast from "react-native-toast-message";
import toastConfig from "../../Components/ToastConfiguration";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { DeleteHassalaTransaction } from "../../api/Finance";
export default function HassalaInfos({ route, navigation }) {

   

    const [showDelete, setShowDelete] = useState(false)
    let Info = useSelector((state) => state.Finance).hassalat.filter(
        (i) => i.identifier == route.params.data.identifier
    )[0];
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                if (showDelete) {
                    setShowDelete(false);
                    return true;
                } else {
                    return false;
                }
            }
        );
        return () => backHandler.remove();
    }, [showDelete]);

    const deleteHassala=async()=>{
        const res = await DeleteHassalaTransaction(Info)
        if(res.ok){
            navigation.navigate("Hassalat")
        }else{
            console.log("something went")
        }
    }
    return (

        <View style={styles.container}>
  
            <StatusBar style="light" />

            <View style={styles.pageEntity}>
                <View style={styles.IconsContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon as={Ionicons} size={8} color="#fff" name="md-chevron-back" />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("UpdateHassala", { infos: Info })
                    }}>
                        <Icon
                            as={MaterialCommunityIcons}
                            size={8}
                            color="#fff"
                            name="square-edit-outline"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.EntityTitle}>حصالة</Text>
            </View>
            {Info && (

         
           

            <ScrollView
                contentContainerStyle={{ alignItems: "center" }}
                style={styles.Content}
            >
                <View style={styles.ActivityDetails}>
                    <Text style={styles.Text}>
                        <Text style={styles.textTitle}> اسم الحصالة :</Text> {Info.name}
                    </Text>
                    <Text style={styles.Text}>
                        {" "}
                        <Text style={styles.textTitle}>مكان الحصالة : </Text> {Info.location}
                    </Text>

                    <Text style={styles.Text}>
                        {" "}
                        <Text style={styles.textTitle}>المبلغ :</Text> {Info.amount}
                    </Text>
                    <Text style={styles.Text}>
                        <Text style={styles.textTitle}>المسؤول:</Text> {Info.receiver}
                    </Text>
                    <Text style={styles.Text}>
                        {" "}
                        <Text style={styles.textTitle}>التاريخ :</Text> {Info.date
                            ? new Date(Info.date).getFullYear() +
                            "/" +
                            (new Date(Info.date).getMonth() + 1) +
                            "/" +
                            new Date(Info.date).getDate()
                            : ""}

                    </Text>
                    <Text style={styles.Text}>
                        {" "}
                        <Text style={styles.textTitle}>الحالة :</Text> {Info.received ? 'مستلمة' : 'لم يتم الاستلام'}

                    </Text>
                </View>


                {!Info.received && (
                    <Button onPress={() => navigation.navigate("CloseHassala", { infos: Info })} style={styles.Button} mode="contained" >
                        <Text style={{ fontSize: 16, marginLeft: 10 }}>استلام الحصالة</Text>
                    </Button>
                )}

                <Button onPress={() => setShowDelete(true)} style={{...styles.Button,backgroundColor:"#ba2323"}} mode="contained" >
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>حذف الحصالة</Text>
                </Button>


            </ScrollView>
               )}
            {showDelete && <DeleteConfirmation Confirme={deleteHassala} />}
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
    pageEntity: {
        width: "100%",
        maxHeight: "25%",
        backgroundColor: "#348578",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 25,
        paddingBottom: 25,
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
    Content: {
        marginTop: 10,
        width: "100%",
        paddingTop: 10,
    },
    ActivityDetails: {
        width: "95%",
        backgroundColor: "#fff",
        elevation: 1,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
    },
    People: {
        width: "95%",
        borderRadius: 10,
        padding: 10,
    },
    Text: {
        fontSize: 17,
        fontFamily: "Tajawal-Medium",
    },
    title: {
        fontSize: 20,
        fontFamily: "Tajawal-Medium",
        margin: 15,
        width: "100%",
        textAlign: "center",
    },
    textTitle: {
        color: "#348578",
    },
    Button: {
        flexDirection: "row-reverse",
        height: 50,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#348578",
        marginTop: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1.41,
        elevation: 6,
    },
});
