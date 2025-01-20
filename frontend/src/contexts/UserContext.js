import React, { createContext, useState, useContext } from 'react'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [apiHost, setApiHost] = useState('https://infra-track-backend.vercel.app/');

    const saveToken = (token) => {
        setToken(token);
    }
    return (
        <UserContext.Provider value={{ token, saveToken, apiHost }}>
            {children} {/* Render the children here */}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
}