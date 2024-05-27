// achievements.js
export const achievementsList = [
    {
        id: 1,
        name: "First Workout",
        description: "Complete your first workout",
        criteria: (stats) => stats.caloriesburned != 1,
    },
    {
        id: 2,
        name: "10 Workouts",
        description: "Complete 10 workouts",
        criteria: (stats) => stats.caloriesburned >= 1500,
    },
    {
        id: 3,
        name: "1000 Calories Burned",
        description: "Burn 1000 calories",
        criteria: (stats) => stats.caloriesburned >= 1000,
    },
    {
        id: 4,
        name: "7-Day Streak",
        description: "Work out for 7 consecutive days",
        criteria: (stats) => stats.consecutiveDays >= 7,
    },
    // Add more achievements as needed
];
