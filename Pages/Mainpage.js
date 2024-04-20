import React from "react";
import { Text, View, StyleSheet } from "react-native";
import BackButton from "../assets/SmallComponent/BackButton";
import NextButton from "../assets/SmallComponent/NextButton";


const Mainpage = () => {

  

    return (
        <View >
            <Text >How old are you?</Text>
            <Text >Share your age. This will help us to customize the app just for you.</Text>
            
            <View ><BackButton  /></View>
            <View ><NextButton /></View>
        </View>
    )
}

export default Mainpage;