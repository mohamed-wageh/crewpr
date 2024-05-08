import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DeleteOrder, getOrders } from "../util/http";
import { AuthContext } from "../store/auth-context";
import OrderCard from "../components/ui/OrderCard ";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const ActivesOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrders(token);
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token, isFocused]);

  const handleEdit = (orderId) => {
    navigation.navigate("OrderDetailsScreen", { orderId });
  };

  const handleDelete = async (orderId) => {
    try {
      await DeleteOrder(orderId, token);
      const newData = await getOrders(token);
      setOrders(newData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {orders.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.noOrdersText}>No orders available</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <OrderCard
              order={item.data}
              onEdit={() => handleEdit(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  noOrdersText: {
    fontSize: 24,
    color: "white",
  },
});

export default ActivesOrdersScreen;
