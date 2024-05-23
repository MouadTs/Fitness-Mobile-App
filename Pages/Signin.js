import React, { useState, useContext } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native"; // Import Alert
import { styles } from '../styles/createAccoutstyle.js';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; //navigation
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { UserContext } from "./Context/UsernameContext.js";
import axios from 'axios';
import CustomKeyboardView from "../components/CustomKeyboardView.js";
import config from "../Backend/config.js";


const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { setUsername, setDifficulty,setUserId,setProfilePicture,profilePicture,setWeight,setCaloriesburned,setExerciseDates } = useContext(UserContext); // handle the name to be shared with other screens


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const navigation = useNavigation(); // Initialize navigation object

    const handleEmailFocus = () => {
        setEmailFocused(true);
        if (emailError) {
            setEmailError('');
        }
    };

    const handlePasswordFocus = () => {
        setPasswordFocused(true);
        if (passwordError) {
            setPasswordError('');
        }
    };

    const handleSignPress = async () => {
        // Validate inputs before navigating
        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email.trim())) {
            setEmailError('Email is invalid');
            return;
        }
        if (!password.trim()) {
            setPasswordError('Password is required');
            return;
        }
        try {
            const response = await axios.post(`${config.apiBaseUrl}/auth/login`, {
                email,
                password
            });
            
            if (response && response.data) {
                // Handle success response (e.g., navigate to next screen)
                console.log(response.data);
                const userName = response.data.user.name; // Assuming the name is sent in the response
                const diff = response.data.user.difficulty;
                const id = response.data.user.id;
                const pic=response.data.user.profilePicture;
                const pic1=config.apiBaseUrl.replace('/api','');
                
                // Set username in context
                console.log("fik 9da w 9da :",response.data.user.weight);
                console.log(response.data.user.exerciseDates);
                setWeight(response.data.user.weight);
                setCaloriesburned(response.data.user.calories);
                setUsername(userName);
                setDifficulty(diff);
                setUserId(id); // Store user ID in context
           
                setExerciseDates(response.data.user.exerciseDates);// set exercise dates
                setProfilePicture(`${pic1}${pic}`); // Concatenate base URL with pic
                console.log(profilePicture);
                console.log(profilePicture);
                navigation.navigate('Mainpage'); // Navigate to main menu
            } else {
                throw new Error('Invalid response received from server');
            }
        } catch (error) {
            // Handle error response (e.g., display error message)
            console.error('Login failed:', error.message);
            Alert.alert('Login Failed', 'An error occurred while signing in. Please try again later.');
        }
        
        
    };
    

    return (
        <View style={styles.container}>
            <CustomKeyboardView>
            <Text style={styles.Signinpagetext}>Login in to your Account</Text>
            <Text style={styles.tagline}>Enter your details to continue.</Text>
            
                <View style={styles.inputField}>
                    <Text style={styles.label}>Email:</Text>
                    <View style={[styles.inputContainer, emailFocused && styles.focusedInput, emailError && styles.invalidInput]}>
                        <Fontisto style={[styles.Icon, emailFocused && styles.focusedicon]} name="email" size={20} color="white" />
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            placeholderTextColor="#ffffff" // Change placeholder color here
                            onFocus={handleEmailFocus} // Clear error when focused
                            onBlur={() => setEmailFocused(false)}
                        />
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>
                <View style={styles.inputField}>
                    <Text style={styles.label}>Password:</Text>
                    <AntDesign name="lock1" size={24} color="white" style={[styles.passIcon, passwordFocused && styles.focusedicon]} />
                    <View style={[styles.inputContainer, passwordFocused && styles.focusedInput, passwordError && styles.invalidInput]}>
                        <TextInput
                            style={[styles.input,]}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            placeholder="Enter your password"
                            secureTextEntry={!showPassword}
                            placeholderTextColor="#ffffff" // Change placeholder color here
                            onFocus={handlePasswordFocus} // Clear error when focused
                            onBlur={() => setPasswordFocused(false)}
                        />
                        <TouchableOpacity onPress={toggleShowPassword} style={styles.showHideButton}>
                            <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>
                <TouchableOpacity style={[styles.button, styles.signInButton]} onPress={handleSignPress}>
                    <Text style={styles.buttonText1}>Sign In</Text>
                </TouchableOpacity>
            </CustomKeyboardView>
        </View>
    )
}

export default Signin;
