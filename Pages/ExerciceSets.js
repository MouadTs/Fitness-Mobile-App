import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { UserContext } from "./Context/UsernameContext";

const ExerciseSets = ({ selectedType }) => {
  const navigation = useNavigation();
  const { username, difficulty } = useContext(UserContext);
  const exerciseSets = [
    { id: 1, name: "Biceps", description: "Biceps Work out", diff: difficulty, time: "15 min", descText: "Get ready to sculpt those arms with our intense biceps set! This targeted workout focuses on building strength and definition in your biceps, helping you achieve those coveted arm gains. With a mix of challenging exercises designed to isolate and maximize bicep activation, this set will leave you feeling pumped and energized. Get ready to flex your hard-earned muscles!", calories: "120", image: require("../assets/SetsPictures/GirlBiceps.jpg"), type: "Upper Body" },
    { id: 2, name: "Triceps", description: "Triceps Work out", diff: difficulty, time: "20 min", descText: "Ready to tone and define your triceps? Our triceps set is here to help you achieve sleek, sculpted arms. Targeting the muscles on the back of your upper arm, this workout features a variety of exercises carefully chosen to maximize triceps engagement and strength. From skull crushers to triceps dips, each movement is designed to challenge and tone, leaving you with arms you'll love to show off. Say goodbye to arm jiggle and hello to firm, defined triceps", calories: "150", image: require("../assets/SetsPictures/ebebc39b7dab560637bf775ab0c902e3.jpg"), type: "Upper Body" },
    { id: 3, name: "Legs", description: "Legs Work out", diff: difficulty, time: "25 min", descText: "Transform your lower body with our dynamic leg set! This workout is designed to target every muscle group in your legs, from your quads and hamstrings to your calves and glutes. With a mix of squats, lunges, and leg presses, you'll feel the burn as you build strength, endurance, and definition. Whether you're aiming for stronger legs, better balance, or a more sculpted physique, this set has you covered. Get ready to power through and unleash the strength and stability of your lower body!", calories: "180", image: require("../assets/SetsPictures/legs.jpg"), type: "Lower Body" },
    { id: 4, name: "Chest", description: "Legs Work out", diff: difficulty, time: "25 min", descText: "Transform your lower body with our dynamic leg set! This workout is designed to target every muscle group in your legs, from your quads and hamstrings to your calves and glutes. With a mix of squats, lunges, and leg presses, you'll feel the burn as you build strength, endurance, and definition. Whether you're aiming for stronger legs, better balance, or a more sculpted physique, this set has you covered. Get ready to power through and unleash the strength and stability of your lower body!", calories: "180", image: require("../assets/SetsPictures/legs.jpg"), type: "Lower Body" },
    // Add more exercise sets with their respective image paths and types
  ];

  const filteredSets = selectedType === "All" ? exerciseSets : exerciseSets.filter(set => set.name === selectedType);

  const handleExerciseSetPress = (exerciseSet) => {
    navigation.navigate("ExerciseList", { exerciseSet });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} horizontal>
      {filteredSets.map((set) => (
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
    width: 340,
    height: 280,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "center",
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
