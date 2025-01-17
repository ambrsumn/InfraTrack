import React, { createContext, useState, useContext } from 'react'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const saveToken = (token) => {
        setToken(token);
    }
    return (
        <UserContext.Provider value={{ token, saveToken }}>
            {children} {/* Render the children here */}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
}