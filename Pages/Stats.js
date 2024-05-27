import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ContributionGraph, LineChart, PieChart } from 'react-native-chart-kit';
import { UserContext } from './Context/UsernameContext';
import Footer from '../components/Footer';

const screenWidth = Dimensions.get('window').width;

const Stats = () => {
    const { exerciseDates, setConsecutiveDays } = useContext(UserContext);
    const [commitsData, setCommitsData] = useState([]);
    const [summary, setSummary] = useState({});
    const [recentWorkouts, setRecentWorkouts] = useState([]);

    useEffect(() => {
        const formatDates = () => {
            const formattedDates = exerciseDates.map(date => ({
                date: new Date(date).toISOString().split('T')[0],
                count: 1
            }));
            setCommitsData(formattedDates);
            calculateSummary(formattedDates);
            setRecentWorkouts(formattedDates.slice(-5).reverse()); // Last 5 workouts
        };

        const calculateSummary = (dates) => {
            const totalWorkouts = dates.length;
            const workoutsPerWeek = (totalWorkouts / 7).toFixed(2);
            const mostActiveDays = calculateMostActiveDays(dates);
            const consecutiveDays = calculateConsecutiveDays(dates);
            setSummary({
                totalWorkouts,
                workoutsPerWeek,
                mostActiveDays,
                consecutiveDays
            });
            setConsecutiveDays(consecutiveDays);
        };
        

        const calculateMostActiveDays = (dates) => {
            const dayCount = [0, 0, 0, 0, 0, 0, 0];
            dates.forEach(date => {
                const day = new Date(date.date).getDay();
                dayCount[day]++;
            });
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const mostActiveDay = dayCount.indexOf(Math.max(...dayCount));
            return daysOfWeek[mostActiveDay];
        };

        const calculateConsecutiveDays = (dates) => {
            if (dates.length === 0) return 0;

            let maxStreak = 1;
            let currentStreak = 1;
            for (let i = 1; i < dates.length; i++) {
                const prevDate = new Date(dates[i - 1].date);
                const currDate = new Date(dates[i].date);
                const diffTime = Math.abs(currDate - prevDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    currentStreak++;
                    maxStreak = Math.max(maxStreak, currentStreak);
                } else {
                    currentStreak = 1;
                }
            }
            return maxStreak;
        };

        formatDates();
    }, [exerciseDates]);

    const lineChartData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                data: [5, 6, 7, 8], // Example data, replace with actual data
                strokeWidth: 2
            }
        ]
    };

    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Workout Stats</Text>
            {commitsData.length === 0 ? (
                <Text style={styles.emptyMessage}>No workout data available</Text>
            ) : (
                <ScrollView contentContainerStyle={styles.graphContainer}>
                    <View style={styles.summaryContainer}>
                        <Text style={styles.summaryText}>Total Workouts: {summary.totalWorkouts}</Text>
                        <Text style={styles.summaryText}>Average Workouts per Week: {summary.workoutsPerWeek}</Text>
                        <Text style={styles.summaryText}>Most Active Day: {summary.mostActiveDays}</Text>
                        <Text style={styles.summaryText}>Consecutive Days: {summary.consecutiveDays}</Text>
                    </View>
                    <View style={styles.graphWrapper}>
                        <ContributionGraph
                            values={commitsData}
                            endDate={new Date()}
                            numDays={105}
                            width={screenWidth - 30}
                            height={250}
                            chartConfig={chartConfig}
                        />
                    </View>
                    <View style={styles.graphWrapper}>
                        <LineChart
                            data={lineChartData}
                            width={screenWidth - 30}
                            height={220}
                            chartConfig={chartConfig}
                        />
                    </View>
                    
                    <View style={styles.recentWorkoutsContainer}>
                        <Text style={styles.recentWorkoutsHeader}>Recent Workouts</Text>
                        {recentWorkouts.map((workout, index) => (
                            <Text key={index} style={styles.recentWorkoutText}>{workout.date}</Text>
                        ))}
                    </View>
                </ScrollView>
            )}
            <Footer currentPage={"Stats"} />
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
    decimalPlaces: 0,
    propsForLabels: {
        fontSize: 20,
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        backgroundColor: '#1f1f1f',
        
    },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
        fontFamily: "AppleSDGothicNeo-Light",
        marginBottom: 20,
        color: '#4d962c',
        
    },
    graphContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    emptyMessage: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
    },
    summaryContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    summaryText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight:"bold"
    },
    graphWrapper: {
        marginBottom: 40,
    },
    recentWorkoutsContainer: {
        marginTop: 0,
        alignItems: 'center',
        marginBottom:"40%"
    },
    recentWorkoutsHeader: {
        fontSize: 22,
        color: '#4d962c',
        marginBottom: 10,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight:"bold"
    },
    recentWorkoutText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
        fontFamily: "AppleSDGothicNeo-Light",
        fontWeight:"bold"
    },
});

export default Stats;
