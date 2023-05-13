import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState(null);
    const [isProduct, setIsProduct] = useState(null);
    const [prodID, setProdID] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const mainUser_token = Cookies.get("access_token");

        setUser(mainUser_token && mainUser_token);
    }, []);
    const handleLogOut = () => {
        Cookies.remove("access_token");
        setUser(null);
        toast("Logout successful");
    };

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
        setUser,
        handleLogOut,
    };
    return (
        <StateContext.Provider value={passedData}>
            {children}
        </StateContext.Provider>
    );
};

export default StateProvider;
