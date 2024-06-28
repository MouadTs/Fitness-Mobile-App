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
    {
        id: 5,
        name: "5000 Calories Burned",
        description: "Burn 5000 calories",
        criteria: (stats) => stats.caloriesburned >= 5000,
    },
    {
        id: 6,
        name: "14-Day Streak",
        description: "Work out for 14 consecutive days",
        criteria: (stats) => stats.consecutiveDays >= 14,
    },
    {
        id: 7,
        name: "25 Workouts",
        description: "Complete 25 workouts",
        criteria: (stats) => stats.caloriesburned >= 3750,
    },
    {
        id: 8,
        name: "10,000 Calories Burned",
        description: "Burn 10,000 calories",
        criteria: (stats) => stats.caloriesburned >= 10000,
    },
    {
        id: 9,
        name: "30-Day Streak",
        description: "Work out for 30 consecutive days",
        criteria: (stats) => stats.consecutiveDays >= 30,
    },
    {
        id: 10,
        name: "50 Workouts",
        description: "Complete 50 workouts",
        criteria: (stats) => stats.caloriesburned >= 7500,
    },
    {
        id: 11,
        name: "15,000 Calories Burned",
        description: "Burn 15,000 calories",
        criteria: (stats) => stats.caloriesburned >= 15000,
    },
    
    // Add more achievements as needed
];
