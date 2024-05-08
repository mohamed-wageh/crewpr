import { View, Text, StyleSheet, Pressable } from "react-native";
import React from 'react'

const CategoryCard = ({title,onPress}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    height: 150,
    width: 150,
    borderRadius: 16,
    backgroundColor: "#29bac7",
  },
  button: { flex: 1 },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    fontSize: 20,
  },
});