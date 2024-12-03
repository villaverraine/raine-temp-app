import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const defaultState = {
        profile: {
            _id: '',
            username: '',
            first: '',
            last: '',
            email: '',
            contactNumber: ''
        },
        token: ''
    };

    const [state, setState] = useState(() => {
        const savedState = localStorage.getItem("appState");
        return savedState ? JSON.parse(savedState) : defaultState;
    });

    const resetState = () => setState(defaultState);

    useEffect(() => {
        localStorage.setItem("appState", JSON.stringify(state));
        console.log(state);
    }, [state]);

    return (
        <AppContext.Provider value={{ state, setState, resetState }}>
            {children}
        </AppContext.Provider>
    );
};