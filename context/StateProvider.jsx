import React, { createContext, useState } from "react";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const passedData = {
        isLoading,
        setIsLoading,
    };
    return (
        <StateContext.Provider value={passedData}>
            {children}
        </StateContext.Provider>
    );
};

export default StateProvider;

