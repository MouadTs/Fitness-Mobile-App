import {  StyleSheet } from "react-native";

export const styles=StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#16161b', // Change the background color here
    },
    tagline1: {
        color: "rgba(255,255,255,1)",
        fontSize: 30,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "700",
        textAlign: 'center',
        marginTop: 100,
        width:430,
        marginBottom:20
    },
    tagline: {
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "400",
        textAlign: 'center',
        marginBottom: 20,
        opacity:0.9,
    },
    buttonContainer:{
        marginTop:20,
    },
    genderButton: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000", // Change button background color here
        marginBottom:50
      },
      gendertext:{
        fontWeight:'bold',
        fontFamily: "AppleSDGothicNeo-Light",
        fontSize:19,
        color:"white"
      },
      backbutton:{
        position:'absolute',
        bottom:80,
        left:10
      },
      nextbutton:{
        position:'absolute',
        bottom:80,
        right:10
      },
      selected:{
        backgroundColor:"#A2ED3A",
      },
      selectedText:{
        color:"black"
      }
})