import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { UserContext } from '../Pages/Context/UsernameContext';

const CaloriesCard = ({ caloriesburned }) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardHead}>
                    <Text style={styles.text}>Calories Burned: </Text>
                    <FontAwesome5 name="fire" size={28} color="black" />
                </View>
                <View style={styles.cardText}>
                    <Text style={styles.calories}>{caloriesburned} </Text>
                    <Text style={styles.caloriesMeasure}>kcal</Text>
                </View>
            </View>
        </View>
    );
};

export default CaloriesCard;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    card: {
        width: 260,
        height: 200,
        marginHorizontal: 5,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#eb941f',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginVertical: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    calories: {
        fontSize: 68,
        fontWeight: 'bold',
        color: 'black',
    },
    caloriesMeasure: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginBottom: 10,
    },
    cardText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
