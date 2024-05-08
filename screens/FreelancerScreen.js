import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React from "react";
import Button from "../components/ui/Button";
import CategoryCard from "../components/ui/CategoryCard";
import { useNavigation } from "@react-navigation/native";

const FreelancerScreen = ({route}) => {
  const navigation = useNavigation();
  const category = route.params?.category;
  const categories = [
    "VIDEOMAN",
    "ACTOR",
    "MODEL",
    "EDITOR",
    "GRAPHIC DESIGNER",
    "DIRECTOR",
  ];

    const onPressHandler = (item) => {
      navigation.navigate("OrderDetailsScreen", {
        category: category,
        categories: item,
      });
    };
    const navigationHandler = () => {
      navigation.navigate("ActivesOrdersScreen");
    };


  return (
    <View style={styles.rootContainer}>
      <Button
        backgroundStyle={{
          backgroundColor: "#323e56",
          width: 250,
          borderRadius: 20,
        }}
        onPress={navigationHandler}
        textStyle={{ color: "#29bac7" }}
      >
        {"Active Orders"}
      </Button>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <CategoryCard title={item} onPress={() => onPressHandler(item)} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
        numColumns={2}
      />
    </View>
  );
};

export default FreelancerScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // margin: 32,
    // backgroundColor:"red"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  flatListContainer: {
    marginTop: 10,
  },
  itemContainer: {
    margin: 5,
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
  buttons: {
    marginTop: 40,
    width: 400,
  },
});
