import React, { createContext, useState } from "react";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState(null);
    const [isProduct, setIsProduct] = useState(null);
    const [prodID, setProdID] = useState(null);
    const [user, setUser] = useState(null);

    const passedData = {
        isLoading,
        setIsLoading,
        products,
        setProducts,
        isProduct,
        setIsProduct,
        prodID,
        setProdID,
        user,
        setUser
    };
    return (
        <StateContext.Provider value={passedData}>
            {children}
        </StateContext.Provider>
    );
};

export default StateProvider;
