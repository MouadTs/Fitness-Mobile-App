import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { styles } from '../styles/createAccoutstyle.js';
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; //navigation


const CreateAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const navigation = useNavigation(); // Initialize navigation object
    const handleSignPress = () => {
      navigation.navigate('Gender');
  };

    return (
        <View style={styles.container}>
            <Text style={styles.tagline1}>Create your account</Text>
            <Text style={styles.tagline}>Enter your details to continue.</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={[styles.input, nameFocused && styles.focusedInput]}
                    value={name}
                    onChangeText={text => setName(text)}
                    placeholder="Enter your name"
                    placeholderTextColor="#ffffff" // Change placeholder color here
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={[styles.input, emailFocused && styles.focusedInput]}
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    placeholderTextColor="#ffffff" // Change placeholder color here
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password:</Text>
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={[styles.input, passwordFocused && styles.focusedInput]}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        placeholder="Enter your password"
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#ffffff" // Change placeholder color here
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                    />
                    <TouchableOpacity onPress={toggleShowPassword} style={styles.showHideButton}>
                        <MaterialIcons name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={[styles.button, styles.signInButton]} onPress={handleSignPress}>
                <Text style={styles.buttonText1}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateAccount;
