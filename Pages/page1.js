import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { styles } from '../styles/Page1style.js';
import backgroundImage from '../assets/girl.jpeg'; // Import the image
import { useNavigation } from "@react-navigation/native"; //navigation

const FirstPage = () => {
    const navigation = useNavigation(); // Initialize navigation object


    const handleCreateAccountPress = () => {
        navigation.navigate('CreateAccount');
    };

    const handleSignInPress = () => {
        navigation.navigate('Signin');
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.staysup}>RiseUp
                        <Text style={styles.dot}>.</Text> {/* Dot with different style */}
                        </Text>
                    </View>
                    <Text style={styles.tagline}>live healthy, stay strong</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.createAccountButton]} onPress={handleCreateAccountPress}>
                            <Text style={styles.buttonText}>Create account</Text>
                        </TouchableOpacity>
                        <View style={styles.bar}></View>
                        <TouchableOpacity style={[styles.button, styles.signInButton]} onPress={handleSignInPress}>
                            <Text style={styles.buttonText1}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

export default FirstPage;
