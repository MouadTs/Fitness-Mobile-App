import React, { useState,useContext} from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import BackButton from "../assets/SmallComponent/BackButton";
import NextButton from "../assets/SmallComponent/NextButton";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "./Context/UsernameContext";
import axios from "axios";
import config from "../Backend/config";

const Weight = () => {
    const [selectedWeight, setSelectedWeight] = useState(60);
    const { userId,setWeight} = useContext(UserContext); // Access userId from context
    const navigation = useNavigation();

    const handleBackbutton = () => {
        navigation.navigate('Age');
    }
    const handleNextbutton=()=>{
        navigation.navigate('ChooseGoal');
    }

    const handleWeightSelection = async (weight) => {
        if (!selectedWeight) {
            Alert.alert('Please select a weight');
            return;
        }
        try {
            
            setWeight(weight);// Pour le context 
            const response = await axios.post(`${config.apiBaseUrl}/auth/Weight`, { userId, weight });
            if (response.data && response.data.weight !== undefined) {
                console.log("Weight is: ", response.data.weight);
                setSelectedWeight(weight);
                console.log("weight updated successfully");
            } 
        } catch (error) {
            console.error('Error updating weight:', error);
        }
    };
    
    
    

    return (
        <View style={styles.container}>
            <Text style={styles.tagline1}>What's your weight?</Text>
            <Text style={styles.tagline}>Don't worry. you can always change it later.</Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.pickerContainer}
            >
                {[...Array(150)].map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.weightButton,
                            selectedWeight === index + 20 && styles.selectedWeightButton
                        ]}
                        onPress={() => handleWeightSelection(index + 20)}
                    >
                        <Text style={styles.weightButtonText}>{index + 20}</Text>
                        {selectedWeight === index + 20 && ( // Conditionally render the icon when selected
                            <FontAwesome5 name="arrows-alt-h" size={24} color="white" />
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.backbutton}><BackButton onPress={handleBackbutton} /></View>
            <View style={styles.nextbutton}><NextButton onPress={handleNextbutton} /></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#16161b',
    },
    tagline1: {
        color: "rgba(255,255,255,1)",
        fontSize: 30,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "700",
        textAlign: 'center',
        marginTop: 150,
        marginBottom: 20
    },
    tagline: {
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "400",
        textAlign: 'center',
        marginBottom: 20,
        opacity: 0.9,
        marginRight:45,
        marginLeft:45,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 200,
    },
    weightButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 30,
        marginHorizontal: 5,
    },
    selectedWeightButton: {
        backgroundColor: '#A2ED3A',
        height:100
    },
    weightButtonText: {
        color: 'white',
        fontSize: 44,
        fontWeight: 'bold',
    },
    backbutton: {
        position: 'absolute',
        bottom: 80,
        left: 10,
    },
    nextbutton: {
        position: 'absolute',
        bottom: 80,
        right: 10,
    },
});

export default Weight;
