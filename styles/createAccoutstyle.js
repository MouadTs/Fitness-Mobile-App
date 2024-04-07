import { StyleSheet,Dimensions } from "react-native";


const screenWidth= Dimensions.get('window').width;

export const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#16161b', // Change the background color here
        
        
    },
    tagline1: {
      color: "rgba(255,255,255,1)",
      fontSize: 40,
      fontFamily: "AppleSDGothicNeo-Light",
      fontWeight: "700",
      textAlign: 'center',
      marginTop: 100,
      width:430,
      
  },
    tagline: {
        color: "rgba(255,255,255,1)",
        fontSize: 24,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "400",
        textAlign: 'center',
        marginBottom: 20,
        opacity:0.6,

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
        fontSize: 20,
        fontFamily: "AppleSDGothicNeo-Light",
        marginBottom: 5,
        color:'#EDEDED',
        fontWeight:"500",
      },
      input: {
        height: 40,
        borderColor: '#EDEDED',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom:5,
        borderRadius:10,
        color:"#FFFFFF",
        width:screenWidth-60,
        height:50,

        
      },
      passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position:'relative',
        
      },
      showHideButton: {
        position:'absolute',
        right:10,
        top: '25%',
        padding: 10,
        transform: [{ translateY: -12 }], // Center vertically
      },
      button: {
        width: 350,
        marginVertical: 10,
        padding: 16,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInButton: {
      backgroundColor: "#A2ED3A",
  },
  buttonText1:{
    fontFamily:"AppleSDGothicNeo-Light",
    fontWeight:"700",
    fontSize:20,
  },
  focusedInput:{
    borderColor:'#A2ED3A',
    backgroundColor:'#4d4d55'

  }
    
    
    
})