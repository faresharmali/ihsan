import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome5, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import toastConfig from "../../Components/ToastConfiguration";
import Toast from "react-native-toast-message";
import { getTransactions } from "../../api/Finance";
import styles from "./styles";
import TransactionContainer from "../../Components/TransactionContainer";
import ActivitiesSectionBottomBar from "../../Navigation/ActivitiesSectionBottomBar";
import KofaSectionBottomBar from "../../Navigation/KofaSectionBottomBar";
import EducationSectionBottomBar from "../../Navigation/EducationSectionBottomBar";
import HealthSectionBottomBar from "../../Navigation/HealthSectionBottomBar";
import WidowSectionBottomBar from "../../Navigation/WidowSectionBottomBar";
import OrpahnsSectionBottomBar from "../../Navigation/OrpahansSectionBottomBar";
export default function FinanceView({ route, navigation, drawer }) {
    const [active, setActive] = useState(1);
    const [displayedData, setDisplayedData] = useState([]);
    const [AllTransactions, seAllTransactions] = useState([]);
    const [filterBy, setfilterBy] = useState(true);
    const dispatch = useDispatch();
    const updateState = (data) => {
        return {
            type: "UpdateTransactions",
            data: data,
        };
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {
            const res = await getTransactions();
            dispatch(updateState(res.data.result));
        });
        return unsubscribe;
    }, [navigation]);
    let Transactions = useSelector((state) => state.Finance).transactions
    
    useEffect(() => {
        seAllTransactions(Transactions);
        setDisplayedData(Transactions.filter((t) => t.income == filterBy && t.section==route.params.section));
    }, [Transactions]);

    const openTransaction = (id) => {
        setfilterBy(type)
        navigation.navigate("Transaction", { id, type: "مدخول" });
    };

    const filterData = (type) => {
        setfilterBy(type)
        setDisplayedData(AllTransactions.filter((t) => t.income == type && t.section==route.params.section));
    };
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
                    <Text style={styles.ScreenEntityTitle}>المالية : {route.params.section}</Text>
                    <FontAwesome5 name="hand-holding-heart" size={25} color="#fff" />
                </View>
            </View>
            <View style={styles.containerFilter}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        filterData(true);
                        setActive(1);
                    }}
                >
                    <View
                        style={{
                            ...styles.filterItem,
                            backgroundColor: active == 1 ? "#348578" : "#fff",
                        }}
                    >
                        <Text
                            style={{
                                ...styles.filterText,
                                color: active == 1 ? "#fff" : "#000",
                            }}
                        >
                            المداخيل
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => {
                        filterData(false);
                        setActive(2);
                    }}
                >
                    <View
                        style={{
                            ...styles.filterItem,
                            backgroundColor: active == 2 ? "#348578" : "#fff",
                        }}
                    >
                        <Text
                            style={{
                                ...styles.filterText,
                                color: active == 2 ? "#fff" : "#000",
                            }}
                        >
                            المصاريف{" "}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.Section}>
                <ScrollView style={styles.Content}>
                    {displayedData.map((transaction) => (
                        <TransactionContainer
                            key={transaction.identifier}
                            open={openTransaction}
                            data={transaction}
                            icon={<Icon
                                as={MaterialCommunityIcons}
                                name={active == 1 ? "bank-transfer-in" : "bank-transfer-out"}
                                size={35}
                                color="#348578"
                            />}
                        />
                    ))}
                </ScrollView>
            </View>
            <Toast config={toastConfig} />
            <TouchableOpacity
                onPress={() => navigation.navigate(active == 1 ? route.params.incomeRoute : route.params.outcomeRoute, { section: route.params.section })}
                style={styles.fab}
            >
                <Icon as={Entypo} name="plus" size={8} color="#fff" />
            </TouchableOpacity>
            {route.params.navigator == "activities" && <ActivitiesSectionBottomBar navigation={navigation} />}
            {route.params.navigator == "kofa" && <KofaSectionBottomBar navigation={navigation} />}
            {route.params.navigator == "Widow" && <WidowSectionBottomBar navigation={navigation} />}
            {route.params.navigator == "Education" && <EducationSectionBottomBar navigation={navigation} />}
            {route.params.navigator == "Health" && <HealthSectionBottomBar navigation={navigation} />}
            {route.params.navigator == "Orphans" && <OrpahnsSectionBottomBar navigation={navigation} />}
        </View>
    );
}
