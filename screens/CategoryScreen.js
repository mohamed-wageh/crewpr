import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";
import CategoryCard from "../components/ui/CategoryCard";
import { useNavigation } from "@react-navigation/native";

const CategoryScreen = () => {
  const [fetchedMessage, setFetchedMesssage] = useState("");
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
const onPressHandler = (item) => {
  navigation.navigate("FreelancerScreen", { category: item });
};

  const categories = ["FreeLancer", "Company"];
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryCard title={item} onPress={() => onPressHandler(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default CategoryScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:150
  },
  itemContainer: {
    margin: 5,
  },
});
