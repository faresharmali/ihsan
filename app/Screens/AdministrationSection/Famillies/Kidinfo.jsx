import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { getAge } from "../../../Components/Print";
export default function KidInfo({ data }) {
 

  return (
    <View style={styles.InfosContainer}>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>
          الاسم و اللقب : {data.name + " " + data.lastName}{" "}
        </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="users" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>الجنس : {data.gender} </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="users" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>العمر : {getAge(data.year + "-" + data.month + "-" + data.day)} </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="users" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>المستوى الدراسي : {data.scolarity} </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="users" />
      </View>
      <View style={styles.Info}>
        <Text style={styles.InfoText}>
          يعاني من مرض مزمن : {data.sick ? "نعم" : "لا"}{" "}
        </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="users" />
      </View>
      {data.sick && (
        <View style={styles.Info}>
          <Text style={styles.InfoText}>المرض: {data.sickness}</Text>
          <Icon as={FontAwesome} size={6} color="#348578" name="users" />
        </View>
      )}
      <View style={styles.Info}>
        <Text style={styles.InfoText}>
          يستفيد من دروس الدعم : {data.Education ? "نعم" : "لا"}{" "}
        </Text>
        <Icon as={FontAwesome} size={6} color="#348578" name="users" />
      </View>
      {data.Education && (
        <View style={styles.Info}>
          <Text style={styles.InfoText}>
            المواد:{" "}
            {data.modules &&
              JSON.parse(data.modules).map((d) => d.title + ", ")}
          </Text>
          <Icon as={FontAwesome} size={6} color="#348578" name="users" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  InfosContainer: {
    width: "90%",

    backgroundColor: "#fff",
    marginTop: 60,
    elevation: 1,
    borderRadius: 15,
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  Info: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    margin: 10,
    fontSize: 20,
    fontFamily: "Tajawal-Medium",
  },
  InfoText: {
    margin: 10,
    fontSize: 16,
    fontFamily: "Tajawal-Medium",
  },
});
