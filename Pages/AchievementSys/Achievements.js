import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { UserContext } from "../Context/UsernameContext";
import { achievementsList } from "./achievementsList";
import { FontAwesome } from '@expo/vector-icons'; // Importing icons from Expo

const quotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "Don't watch the clock; do what it does. Keep going.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "The only way to achieve the impossible is to believe it is possible.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn't just find you. You have to go out and get it."
];

const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

const checkAchievements = (stats, setAchievements) => {
    const newAchievements = achievementsList.filter(achievement =>
        achievement.criteria(stats) && !stats.achievements.includes(achievement.id)
    ).map(achievement => achievement.id);

    if (newAchievements.length > 0) {
        setAchievements(prev => [...prev, ...newAchievements]);
    }
};

const Achievements = () => {
    const { caloriesburned, consecutiveDays, achievements, setAchievements } = useContext(UserContext);
    const [quote, setQuote] = useState(getRandomQuote);

    useEffect(() => {
        const stats = { caloriesburned, consecutiveDays, achievements };
        checkAchievements(stats, setAchievements);
    }, [caloriesburned, consecutiveDays]);

    const renderIcon = (isUnlocked) => (
        isUnlocked ? <FontAwesome name="trophy" size={24} color="gold" /> : <FontAwesome name="lock" size={24} color="gray" />
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.quote}>{quote}</Text>
            
            {achievementsList.map(achievement => (
                <View key={achievement.id} style={[styles.achievement, achievements.includes(achievement.id) && styles.unlockedAchievement]}>
                    <View style={styles.iconContainer}>
                        {renderIcon(achievements.includes(achievement.id))}
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.achievementName}>{achievement.name}</Text>
                        <Text style={styles.achievementDescription}>{achievement.description}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1f1f1f',
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    quote: {
        fontSize: 20,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
        paddingHorizontal: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff',
    },
    achievement: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    unlockedAchievement: {
        backgroundColor: 'gray', // Green color for unlocked achievements
    },
    iconContainer: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    achievementName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    achievementDescription: {
        fontSize: 16,
        color: '#aaa',
    },
});

export default Achievements;
