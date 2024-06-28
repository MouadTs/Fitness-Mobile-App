import React, { useState, useEffect, useContext } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import MainPageHeader from "./MainPageHeader ";
import { UserContext } from "./Context/UsernameContext";
import { styles } from "../styles/MainPagestyle";
import ExerciseSets from "./ExerciceSets";
import { BlurView } from "expo-blur";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";

const Mainpage = () => {
  const { username, difficulty, profilePicture } = useContext(UserContext);
  const [selectedType, setSelectedType] = useState("All");
  const navigation = useNavigation();
  
  const handleTypePress = (type) => {
    setSelectedType(type);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleStatsPress = () => {
    navigation.navigate('Stats');
  };

  return (
    <View style={styles.container}>
      <MainPageHeader userName={username} />

      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.suggestText}>Suggested Workouts</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        
        <ScrollView horizontal>
          <ExerciseSets selectedType={"Biceps"} />
          <ExerciseSets selectedType={"Triceps"} />
          <ExerciseSets selectedType={"Glutes"} />
          <ExerciseSets selectedType={"Hamstrings"} />
          <ExerciseSets selectedType={"chest"} />
          <ExerciseSets selectedType={"Shoulders"} />
          <ExerciseSets selectedType={"Abdominals"} />
          <ExerciseSets selectedType={"Middle back"} />
          <ExerciseSets selectedType={"forearms"} />
          <ExerciseSets selectedType={"Quadriceps"} />
          <ExerciseSets selectedType={"Calves"} />
        </ScrollView>
        
        <View style={styles.textContainer}>
          <Text style={styles.workoutPrograms}>Workout Programs</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        
        <ScrollView horizontal style={styles.typeContainer}>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === "All" && styles.selectedTypeButton]}
            onPress={() => handleTypePress("All")}
          >
            <Text style={styles.typeButtonText}>All types</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === "Upper Body" && styles.selectedTypeButton]}
            onPress={() => handleTypePress("Upper Body")}
          >
            <Text style={styles.typeButtonText}>Upper body</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === "Lower Body" && styles.selectedTypeButton]}
            onPress={() => handleTypePress("Lower Body")}
          >
            <Text style={styles.typeButtonText}>Lower body</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, selectedType === "chest" && styles.selectedTypeButton]}
            onPress={() => handleTypePress("chest")}
          >
            <Text style={styles.typeButtonText}>chest</Text>
          </TouchableOpacity>
        </ScrollView>
        
        {selectedType === "All" && (
          <ScrollView contentContainerStyle={styles.scrolledPrograms}>
            <ExerciseSets selectedType={"Biceps"} />
            <ExerciseSets selectedType={"Triceps"} />
            <ExerciseSets selectedType={"Hamstrings"} />
            <ExerciseSets selectedType={"chest"} />
            <ExerciseSets selectedType={"Glutes"} />
            <ExerciseSets selectedType={"Shoulders"} />
            <ExerciseSets selectedType={"Abdominals"} />
            <ExerciseSets selectedType={"Middle back"} />
            <ExerciseSets selectedType={"Quadriceps"} />
            <ExerciseSets selectedType={"Calves"} />
          </ScrollView>
        )}
        
        {selectedType === "Upper Body" && (
          <ScrollView contentContainerStyle={styles.scrolledPrograms}>
            <ExerciseSets selectedType={"Biceps"} />
            <ExerciseSets selectedType={"Triceps"} />
            <ExerciseSets selectedType={"chest"} />
            <ExerciseSets selectedType={"Shoulders"} />
            <ExerciseSets selectedType={"Abdominals"} />
            <ExerciseSets selectedType={"Middle back"} />
          </ScrollView>
        )}
        
        {selectedType === "Lower Body" && (
          <ScrollView contentContainerStyle={styles.scrolledPrograms}>
            <ExerciseSets selectedType={"Hamstrings"} />
            <ExerciseSets selectedType={"Quadriceps"} />
            <ExerciseSets selectedType={"Calves"} />
            <ExerciseSets selectedType={"Glutes"} />
          </ScrollView>
        )}
        
        {selectedType === "chest" && (
          <ScrollView contentContainerStyle={styles.scrolledPrograms}>
            <ExerciseSets selectedType={"chest"} />
          </ScrollView>
        )}
      </ScrollView>
      <Footer currentPage={"Home"} />
    </View>
  );
};

export default Mainpage;
