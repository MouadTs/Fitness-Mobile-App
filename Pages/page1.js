import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from '../styles/Page1style.js';
import { useNavigation } from "@react-navigation/native";

const backgroundImages = [
    require('../assets/girl.jpeg'),
    require('../assets/sushil-ghimire-DC5akQJyH4I-unsplash.jpg'),
    require('../assets/test1.jpg'),
    require('../assets/test3.jpg'),
    // Add more image addresses here
];

const FirstPage = () => {
    const navigation = useNavigation();
    const [randomBackgroundImage, setRandomBackgroundImage] = useState(null);

    useEffect(() => {
        // Generate a random index to select a random background image
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        setRandomBackgroundImage(backgroundImages[randomIndex]);
    }, []); // This effect runs only once when the component mounts

    const handleCreateAccountPress = () => {
        navigation.navigate('CreateAccount');
    };

    const handleSignInPress = () => {
        navigation.navigate('Signin');
    };

    return (
        <ImageBackground source={randomBackgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.staysup}>RiseUp
                        <Text style={styles.dot}>.</Text>
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
