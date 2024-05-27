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
        <ExerciseSets selectedType={"Glutes"}></ExerciseSets>
        <ExerciseSets selectedType={"hamstrings"}></ExerciseSets>
        <ExerciseSets selectedType={"chest"}></ExerciseSets>
        <ExerciseSets selectedType={"shoulders"}></ExerciseSets>
        <ExerciseSets selectedType={"Abdominals"}></ExerciseSets>
        <ExerciseSets selectedType={"Middle back"}></ExerciseSets>
        <ExerciseSets selectedType={"Quadriceps"}></ExerciseSets>
        <ExerciseSets selectedType={"Calves"}></ExerciseSets>
        
        

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
            <ExerciseSets selectedType={"Glutes"}/>
            <ExerciseSets selectedType={"shoulders"} />
            <ExerciseSets selectedType={"Abdominals"}/>
        <ExerciseSets selectedType={"Middle back"}/>
        <ExerciseSets selectedType={"Quadriceps"}/>
        <ExerciseSets selectedType={"Calves"}/>
        


          </ScrollView>
        )}
        {selectedType === "Upper Body" && (
          <ScrollView  contentContainerStyle={styles.scrolledPrograms}>
            <ExerciseSets selectedType={"Biceps"} />
            <ExerciseSets selectedType={"Triceps"} />
            <ExerciseSets selectedType={"chest"} />
            <ExerciseSets selectedType={"shoulders"} />
            <ExerciseSets selectedType={"Abdominals"}/>
        <ExerciseSets selectedType={"Middle back"}/>


          </ScrollView>
        )}
        {selectedType === "Lower Body" && (
          <ScrollView  contentContainerStyle={styles.scrolledPrograms}l>
            
            <ExerciseSets selectedType={"hamstrings"} />   
            <ExerciseSets selectedType={"Quadriceps"}/>
        <ExerciseSets selectedType={"Calves"}/>
        <ExerciseSets selectedType={"Glutes"}/>

          </ScrollView>
        )}
        {selectedType === "Chest" && (
          <ScrollView  contentContainerStyle={styles.scrolledPrograms}l>
            
            <ExerciseSets selectedType={"chest"} />   

          </ScrollView>
        )}

        {/* Add similar conditional rendering for other types */}
      </ScrollView>
      <Footer currentPage={"Home"}></Footer>

    </View>
  );
};

export default Mainpage;
