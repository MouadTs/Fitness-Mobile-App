import {  StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#2C333C', // Change the background color here
        
    },
    staysup: {
        color: "rgba(255,255,255,1)",
        fontSize: 90,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "600",
        marginTop:20
    },
    tagline: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "400",
        textAlign: 'center',
        marginBottom: 20,
    },
    dot: {
        color: '#A2ED3A', // Set the color of the dot
        
    },
    details:{
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "400",
        textAlign: 'center',
        marginBottom: 20,
        fontWeight:'900',   
    },
    inputContainer: {
        marginBottom: 20,
      },
      label: {
        fontSize: 18,
        fontFamily: "AppleSDGothicNeo-Light",
        marginBottom: 5,
        color:'#EDEDED'
      },
      input: {
        height: 40,
        borderColor: '#EDEDED',
        borderWidth: 1,
        paddingHorizontal: 10,
        
      },
      passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        
      },
      showHideButton: {
        padding: 10,
      }
    
    
    
})