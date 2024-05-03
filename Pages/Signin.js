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


const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { setUsername, setDifficulty } = useContext(UserContext); // handle the name to be shared with other screens


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
            const response = await axios.post('http://192.168.1.107:5000/api/auth/login', {
                email,
                password
            });

            // Handle success response (e.g., navigate to next screen)
            console.log(response.data);
            const userName = response.data.name; // Assuming the name is sent in the response
            const diff = response.data.difficulty;
            // Set username in context
            setUsername(userName);
            setDifficulty(diff);
            navigation.navigate('Mainpage'); // Navigate to main menu
        } catch (error) {
            // Handle error response (e.g., display error message)
            console.error('Login failed:', error.response.data.message);
            Alert.alert('Login Failed', error.response.data.message);
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
