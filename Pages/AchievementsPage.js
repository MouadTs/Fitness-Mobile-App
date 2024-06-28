import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Achievements from '../Pages/AchievementSys/Achievements';
import Footer from '../components/Footer';

const AchievementsPage = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.header}>Here are your Achievements</Text>
                <View style={styles.achievementsContainer}>
                    <Achievements />
                </View>
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        marginTop: 50,
        textAlign: 'center',
    },
    achievementsContainer: {
        width: '90%',
        backgroundColor: '#1f1f1f',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
});

export default AchievementsPage;
