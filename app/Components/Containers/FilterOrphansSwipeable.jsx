import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Stack } from "native-base";
import { Icon } from "native-base";
import {
    MaterialCommunityIcons,
    Ionicons,
    AntDesign,
} from "@expo/vector-icons";
import { Button } from "react-native-paper";

export default function AgeFilterModal({ kafel, userInfos, confirm }) {
    const styling = {
        borderColor: "#000",
        borderWidth: 0.5,
        fontSize: 15,
    };
    const [errors, SetErrors] = useState({
        min: false,
        max: false,
    });

    const [InputText, setInputText] = useState({ min: "", max: "" })
    return (
        <View style={styles.Modal}>
            <View style={styles.ModalContent}>
                <Stack space={4} w="100%" alignItems="center">
                    <Text style={styles.title}>اختيار العمر</Text>
                    <Input

                        w={{
                            base: "95%",
                            md: "25%",
                        }}
                        h={50}
                        textAlign="right"
                        placeholder="من"
                        {...styling}
                        borderWidth={1}
                        borderColor={errors.min ? "#c21a0e" : "grey"}
                        onChangeText={(text) => setInputText({ ...InputText, min: text })}
                    />

                    <Input

                        w={{
                            base: "95%",
                            md: "25%",
                        }}
                        h={50}
                        textAlign="right"
                        placeholder="الى"
                        {...styling}
                        borderWidth={1}
                        borderColor={errors.max ? "#c21a0e" : "grey"}
                        onChangeText={(text) => setInputText({ ...InputText, max: text })}
                    />
                </Stack>

                <Button
                    onPress={()=>confirm(InputText)}
                    style={styles.Button}
                    mode="contained"
                >
                    <Text style={{ fontSize: 16, marginLeft: 10 }}>تأكيد</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Modal: {
        position: "absolute",
        backgroundColor: "#000000A8",
        height: "115%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        left: 0,
        zIndex: 10,
    },
    ModalContent: {
        paddingTop: 30,
        paddingBottom: 30,
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        zIndex: 11,
        opacity: 1,
        elevation: 2
    },
    ModalText: {
        fontFamily: "Tajawal-Medium",
        fontSize: 17,
        color: "#000",
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
    title: {
        fontFamily: "Tajawal-Medium",
        fontSize: 17,
        color: "#348578",

    }
});
