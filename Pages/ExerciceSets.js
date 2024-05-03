import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { UserContext } from "./Context/UsernameContext";

const ExerciseSets = () => {
  const navigation = useNavigation();
  const { username, difficulty } = useContext(UserContext);
  console.log("7di 7di: ",username, difficulty);
  const exerciseSets = [
    { id: 1, name: "Biceps",description:"Biceps Work out", diff:difficulty , time: "15 min", calories: "120", image: require("../assets/SetsPictures/GirlBiceps.jpg") },
    { id: 2, name: "Triceps",description:"Back Work out", diff:difficulty , time: "20 min", calories: "150", image: require("../assets/SetsPictures/384ec45aa85105c4ebfcad17827f9d29.jpg") },
    { id: 3, name: "Back",description:"Legs Work out", diff:difficulty , time: "25 min", calories: "180", image: require("../assets/SetsPictures/384ec45aa85105c4ebfcad17827f9d29.jpg") },
    // Add more exercise sets with their respective image paths
  ];

  const handleExerciseSetPress = (exerciseSet) => {
    navigation.navigate("ExerciseList", { exerciseSet });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} horizontal>
      {exerciseSets.map((set) => (
        <TouchableOpacity key={set.id} onPress={() => handleExerciseSetPress(set)} style={styles.card}>
          <ImageBackground
            source={set.image}
            style={styles.imageBackground}
          >
            <View style={styles.overlay}>
              <Text style={styles.title}>{set.description}</Text>
              <Text style={styles.details}>Difficulty: {set.diff}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                <AntDesign name="caretright" size={18} color="black" />
                  <Text style={styles.buttonText}>{set.time}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                <FontAwesome5 name="gripfire" size={18} color="black" />
                  <Text style={styles.buttonText}>{set.calories} cal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    width: 300,
    height: 250,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 90,
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  buttonContainer: {
  flexDirection: "row",
  alignItems: "center", // Align items vertically in the center
  
},

  button: {
    flexDirection: "row",
    backgroundColor: "#e1ddee",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",

  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ExerciseSets;
