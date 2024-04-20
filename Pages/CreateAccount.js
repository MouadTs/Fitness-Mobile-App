import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../styles/createAccoutstyle.js';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; //navigation
import { Fontisto } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const CreateAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const navigation = useNavigation(); // Initialize navigation object

    const handleNameFocus = () => {
        setNameFocused(true);
        if (nameError) {
            setNameError('');
        }
    };

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
        try {
            // Validate inputs before navigating
            if (!name.trim()) {
                setNameError('Name is required');
                return;
            }
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
    
            const response = await axios.post('http://192.168.1.107:5000/api/auth/register', {
                name,
                email,
                password
            });
            
            // Handle success response (e.g., navigate to next screen)
            console.log(response.data);
            navigation.navigate('Gender');
        } catch (error) {
            // Handle error response (e.g., display error message)
            console.error('Registration failed:', error);
            Alert.alert('Registration Failed', 'Failed to register. Please try again later.');
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.tagline1}>Create your account</Text>
            <Text style={styles.tagline}>Enter your details to continue.</Text>
            <View style={styles.inputField}>
                <Text style={styles.label}>Name:</Text>
                <View style={[styles.inputContainer, nameFocused && styles.focusedInput, nameError && styles.invalidInput]}>
                    <EvilIcons style={[styles.Icon, nameFocused && styles.focusedicon]} name="user" size={28} color="white" />
                    <TextInput
                        style={[styles.input,]}
                        value={name}
                        onChangeText={text => setName(text)}
                        placeholder="Enter your name"
                        placeholderTextColor="#ffffff" // Change placeholder color here
                        onFocus={handleNameFocus} // Clear error when focused
                        onBlur={() => setNameFocused(false)}
                    />
                </View>
                {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            </View>
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
                <Text style={styles.buttonText1}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateAccount;
