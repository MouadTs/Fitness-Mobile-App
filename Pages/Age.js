import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import BackButton from "../assets/SmallComponent/BackButton";
import NextButton from "../assets/SmallComponent/NextButton";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const Age = () => {
    const [selectedAge, setSelectedAge] = useState(18);
    const navigation = useNavigation();

    const handleBackbutton = () => {
        navigation.navigate('Gender');
    }
    const handleNextbutton=()=>{
        navigation.navigate('Weight');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.tagline1}>How old are you?</Text>
            <Text style={styles.tagline}>Share your age. This will help us to customize the app just for you.</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedAge}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedAge(itemValue)
                    }
                    itemStyle={styles.pickerItem} // Apply style to picker items
                >
                    {[...Array(100)].map((_, index) => (
                        <Picker.Item label={(index + 1).toString()} value={index + 1} key={index}  />
                    ))}
                </Picker>
            </View>
            <View style={styles.backbutton}><BackButton onPress={handleBackbutton} /></View>
            <View style={styles.nextbutton}><NextButton onPress={handleNextbutton}/></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#16161b', // Change the background color here
    },
    tagline1: {

        color: "rgba(255,255,255,1)",
        fontSize: 30,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "700",
        textAlign: 'center',
        marginTop:150,
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
        marginBottom:90,
    },
    pickerContainer: {
        width: '100%',
        
        border:"white",

        marginBottom: 20,
    },
    picker: {
        width: '100%',
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
    pickerItem: {
        color: 'white',
        fontSize:56,
        fontWeight: 'bold',
        
        
    },
   

});

export default Age;
