import { StyleSheet } from "react-native";
module.exports = StyleSheet.create({
  Container: {
    backgroundColor: "#f5f5f5",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
  },
  BottomBar: {
    backgroundColor: "#348578",
    width: "100%",
    height: 50,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  bottomBarITem: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBarITemText: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Tajawal-Medium",
    fontSize: 12,
  },
  Circle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    backgroundColor: "#348578",
    borderRadius: 35,
    shadowColor: "#000",
    elevation: 3,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
