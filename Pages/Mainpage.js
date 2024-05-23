import React, { useState, useEffect, useContext } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import MainPageHeader from "./MainPageHeader ";
import { UserContext } from "./Context/UsernameContext";
import { styles } from "../styles/MainPagestyle";
import ExerciseSets from "./ExerciceSets";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { BlurView } from "expo-blur";

import { useNavigation } from "@react-navigation/native";

const Mainpage = () => {
  const { username, difficulty,profilePicture} = useContext(UserContext);
  const [selectedType, setSelectedType] = useState("All"); // Define selectedType state
 const navigation = useNavigation();
  const handleTypePress = (type) => {
    setSelectedType(type);
  };
  const handleProfilePress=()=>{
    navigation.navigate('Profile');
  }
  const handleStatsPress=()=>{
    navigation.navigate('Stats');
  }

  return (
    <View style={styles.container}>
      <MainPageHeader userName={username} />

      <ScrollView >
        <View style={styles.Textcontainer}>
          <Text style={styles.suggesttext}>Suggested Workouts</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <ScrollView horizontal>
        <ExerciseSets selectedType={"Biceps"}></ExerciseSets>
        <ExerciseSets selectedType={"Triceps"}></ExerciseSets>
        <ExerciseSets selectedType={"hamstrings"}></ExerciseSets>
        <ExerciseSets selectedType={"chest"}></ExerciseSets>
        <ExerciseSets selectedType={"shoulders"}></ExerciseSets>
</ScrollView>
        <View style={styles.Textcontainer}>
          <Text style={styles.WorkoutPrograms}>Workouts Programs</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <ScrollView horizontal style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === "All" && styles.selectedTypeButton
            ]}
            onPress={() => handleTypePress("All")}
          >
            <Text style={styles.typeButtonText}>All type</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === "Upper Body" && styles.selectedTypeButton
            ]}
            onPress={() => handleTypePress("Upper Body")}
          >
            <Text style={styles.typeButtonText}>Upper body</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === "Lower Body" && styles.selectedTypeButton
            ]}
            onPress={() => handleTypePress("Lower Body")}
          >
            <Text style={styles.typeButtonText}>Lower Body</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              selectedType === "Chest" && styles.selectedTypeButton
            ]}
            onPress={() => handleTypePress("Chest")}
          >
            <Text style={styles.typeButtonText}>Chest</Text>
          </TouchableOpacity>
        </ScrollView>
        {selectedType === "All" && (
          <ScrollView contentContainerStyle={styles.scrolledPrograms} >
            <ExerciseSets selectedType={"Biceps"} />
            <ExerciseSets selectedType={"Triceps"} />
            <ExerciseSets selectedType={"hamstrings"} />   
            <ExerciseSets selectedType={"chest"}/>
            <ExerciseSets selectedType={"shoulders"} />


          </ScrollView>
        )}
        {selectedType === "Upper Body" && (
          <ScrollView  contentContainerStyle={styles.scrolledPrograms}>
            <ExerciseSets selectedType={"Biceps"} />
            <ExerciseSets selectedType={"Triceps"} />
            <ExerciseSets selectedType={"chest"} />
            <ExerciseSets selectedType={"shoulders"} />


          </ScrollView>
        )}
        {selectedType === "Lower Body" && (
          <ScrollView  contentContainerStyle={styles.scrolledPrograms}l>
            
            <ExerciseSets selectedType={"hamstrings"} />   

          </ScrollView>
        )}
        {selectedType === "Chest" && (
          <ScrollView  contentContainerStyle={styles.scrolledPrograms}l>
            
            <ExerciseSets selectedType={"chest"} />   

          </ScrollView>
        )}

        {/* Add similar conditional rendering for other types */}
      </ScrollView>
      <View style={styles.footerContainer}>
        <BlurView intensity={40} style={styles.blurContainer} />
        <TouchableOpacity style={styles.footerButton}>
        <Ionicons name="home" size={24} color="#63c138" />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <SimpleLineIcons name="energy" size={24} color="white" />
          <Text style={styles.footerButtonText}>Programs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleStatsPress}>
          <Ionicons name="stats-chart" size={24} color="white" />
          <Text style={styles.footerButtonText}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleProfilePress}>
          <MaterialCommunityIcons name="face-man-profile" size={24} color="white" />
          <Text style={styles.footerButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default Mainpage;
