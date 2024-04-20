import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import BackButton from "../assets/SmallComponent/BackButton";
import NextButton from "../assets/SmallComponent/NextButton";
import { useNavigation } from "@react-navigation/native";

const ChooseGoal = () => {
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState([]);

    const handleBackbutton = () => {
        navigation.navigate('Weight');
    }

    // Define your list of plans
    const plans = [
        { id: 1, name: 'Beginner Weight Loss' },
        { id: 2, name: 'Intermediate Weight Loss' },
        { id: 3, name: 'Advanced Weight Loss' },
        { id: 4, name: 'Muscle Building - Beginner' },
        { id: 5, name: 'Muscle Building - Intermediate' },
        { id: 6, name: 'Muscle Building - Advanced' },
    ];

    // Function to handle when a plan is selected
    const handlePlanSelection = (plan) => {
        const index = selectedItems.findIndex(item => item.id === plan.id);
        if (index !== -1) {
            const newSelectedItems = [...selectedItems];
            newSelectedItems.splice(index, 1);
            setSelectedItems(newSelectedItems);
        } else {
            setSelectedItems([...selectedItems, plan]);
        }
    }

    // Render item for the FlatList
    const renderPlanItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handlePlanSelection(item)}
            style={[
                styles.planItemContainer,
                selectedItems.some(selectedItem => selectedItem.id === item.id) && styles.selectedPlanItem
            ]}
        >
            <Text style={styles.planItem}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.tagline1}>Select your Training Plan</Text>
            <Text style={styles.tagline}>Choose a goal that aligns with your fitness aspirations.</Text>

            {/* FlatList to render the list of plans */}
            <FlatList
                data={plans}
                renderItem={renderPlanItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.planList}
            />

            <View style={styles.backbutton}><BackButton onPress={handleBackbutton} /></View>
            <View style={styles.nextbutton}><NextButton /></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#16161b',
    },
    tagline1: {
        color: "rgba(255,255,255,1)",
        fontSize: 30,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "700",
        textAlign: 'center',
        marginTop: 150,
        marginBottom: 20
    },
    tagline: {
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "400",
        textAlign: 'center',
        marginBottom: 20,
        opacity: 0.9,
        marginRight: 45,
        marginLeft: 45,
    },
    planList: {
        marginTop: 20,
    },
    planItemContainer: {
        paddingHorizontal: 40,
        borderRadius: 30, // Set the borderRadius here
        overflow: 'hidden', // Ensure overflow is hidden to apply borderRadius properly
        backgroundColor: '#333',
        marginBottom: 20,
    },
    planItem: {
        color: "rgba(255,255,255,1)",
        fontSize: 22,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight: "400",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    selectedPlanItem: {
        borderColor: '#A2ED3A', // Change the border color for selected items
        borderWidth: 2,
    },
    backbutton: {
        position: 'absolute',
        bottom: 80,
        left: 10,
    },
    nextbutton: {
        position: 'absolute',
        bottom: 80,
        right: 10,
    },
});

export default ChooseGoal;
