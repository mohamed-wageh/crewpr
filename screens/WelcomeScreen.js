import { StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/styles";

function WelcomeScreen() {

  const navigation = useNavigation();

  function submitHandler() {
    navigation.navigate("LoginScreen");
  }
  return (
    <View style={[styles.rootContainer]}>
      <View style={styles.circle}>
        <Text style={styles.title}>Crewpr</Text>
      </View>
      <View style={styles.buttons}>
        <Button
          backgroundStyle={{ backgroundColor: "#323e56" }}
          onPress={submitHandler}
          textStyle={{color:"#29bac7"}}
        >
          {"next"}
        </Button>
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#29bac7",
  },
  circle: {
    justifyContent: "center",
    borderRadius: 999,
    width: 200,
    height: 200,
    borderColor: "#29bac7",
    borderWidth: 2,
    backgroundColor: "#323e56",
  },
  buttons:{
    marginTop:40,
    width:200,
  }, 
});
