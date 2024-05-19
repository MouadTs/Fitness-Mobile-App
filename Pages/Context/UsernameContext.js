// Context/UsernameContext.js

import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(null); // Add userId state
    const [difficulty, setDifficulty] = useState(null);
    const [profilePicture, setProfilePicture] = useState(''); // Add profilePicture state

    return (
        <UserContext.Provider value={{ username, setUsername, userId, setUserId, difficulty, setDifficulty, profilePicture, setProfilePicture }}>
            {children}
        </UserContext.Provider>
    );
};
