import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";

const OrderCard = ({ order, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{order.projectDetails}</Text>
      <Text>Category: {order.category}</Text>
      <Text>Categories: {order.categories}</Text>
      <Text>Location: {order.location}</Text>
      <Text>Date/Time: {order.dateTime}</Text>
      <Text>Proposed Budget: {order.proposedBudget}</Text>
      <View style={styles.buttons}>
        <Button onPress={onEdit}>{"Edit"}</Button>
        <Button onPress={onDelete}>{"Delete"}</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});

export default OrderCard;
