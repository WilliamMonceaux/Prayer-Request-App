'use client'
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(); 

export const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);

    const handleUpdateUser = (user) => {
        setCurrentUser(user);
    }

    return (
        <UserContext.Provider value={{ currentUser, handleUpdateUser }}>
            {props.children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    return useContext(UserContext);
}