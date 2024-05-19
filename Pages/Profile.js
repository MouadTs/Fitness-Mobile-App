import React, { useState, useEffect, useContext } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Platform } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "./Context/UsernameContext";
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

const BASE_URL = 'http://192.168.1.107:5000'; // Adjust to your server's base URL

const Profile = () => {
    const { userId, username, difficulty, setDifficulty, profilePicture, setProfilePicture } = useContext(UserContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const handleBackbutton = () => {
        navigation.navigate('Mainpage');
    };

    const handleDiffChange = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/difficulty`, { userId, difficulty });
            console.log("Difficulty updated");
        } catch (error) {
            console.error('Error updating difficulty:', error);
        }
    };

    const handleDifficultyChange = (value) => {
        setDifficulty(value);
        handleDiffChange();
    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("Image picker result:", result); // Inspect the entire result object

        if (!result.cancelled) {
            const { uri } = result.assets ? result.assets[0] : result;
            console.log("Image selected:", uri);
            setSelectedImage(uri);
        }
    };

    const uploadImage = async () => {
        if (selectedImage) {
            const formData = new FormData();
            formData.append('profilePicture', {
                uri: selectedImage,
                name: 'profile.jpg',
                type: 'image/jpeg'
            });
            formData.append('userId', userId);

            try {
                const response = await axios.post(`${BASE_URL}/api/auth/uploadProfilePicture`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.success) {
                    const absoluteUrl = `${BASE_URL}${response.data.profilePictureUrl}`;
                    setProfilePicture(absoluteUrl);
                    console.log(absoluteUrl);
                    alert('Profile picture updated successfully');
                } else {
                    console.error('Failed to update profile picture:', response.data);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    useEffect(() => {
        if (selectedImage) {
            uploadImage();
        }
    }, [selectedImage]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backArrow} onPress={handleBackbutton}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.profileImage}>
                        {selectedImage ? (
                            <Image source={{ uri: selectedImage }} style={styles.image} />
                        ) : profilePicture ? (
                            <Image source={{ uri: profilePicture }} style={styles.image} />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Text style={styles.imagePlaceholderText}>No Image</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
                <Text style={styles.username}>{username}</Text>
            </View>
            <View style={styles.difficultyContainer}>
                <Text style={styles.difficultyText}>Current Difficulty: {difficulty}</Text>
                <RNPickerSelect
                    onValueChange={handleDifficultyChange}
                    items={[
                        { label: 'Beginner', value: 'Beginner' },
                        { label: 'Intermediate', value: 'Intermediate' },
                        { label: 'Expert', value: 'Expert' },
                    ]}
                    style={{
                        inputIOS: {
                            ...pickerSelectStyles.inputIOS,
                            backgroundColor: '#333',
                            color: 'white',
                        },
                        inputAndroid: {
                            ...pickerSelectStyles.inputAndroid,
                            backgroundColor: '#333',
                            color: 'white',
                        },
                        placeholder: {
                            color: 'white',
                        },
                        iconContainer: {
                            top: 10,
                            right: 2,
                        }
                    }}
                    value={difficulty}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                        return <AntDesign name="arrowdown" size={24} color="white" />;
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#16161b",
    },
    header: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: 100,
        width: "100%",
        color: "white",
    },
    headerText: {
        color: "white",
        marginLeft: 10,
        fontSize: 18,
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 80,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 80,
    },
    imagePlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: 'gray',
    },
    imagePlaceholderText: {
        color: 'white',
    },
    username: {
        marginTop: 10,
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
    backArrow: {
        position: 'absolute',
        left: 30,
    },
    difficultyContainer: {
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
    },
    difficultyText: {
        color: "white",
        fontSize: 16,
        marginBottom: 10,
        paddingRight: 30,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'white',
        paddingRight: 30,
        backgroundColor: '#333',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'white',
        paddingRight: 30,
        backgroundColor: '#333',
    },
});

export default Profile;
