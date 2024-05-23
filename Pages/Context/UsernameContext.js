import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');
    const [weight, setWeight] = useState(null);
    const [caloriesburned, setCaloriesburned] = useState(0);
    const [exerciseDates, setExerciseDates] = useState([]); // Add exerciseDates state

    return (
        <UserContext.Provider value={{
            username, setUsername,
            userId, setUserId,
            difficulty, setDifficulty,
            profilePicture, setProfilePicture,
            weight, setWeight,
            caloriesburned, setCaloriesburned,
            exerciseDates, setExerciseDates // Provide exerciseDates and its setter
        }}>
            {children}
        </UserContext.Provider>
    );
};
