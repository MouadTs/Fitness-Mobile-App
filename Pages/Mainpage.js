import React, { useState, useEffect,useContext } from "react";
import { Text, View,TextInput,TouchableOpacity} from "react-native";
import {Ionicons } from "@expo/vector-icons"; // Import appropriate icons
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from "react-native-responsive-screen";
import MainPageHeader from "./MainPageHeader ";
import { UsernameContext } from "./Context/UsernameContext";
import {styles} from "../styles/MainPagestyle";

const Mainpage = () => {
  const { username } = useContext(UsernameContext);
  const [selectedButton, setSelectedButton] = useState("beginner");

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
            selectedButton === "beginner" ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => handleButtonPress("beginner")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === "beginner" ? styles.buttonTextSelected : styles.buttonTextUnselected,
            ]}
          >
            Beginner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "intermediate" ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => handleButtonPress("intermediate")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === "intermediate" ? styles.buttonTextSelected : styles.buttonTextUnselected,
            ]}
          >
            Intermediate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "expert" ? styles.selectedButton : styles.unselectedButton,
          ]}
          onPress={() => handleButtonPress("expert")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === "expert" ? styles.buttonTextSelected : styles.buttonTextUnselected,
            ]}
          >
            Expert
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Mainpage;
