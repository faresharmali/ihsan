import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { SwipeablePanel } from "rn-swipeable-panel";

export default function MultipleOptionSwipable({
  isPanelActive,
  setIsPanelActive,
  setshowButton,
  data,
  title,
  getSelectedData,
  type
}) {
  const [Mydata, setData] = useState(
    data.map((d) => ({ ...d, selected: false }))
  );
  const [Allselected, setAllSelected] = useState({
    selected: false,
    title: "اختيار الكل",
  });
  const panelProps = {
    fullWidth: true,
    openLarge: true,
    closeOnTouchOutside: true,
    showCloseButton: true,

    onClose: () => {
      setIsPanelActive(false);
      setshowButton(true);
      getSelectedData(Mydata.filter((d) => d.selected),type);
    },
    onPressCloseButton: () => {
      setIsPanelActive(false);
      setshowButton(true);
    },
  };
  const SelectData = (selected) => {
    let selectValue = selected.selected ? false : true;
    setData(
      Mydata.map((d) => ({
        ...d,
        selected: d.id == selected.id ? selectValue : d.selected,
      }))
    );
  };
  const selectAll = () => {
    let selectValue = Allselected.selected ? false : true;
    let title = Allselected.selected ? "اختيار الكل" : "حذف الكل";

    setData(
      Mydata.map((d) => ({
        ...d,
        selected: selectValue,
      }))
    );
    setAllSelected({ selected: selectValue, title: title });
  };


  return (
    <SwipeablePanel {...panelProps} isActive={isPanelActive}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => selectAll()}
          style={{
            ...styles.ItemContainer,
            backgroundColor: Allselected.selected ? "#d93030" : "#348578",
            borderColor: Allselected.selected ? "#d93030" : "#348578",
          }}
        >
          <Text style={{ ...styles.Item, color: "#fff" }}>
            {Allselected.title}
          </Text>
        </TouchableOpacity>

        {Mydata.map((d) => (
          <TouchableOpacity
            key={d.id}
            onPress={() => SelectData(d)}
            style={{
              ...styles.ItemContainer,
              backgroundColor: d.selected ? "#348578" : "#fff",
            }}
          >
            <Text
              style={{ ...styles.Item, color: d.selected ? "#fff" : "#000" }}
            >
              {d.title} {d.age && ` / ${d.age} سنة`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SwipeablePanel>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Tajawal-Medium",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    margin: 10,
    color: "#348578",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  ItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#348578",
    borderRadius: 10,
  },
  Item: {
    fontFamily: "Tajawal-Medium",
  },
});
