import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useContext, useState } from "react";
import Input from "../components/Auth/Input";
import Button from "../components/ui/Button";
import { AuthContext } from "../store/auth-context";
import { sendRequest, updateOrder } from "../util/http";
import { useNavigation } from "@react-navigation/native";

const OrderDetailsScreen = ({ route }) => {
  const [projectDetails, setProjectDetails] = useState("");
  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [proposedBudget, setProposedBudget] = useState("");
  const orderId = route.params?.orderId;
  const category = route.params?.category;
  const categories = route.params?.categories;
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const navigation = useNavigation();
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "projectDetails":
        setProjectDetails(enteredValue);
        break;
      case "location":
        setLocation(enteredValue);
        break;
      case "dateTime":
        setDateTime(enteredValue);
        break;
      case "proposedBudget":
        setProposedBudget(enteredValue);
        break;
    }
  }
  function submitHandler() {
    if (!projectDetails || !location || !dateTime || !proposedBudget) {
      Alert.alert("Invalid input", "All fields are required!");
      return;
    }
    const requestData = {
      projectDetails: projectDetails,
      location: location,
      dateTime: dateTime,
      proposedBudget: proposedBudget,
      category: category,
      categories: categories,
    };
    if (orderId) {
      updateOrder(orderId, requestData, token);
    } else{
      sendRequest(requestData, token);
    }
    navigation.navigate("ActivesOrdersScreen");
  }
  return (
    <View style={styles.container}>
      <Input
        label="Tell Us What Is Your Project"
        onUpdateValue={updateInputValueHandler.bind(this, "projectDetails")}
        value={projectDetails}
        placeholder={"Tell Us What Is Your Project"}
      />
      <Input
        label="Location"
        onUpdateValue={updateInputValueHandler.bind(this, "location")}
        value={location}
        placeholder={"Location"}
      />
      <Input
        label="Date/Time"
        onUpdateValue={updateInputValueHandler.bind(this, "dateTime")}
        value={dateTime}
        placeholder={"Date/Time"}
      />
      <Input
        label="Proposed Budget"
        onUpdateValue={updateInputValueHandler.bind(this, "proposedBudget")}
        value={proposedBudget}
        placeholder={"Proposed Budget"}
      />
      <View style={styles.buttons}>
        <Button onPress={submitHandler}>{orderId ?"update Order" :"Send Request"}</Button>
      </View>
    </View>
  );
};

export default OrderDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttons: {
    marginTop: 12,
  },
});
