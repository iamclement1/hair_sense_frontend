
import { useRouter } from "next/router";
import React, {
    createContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
    useCallback
} from "react";
import { toast } from "react-hot-toast";

export const StateContext = createContext();
export const CartContext = createContext();

const StateProvider = ({ children }, props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState(null);
    const [isProduct, setIsProduct] = useState(null);
    const [prodID, setProdID] = useState(null);
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState({ id: "", firstName: "", lastName: "", email: "" });
    const [cart, setCart] = useState(null);
    // Checkout states
    const [addressDetails, setAddressDetails] = useState(null);
    const [deliveryMethod, setDeliveryMethod] = useState("pickup");
    let token;

    if (typeof window !== 'undefined') {
        token = sessionStorage.getItem("access_token");
    }
    // Checkout values and fucntions

    // Get length of cartItems

    // Checkout States ends

    const router = useRouter();

    useEffect(() => {
        const mainUser_token = token;

        setUser(mainUser_token);
    }, [token]);
    const handleLogOut = useCallback(() => {
        router.push("/");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("currentUser");
        sessionStorage.removeItem("role")
        sessionStorage.removeItem("cartState");
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("current_product");
        // sessionStorage.removeItem("access_token", access_token)
        toast.success("Logged out successfully");
        setUser(null);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }, [router, setUser]);

    const passedData = useMemo(() => {
        return {
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
            addressDetails,
            setAddressDetails,
            deliveryMethod,
            setDeliveryMethod,
            userInfo,
            setUserInfo,
            // deliverFee,
            // subTotal,
            // totalBill,
        };
    }, [
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
        addressDetails,
        setAddressDetails,
        deliveryMethod,
        setDeliveryMethod,
        userInfo,
        setUserInfo,
        // deliverFee,
        // subTotal,
        // totalBill,
    ]);
    //dispatch and state => dispatch pushes the actions
    const reducer = (state, action) => {
        switch (action.type) {
            case "ADD_ITEM_TO_CART":
                //create a temporary state to avoid a particular item be added to the cart more than once
                //used filter to check if the item is already in the cart before adding it to the cart
                //each object is represented by item in the cart
                //check if action.payload.id is equal to the item.id
                const tempstate = state.filter(
                    (item) => action.payload.product.id === item.id
                );
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
                const remove = state.filter(
                    (item) => item.id !== action.payload.id
                );
                return remove;

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, []);
    const cartInfo = useMemo(() => ({ state, dispatch }), [state, dispatch]);

    return (
        <StateContext.Provider value={passedData}>
            <CartContext.Provider value={cartInfo}>
                {children}
            </CartContext.Provider>
        </StateContext.Provider>
    );
};

export default StateProvider;
