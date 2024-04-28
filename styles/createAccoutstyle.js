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
      alignSelf: 'center',
      
  },
  Signinpagetext:{
      color: "rgba(255,255,255,1)",
      fontSize: 40,
      fontFamily: "AppleSDGothicNeo-Light",
      fontWeight: "700",
      textAlign: 'center',
      marginTop: 100,
      
      marginRight:20
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
    input:{
      color:"red",
    },
    inputField:{
      marginBottom: 30,
    },
    inputContainer: {
        borderColor: '#EDEDED',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom:5,
        borderRadius:10,
        width:screenWidth-60,
        height:50,
        marginBottom:0
      },
      label: {
        fontSize: 20,
        fontFamily: "AppleSDGothicNeo-Light",
        marginBottom: 5,
        color:'white',
        fontWeight:"500",
      },
      input:{
       width:"80%",
       height:"100%",
       color: "white",
       right:-40,        
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
  },
  Icon:{
    position:'absolute',
    top:13,
    left:10,
    zIndex:10,
  },
  passIcon:{
    position:'absolute',
    top:40,
    left:10,
    zIndex:10,
  },
  focusedicon:{
    color:"#A2ED34",
  }
  ,invalidInput:{
    borderColor:'red',
    backgroundColor:'#4d4d55'

  },
  errorText: {
    color: 'red',
    marginTop: 5,
}

    
    
    
})