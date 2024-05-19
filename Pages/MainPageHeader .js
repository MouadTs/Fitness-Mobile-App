import React,{useContext} from "react";
import { View, Text, TouchableOpacity, TextInput,Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import appropriate icons
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from "react-native-responsive-screen";
import { UserContext } from "./Context/UsernameContext"; // Import UserContext

const MainPageHeader = ({ userName }) => {
    const { profilePicture} = useContext(UserContext);
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome back</Text>
                <Text style={styles.userName}>Hi! {userName}</Text>
            </View>
            <View style={styles.iconsContainer}>
                <TouchableOpacity >
                <Image source={{ uri: profilePicture }} style={styles.image} />
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
        height:hp(14),
        width:wp(100),
        borderRadius:10,
        paddingTop:40,
        backgroundColor: '#1f1f1f', // Change the background color here
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
    image:{
        width:70,
        height:70,
        borderRadius:50,
        backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center',
    }
};

export default MainPageHeader;
