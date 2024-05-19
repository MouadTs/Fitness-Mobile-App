import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width; // Get the screen width

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: windowWidth,
    },
    logoContainer: {
        marginBottom: 20,
    },
    staysup: {
        color: "rgba(255,255,255,1)",
        fontSize: 90,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "600",
        marginTop:250,
    },
    tagline: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "400",
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        width: 350,
        marginVertical: 10,
        padding: 16,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "700",
    },
    buttonText1: {
        color: "black",
        fontSize: 20,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "700",
    },
    createAccountButton: {
        backgroundColor: "#2C333C",
        
    },
    signInButton: {
        backgroundColor: "#A2ED3A",
    },
    dot: {
        color: '#A2ED3A', // Set the color of the dot
        
    },
    bar: {
        backgroundColor: "#A2ED3A",
        height: 4,
        width: 200, // Adjust width as needed
        marginTop: 10, // Adjust marginTop as needed
        borderRadius: 2, // to round the corners
        marginBottom:3,
    },
    test:{
        height:20,
        width:20
    }
    
    
});
