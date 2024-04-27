import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons"; // Import appropriate icons
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from "react-native-responsive-screen";


const MainPageHeader = ({ userName }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome back</Text>
                <Text style={styles.userName}>Hi! {userName}</Text>
            </View>
            <View style={styles.iconsContainer}>
                <TouchableOpacity>
                    <Ionicons name="notifications" size={wp(10)} color="#A2ED3A" />
                </TouchableOpacity>
                <TouchableOpacity >
                    <MaterialIcons name="account-circle" size={wp(10)} color="white" />
                </TouchableOpacity>
            </View>
        </View>
        
    );
};

const styles = {
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        backgroundColor:'#A2ED3A',
        height:hp(14),
        width:wp(100),
        borderRadius:10,
        paddingTop:40,
        backgroundColor: '#16161b', // Change the background color here
    },
    iconsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    textContainer: {
        alignItems: "center",
        color:'white',
    },
    welcomeText: {
        fontSize: 15,
        marginTop: 4,
        color:'white',
        
    },
    userName: {
        fontSize: 25,
        fontWeight: "bold",
        color:'white',
    },
    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#272730",
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    searchInput: {
        flex: 1,
        color: "white",
        marginLeft: 8,
    },
};

export default MainPageHeader;
