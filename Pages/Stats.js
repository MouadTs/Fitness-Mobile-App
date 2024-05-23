// Stats.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView ,TouchableOpacity} from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import { UserContext } from './Context/UsernameContext';
import { BlurView } from "expo-blur";
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const Stats = () => {
    const { exerciseDates } = useContext(UserContext);
    const [commitsData, setCommitsData] = useState([]);

    useEffect(() => {
        const formatDates = () => {
            const formattedDates = exerciseDates.map(date => ({
                date: new Date(date).toISOString().split('T')[0],
                count: 1
            }));
            setCommitsData(formattedDates);
            console.log(formattedDates);
        };

        formatDates();
    }, [exerciseDates]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Workout Stats</Text>
            <ScrollView contentContainerStyle={styles.graphContainer}>
                <ContributionGraph
                    values={commitsData}
                    endDate={new Date()}
                    numDays={105}
                    width={screenWidth - 30}
                    height={250}
                    chartConfig={chartConfig}
                />
            </ScrollView>
            <View style={styles.footerContainer}>
                <BlurView intensity={40} style={styles.blurContainer} />
                <TouchableOpacity style={styles.footerButton}>
                    <Ionicons name="home" size={24} color="#63c138" />
                    <Text style={styles.footerButtonText}>Home</Text>
                </TouchableOpacity>
                {/* Add similar footer buttons as in the MainPage */}
            </View>
        </View>
    );
};

const chartConfig = {
    backgroundGradientFrom: 'rgba(213,211,236,1)',
    backgroundGradientTo: 'rgba(97,184,129,1)',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.9,
    useShadowColorFromDataset: false,
    decimalPlaces: 0, // This ensures that only integer values are displayed
    propsForLabels: {
        fontSize: 20, // Adjust the font size as needed
    },
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        backgroundColor: '#1f1f1f', // Set background color as white or any other color you prefer
    },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
        fontFamily:"AppleSDGothicNeo-Light",
        marginBottom: 20,
        color: '#4d962c', // Set text color
    },
    graphContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent', // Set background color as transparent
    },
    blurContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    footerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    footerButtonText: {
        fontSize: 12,
        color: '#333', // Set text color
    },
});

export default Stats;
