import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(null); // Add userId state
    const [difficulty, setDifficulty] = useState(null);

    return (
        <UserContext.Provider value={{ username, setUsername, userId, setUserId, difficulty, setDifficulty }}>
            {children}
        </UserContext.Provider>
    );
};
