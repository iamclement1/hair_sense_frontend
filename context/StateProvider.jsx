import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";

export const StateContext = createContext();
export const CartContext = createContext();


const StateProvider = ({ children }, props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState(null);
    const [isProduct, setIsProduct] = useState(null);
    const [prodID, setProdID] = useState(null);
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);

    const router = useRouter();


    useEffect(() => {
        const mainUser_token = Cookies.get("access_token");

        setUser(mainUser_token && mainUser_token);
    }, []);
    const handleLogOut = () => {
        Cookies.remove("access_token");
        Cookies.remove("currentUser");
        toast("Logged out successfully");
        setUser(null);

        setTimeout(() => {
            router.push("/");
            location.reload(); // Reload the page
        }, 2000); // 1 second delay
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
        cart,
        setCart,
    };
    //dispatch and state => dispatch pushes the actions 
    const reducer = (state, action) => {
        switch (action.type) {
            case "ADD_ITEM_TO_CART":
                //create a temporary state to avoid a particular item be added to the cart more than once
                //used filter to check if the item is already in the cart before adding it to the cart
                //each object is represented by item in the cart
                //check if action.payload.id is equal to the item.id
                const tempstate = state.filter((item) => action.payload.product.id === item.id);
                //if available then we have an id greater than zero means that the item is already in the cart
                if (tempstate.length > 0) {
                    return state;
                } else {
                    return [...state, action.payload.product];
                }

            case "INCREASE_QUANTITY":
                // const { id, quantity } = action.payload;
                const tempQuantity = state.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
                return tempQuantity;

            case "DECREASE_QUANTITY":
                // const { decID, dQuantity } = action.payload;
                const decQuantity = state.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity - 1,
                        };
                    } else {
                        return item;
                    }
                });
                return decQuantity;

            case "REMOVE":
                // remove item from state
                const remove = state.filter((item) => item.id !== action.payload.id);
                return remove;

            default:
                return state;
        }
    };


    const [state, dispatch] = useReducer(reducer, []);
    const cartInfo = { state, dispatch };
    return (
        <StateContext.Provider value={passedData}>
            <CartContext.Provider value={cartInfo}>
                {children}
            </CartContext.Provider>
        </StateContext.Provider>
    );
};

export default StateProvider;