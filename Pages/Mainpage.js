import React, { useState, useEffect,useContext } from "react";
import { Text, View,TextInput,TouchableOpacity} from "react-native";
import {Ionicons } from "@expo/vector-icons"; // Import appropriate icons
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from "react-native-responsive-screen";
import MainPageHeader from "./MainPageHeader ";
import { UserContext } from "./Context/UsernameContext";
import {styles} from "../styles/MainPagestyle";
import ExerciseSets from "./ExerciceSets";
const Mainpage = () => {
  const { username, difficulty } = useContext(UserContext);
  const [selectedButton, setSelectedButton] = useState("beginner");
  console.log("so3oba",difficulty);

  const handleButtonPress = (buttonType) => {
    setSelectedButton(buttonType);
  };

  return (
    <View style={styles.container}>
      <MainPageHeader userName={username} />
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity>
          <Ionicons name="search" size={wp(8)} color="#16161b" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            difficulty === "Beginner" ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => handleButtonPress("beginner")}
        >
          <Text
            style={[
              styles.buttonText,
              difficulty === "Beginner" ? styles.buttonTextSelected : styles.buttonTextUnselected,
            ]}
          >
            Beginner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            difficulty === "Intermediate" ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => handleButtonPress("intermediate")}
        >
          <Text
            style={[
              styles.buttonText,
              difficulty === "Intermediate" ? styles.buttonTextSelected : styles.buttonTextUnselected,
            ]}
          >
            Intermediate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            difficulty === "Expert" ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => handleButtonPress("expert")}
        >
          <Text
            style={[
              styles.buttonText,
              difficulty === "Expert" ? styles.buttonTextSelected : styles.buttonTextUnselected,
            ]}
          >
            Expert
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.suggesttext}>Suggested Workouts:</Text>
      <ExerciseSets></ExerciseSets>
    </View>
  );
};

export default Mainpage;
