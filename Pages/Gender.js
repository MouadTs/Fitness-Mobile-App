import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../styles/Genderstyle";
import { FontAwesome } from '@expo/vector-icons';
import BackButton from "../assets/SmallComponent/BackButton";
import NextButton from "../assets/SmallComponent/NextButton";
import { useNavigation } from "@react-navigation/native"; //navigation

const Gender = () => {
    const [selectedGender, setSelectedGender] = useState(null);

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };
    const navigation = useNavigation(); // Initialize navigation object
    const handleBackbutton=()=>{
        navigation.navigate('CreateAccount');
    }
    const handleNextbutton=()=>{
        navigation.navigate('Age');
    }


    return (
        <View style={styles.container}>
            <Text style={styles.tagline1}>Tell us about yourself!</Text>
            <Text style={styles.tagline}>Please choose your gender to continue. We value your uniqueness!</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.genderButton, selectedGender === 'male' && styles.selected]}
                    onPress={() => handleGenderSelect('male')}
                >
                    <FontAwesome name="mars" size={62} color={selectedGender === 'male' ? "black" : "white"} />

                    <Text style={[styles.gendertext,selectedGender === 'male' && styles.selectedText]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.genderButton, selectedGender === 'female' && styles.selected]}
                    onPress={() => handleGenderSelect('female')}
                >
                    <FontAwesome name="venus" size={62}  color={selectedGender === 'female' ? "black" : "white"}/>
                    <Text style={[styles.gendertext,selectedGender === 'female' && styles.selectedText]}>Female</Text>
                    
                </TouchableOpacity>
            </View>
            <View style={styles.backbutton}><BackButton onPress={handleBackbutton}></BackButton></View>
            <View style={styles.nextbutton}><NextButton onPress={handleNextbutton}></NextButton></View>
        </View>
    )
}

export default Gender;
