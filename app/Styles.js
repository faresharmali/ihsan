import { StyleSheet } from "react-native";
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  // login page Design :
  logoContainer: {
    paddingTop: "15%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    minHeight: "100%",
  },
  FormContainer: {
    backgroundColor: "#fff",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,

    elevation: 1.5,
  },
  LoginTitle: {
    fontSize: 25,
    margin: 10,
    color: "#000",
    margin: 0,
    fontFamily: "Amiri-Bold",
  },
  Logo: {
    width: 85,
    height: 125,
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
  LoginSecondTitle: {
    fontSize: 25,
    marginBottom: 10,
    color: "#313552",
    fontFamily:"Tajawal-Medium"
  },
  ForgotPassword: {
    marginTop: 20,
    fontSize: 15,
    fontFamily:"Tajawal-Medium"

  },
  secondTitle: {
    marginBottom: 25,
    fontSize: 15,
    fontFamily:"Tajawal-Medium"

  },
});
