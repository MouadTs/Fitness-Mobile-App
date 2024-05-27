// AchievementsPage.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Achievements from '../Pages/AchievementSys/Achievements';
import Footer from '../components/Footer';

const AchievementsPage = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.header}>Here are your Achievements</Text>
                <Achievements />
            </ScrollView>
            <Footer currentPage={"Achievements"} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16161b',
    },
    scrollViewContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        marginTop:50
    },
});

export default AchievementsPage;
