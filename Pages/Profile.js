import React, { useState, useEffect, useContext } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Platform, ScrollView } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "./Context/UsernameContext";
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import ProfileCards from "../components/ProfileCards";
import CaloriesCard from "../components/CaloriesCard"; // Importing the new CaloriesCard component
import config from "../Backend/config";
import { FontAwesome6 } from '@expo/vector-icons';
import Footer from "../components/Footer";

const url = config.apiBaseUrl;
const BASE_URL = url.replace('/api', ''); // Adjust to your server's base URL
console.log("HA URL : ", BASE_URL);

const Profile = () => {
    const { userId, username, difficulty, setDifficulty, profilePicture, setProfilePicture, caloriesburned } = useContext(UserContext);
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

    const handleSignOut = () => {
        navigation.navigate('Homepage');
    };

    const handleDiffChange = async () => {
        try {
            const response = await axios.post(`${config.apiBaseUrl}/auth/difficulty`, { userId, difficulty });
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
                const response = await axios.post(`${config.apiBaseUrl}/auth/uploadProfilePicture`, formData, {
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

    console.log('Profile picture URL:', profilePicture);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backArrow} onPress={handleBackbutton}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.profileContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        <View style={styles.profileImage}>
                            {selectedImage ? (
                                <Image source={{ uri: selectedImage }} style={styles.image} />
                            ) : profilePicture ? (
                                <Image source={{ uri: `${profilePicture}?timestamp=${new Date().getTime()}` }} style={styles.image} />
                            ) : (
                                <View style={styles.imagePlaceholder}>
                                    <Text style={styles.imagePlaceholderText}>No Image</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.username}>{username}</Text>
                </View>
                <View style={styles.concards}>
                    <View style={styles.difficultyCard}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                            <Text style={styles.difficultyText}>Difficulty:</Text>
                            <FontAwesome6 name="bolt-lightning" size={24} color="black" />
                        </View>
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
                                    backgroundColor: '#bcc982',
                                    color: '#333',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                },
                                inputAndroid: {
                                    ...pickerSelectStyles.inputAndroid,
                                    backgroundColor: '#bcc982',
                                    color: '#333',
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                },
                                placeholder: {
                                    color: '#333',
                                },
                                iconContainer: {
                                    top: 10,
                                    right: 12,
                                }
                            }}
                            value={difficulty}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <AntDesign name="arrowdown" size={24} color="#333" />;
                            }}
                        />
                    </View>
                    <ProfileCards />
                </View>
                <View style={{ alignItems: "center" }}>
                    <CaloriesCard caloriesburned={caloriesburned} />
                </View>
                <View style={styles.signOutButtonContainer}>
                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                    <Text style={styles.buttonText1}>Sign Out</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            <Footer currentPage={"Profile"} />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16161b",
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 20,
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
    difficultyCard: {
        width: "45%",
        height: 200,
        marginHorizontal: 5,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#bcc982',
        padding: 10,
        paddingTop: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    difficultyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
        justifyContent: 'flex-start',
    },
    concards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    achievementsContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    signOutButtonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 20,
    },
    signOutButton: {
        width: 200,
        marginVertical: 10,
        padding: 16,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fd4a4a", // Red color for the sign out button
        marginBottom: 40,
    },
    buttonText1: {
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "700",
        fontSize: 20,
        color: "white",
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
        color: '#333',
        paddingRight: 30,
        backgroundColor: '#f9a825',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
        color: '#333',
        paddingRight: 30,
        backgroundColor: '#f9a825',
    },
});

export default Profile;
