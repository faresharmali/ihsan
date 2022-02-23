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
    paddingBottom: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7F3F",
    minHeight: "35%",
  },
  FormContainer: {
    backgroundColor: "#fff",
    top: -30,
    zIndex: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  LoginTitle: {
    fontSize: 25,
    margin: 10,
    fontWeight: "700",
    color: "#fff",
  },
  Logo: {
    width: 100,
    height: 100,
  },
  input: {
    height: 150,
    width: 300,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "right",
    backgroundColor: "red",
  },
  Button: {
    flexDirection: "row-reverse",
    height: 50,
    width: 230,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF7F3F",
    marginTop: 10,
    borderRadius: 60,
  },
  LoginSecondTitle: {
    fontSize: 25,
    marginBottom: 10,
    color: "#313552",
  },
  ForgotPassword: {
    marginTop: 20,
    fontSize: 16,
  },
});
