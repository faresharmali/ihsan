import { Text, View, Image } from "react-native";
import styles from "../Styles";
import Logo from "../../assets/Logo2.png";
import { Input, Stack, Icon } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Button } from "react-native-paper";

export default function Login() {
  const Login = () => {
    alert("wassup");
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.Logo} source={Logo} />
        <Text style={styles.LoginTitle}>جمعية إحسان لكفالة الأيتام </Text>
      </View>
      <View style={styles.FormContainer}>
        <Text style={styles.LoginSecondTitle}>تسجيل الدخول</Text>

        <Stack space={4} w="100%" alignItems="center">
          <Input
            InputRightElement={
              <Icon
                style={{ marginRight: 10 }}
                as={<MaterialIcons name="account-circle" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            style={styles.input}
            w={{
              base: "90%",
              md: "25%",
            }}
            h={55}
            textAlign="right"
            placeholder="اسم المستخدم"
          />
          <Input
            InputRightElement={
              <Icon
                style={{ marginRight: 10 }}
                as={<MaterialIcons name="lock" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            w={{
              base: "90%",
              md: "25%",
            }}
            h={55}
            textAlign="right"
            placeholder="كلمة المرور"
          />
        </Stack>
        <Button style={styles.Button} mode="contained" onPress={() => Login()}>
          <Text style={{ fontSize: 16, marginLeft: 10 }}>
            تسجيل الدخول 
          </Text>
        </Button>
        <Text style={styles.ForgotPassword}>نسيت كلمة المرور ؟ اتصل بنا </Text>
      </View>
    </View>
  );
}
