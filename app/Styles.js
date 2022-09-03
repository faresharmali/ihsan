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
    backgroundColor: "#DFE0E3",
    minHeight: "100%",
  },
  illustationContainer:{
    width:"100%",
    height:400,
    backgroundColor:"#348578",
    position:"absolute",
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
  },
  FormContainer: {
    backgroundColor: "#fff",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
    color: "#fff",
    margin: 0,
    fontFamily: "Amiri-Bold",
  },
  Logo: {
    width: 90,
    height: 129,
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
  LoginSecondTitle: {
    fontSize: 25,
    marginBottom: 10,
    color: "#313552",
    fontFamily: "Tajawal-Medium",
  },
  ForgotPassword: {
    marginTop: 20,
    fontSize: 15,
    fontFamily: "Tajawal-Medium",
  },
  secondTitle: {
    marginBottom: 25,
    fontSize: 15,
    fontFamily: "Tajawal-Medium",
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
  errorText:{
    fontFamily: "Tajawal-Medium",
    marginRight:10,
    fontSize:13
  },
  LoadingContainer:{
   flex:1,
   justifyContent:"center",
   alignItems:"center"
  }
});
