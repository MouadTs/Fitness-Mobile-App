import {  StyleSheet } from "react-native";

export const styles=StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#16161b', // Change the background color here
    },
    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 12,
        height:60,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        marginBottom:10,
    },
    searchInput: {
        flex: 1,
        color: "white",
        marginLeft: 8,
        color:"black"
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        marginTop: 16,
      },
      button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
      },
      buttonText: {
        fontSize: 17,
      },
      selectedButton: {
        backgroundColor: "#A2ED3A",
      },
      unselectedButton: {
        backgroundColor: "#ccc",
      },
      buttonTextSelected: {
        color: "#fff",
      },
      buttonTextUnselected: {
        color: "#000",
      },
})