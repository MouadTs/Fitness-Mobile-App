import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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
    console.log("Checking achievements with stats:", stats);
    const newAchievements = achievementsList.filter(achievement =>
        achievement.criteria(stats) && !stats.achievements.includes(achievement.id)
    ).map(achievement => achievement.id);

    console.log("New achievements to unlock:", newAchievements);

    if (newAchievements.length > 0) {
        setAchievements(prev => {
            const updatedAchievements = [...prev, ...newAchievements];
            console.log("Updated achievements state:", updatedAchievements);
            return updatedAchievements;
        });
    }
};

const Achievements = () => {
    const { caloriesburned, consecutiveDays, achievements, setAchievements } = useContext(UserContext);
    const [quote, setQuote] = useState(getRandomQuote);

    console.log("Current calories burned:", caloriesburned);
    console.log("Current achievements:", achievements);

    useEffect(() => {
        const stats = { caloriesburned, consecutiveDays, achievements };
        checkAchievements(stats, setAchievements);
    }, [caloriesburned, consecutiveDays]);

    const renderIcon = (isUnlocked) => (
        isUnlocked ? <FontAwesome name="trophy" size={24} color="gold" /> : <FontAwesome name="lock" size={24} color="gray" />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.quote}>
                {quote}
            </Text>
            <Text style={styles.header}>Here are your achievements:</Text>
            {achievementsList.map(achievement => (
                <View key={achievement.id} style={styles.achievement}>
                    <View style={styles.iconContainer}>
                        {renderIcon(achievements.includes(achievement.id))}
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.achievementName}>{achievement.name}</Text>
                        <Text style={styles.achievementDescription}>{achievement.description}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        padding: 20,
        backgroundColor: '#bcc982',
        borderRadius: 10,
        marginVertical: 10,
        alignSelf: 'center',
    },
    quote: {
        fontSize: 23,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 20,
        color: '#254416',
        paddingHorizontal: 10, // Added padding for better readability
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    achievement: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    iconContainer: {
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    achievementName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    achievementDescription: {
        fontSize: 16,
        color: '#555',
    },
});

export default Achievements;
