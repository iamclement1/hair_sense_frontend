import React, { useContext, useEffect, useState } from "react";

import {
    Box,
    Divider,
    Flex,
    Text,
    Button,
    Image,
    Center,
    useDisclosure,
} from "@chakra-ui/react";
import { PrimaryButton, StarRating } from "../Common";
import { CartContext, StateContext } from "@/context/StateProvider";
import { SecondaryButton } from "./Button";
import { FaTrash } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import EmptyCart from "./EmptyCart";
import { useRouter } from "next/router";
import AuthModal from "../modal/AuthModal";
import { baseUrl, httpPost } from "@/http-request/http-request";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const ModalCartItem = ({ onOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {
        isOpen: isOpenAuth,
        onOpen: onOpenAuth,
        onClose: onCloseAuth,
    } = useDisclosure();
    const { user, products, setProducts } = useContext(StateContext);

    const [total, setTotal] = useState(0);
    const GlobalCart = useContext(CartContext);
    const state = GlobalCart.state;
    const dispatch = GlobalCart.dispatch;

    //calculate total price of the quantity added to the cart

    // Retrieve cart items from sessionStorage
    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

    //remove cart from state and sessionStorage
    const handleRemoveFromCart = (product) => {
        const dispatch = GlobalCart.dispatch;

        // Remove the item from the cart state
        dispatch({ type: "REMOVE", payload: product });

        // Get the existing cart data from sessionStorage
        const existingCartData =
            JSON.parse(sessionStorage.getItem("cart")) || [];

        // Find the index of the item to remove in the existing cart data
        const itemIndex = existingCartData.findIndex(
            (item) => item.id === product.id
        );

        if (itemIndex !== -1) {
            // Remove the item from the existing cart data
            existingCartData.splice(itemIndex, 1);

            // Update the cart data in sessionStorage
            sessionStorage.setItem("cart", JSON.stringify(existingCartData));
        }
    };

    //increase the quantity of an item in the cart and update the quantity in the sessionStorage
    const handleIncreaseQuantity = (product) => {
        const dispatch = GlobalCart.dispatch;

        // Update the quantity in the cart state
        dispatch({ type: "INCREASE_QUANTITY", payload: product });

        // Get the existing cart data from sessionStorage
        const existingCartData =
            JSON.parse(sessionStorage.getItem("cart")) || [];

        // Find the index of the item in the existing cart data
        const itemIndex = existingCartData.findIndex(
            (item) => item.id === product.id
        );

        if (itemIndex !== -1) {
            // Update the quantity in the existing cart data
            existingCartData[itemIndex].quantity += 1;

            // Update the cart data in sessionStorage
            sessionStorage.setItem("cart", JSON.stringify(existingCartData));
        }
    };

    //decrease the quantity of an item in the cart and in sessionStorage
    const handleDecreaseQuantity = (product) => {
        const dispatch = GlobalCart.dispatch;

        if (product.quantity > 1) {
            // Decrease the quantity in the cart state
            dispatch({ type: "DECREASE_QUANTITY", payload: product });

            // Get the existing cart data from sessionStorage
            const existingCartData =
                JSON.parse(sessionStorage.getItem("cart")) || [];

            // Find the index of the item in the existing cart data
            const itemIndex = existingCartData.findIndex(
                (item) => item.id === product.id
            );

            if (itemIndex !== -1) {
                // Decrease the quantity in the existing cart data
                existingCartData[itemIndex].quantity -= 1;

                // Update the cart data in sessionStorage
                sessionStorage.setItem(
                    "cart",
                    JSON.stringify(existingCartData)
                );
            }
        } else {
            // Remove the item from the cart state
            dispatch({ type: "REMOVE", payload: product });

            // Get the existing cart data from sessionStorage
            const existingCartData =
                JSON.parse(sessionStorage.getItem("cart")) || [];

            // Remove the item from the existing cart data
            const updatedCartData = existingCartData.filter(
                (item) => item.id !== product.id
            );

            // Update the cart data in sessionStorage
            sessionStorage.setItem("cart", JSON.stringify(updatedCartData));
        }
    };

    // calculate total item in cartItemsFromLocalStorage

    useEffect(() => {
        let totalPrice = 0;

        // state.forEach((product) => {
        //     totalPrice += product.actual_price * product.quantity;
        // });

        // Get the existing cart data from sessionStorage
        const existingCartData =
            JSON.parse(sessionStorage.getItem("cart")) || [];

        existingCartData.forEach((product) => {
            totalPrice += product.actual_price * product.quantity;
        });

        setTotal(totalPrice);
    }, [state]);
    const access_token = Cookies.get("access_token");
    //handle checkout payment button with paystack
    const sendCartItems = async () => {
        // sessionStorage.setItem("sample", JSON.stringify(cartItems));

        setLoading(true);

        if (cartItems.length > 0) {
            await axios
                .post(`${baseUrl}/store/cart/items/`, cartItems, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then((response) => {
                    //success callback
                    if (response?.status === 200) {
                        toast.success(
                            "Successful... You will now been Redirected to the checkout page"
                        );
                        onClose();
                        setLoading(false);
                        router.push("/checkout");
                    }
                })
                .catch((error) => {
                    setLoading(false);

                    toast.error(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <>
            <Box>
                {/* Cart Item Section  */}
                {cartItems.length === 0 ? (
                    <Box py="30px">
                        <EmptyCart onOpen={onOpen} onClose={onClose} />
                    </Box>
                ) : (
                    <Box>
                        {cartItems?.map((product, index) => {
                            // adding the total amoount to the object

                            product.amount =
                                product.quantity * product.actual_price;
                            return (
                                <Box key={index}>
                                    <Flex
                                        flexDirection="column"
                                        justifyContent="space-between"
                                        // alignItems="center"
                                        py="30px"
                                    >
                                        <Flex
                                            // align="center"
                                            w="100%"
                                            h="max-content"
                                            gap={["none", "30px"]}
                                        >
                                            <Box>
                                                <Image
                                                    src={product?.product_img}
                                                    alt={product?.name}
                                                    w={{
                                                        base: "98px",
                                                        md: "130px",
                                                    }}
                                                    h={{
                                                        base: "98px",
                                                        md: "130px",
                                                    }}
                                                    objectFit="cover"
                                                />
                                            </Box>
                                            <Flex
                                                flexDir="column"
                                                justify="space-between"
                                                flex="1"
                                            >
                                                <Box>
                                                    <Text
                                                        fontSize={{
                                                            base: "12px",
                                                            md: "16px",
                                                            lg: "23px",
                                                        }}
                                                        fontWeight={"600"}
                                                        maxW="600px"
                                                        noOfLines={2}
                                                    >
                                                        {product?.name}
                                                    </Text>
                                                </Box>
                                                <Flex
                                                    justify="space-between"
                                                    align="center"
                                                >
                                                    <Box>
                                                        <Text
                                                            fontSize={{
                                                                base: "12px",
                                                                md: "16px",
                                                                lg: "23px",
                                                            }}
                                                            fontWeight={"600"}
                                                        >
                                                            ₦{" "}
                                                            {product.quantity *
                                                                product.actual_price}
                                                        </Text>
                                                    </Box>

                                                    <Flex
                                                        align="center"
                                                        alignSelf="flex-end"
                                                    >
                                                        <Text
                                                            as="button"
                                                            boxSize={{
                                                                base: "30px",
                                                                md: "23px",
                                                                xl: "39px",
                                                            }}
                                                            bgColor="accent_8"
                                                            color="white"
                                                            rounded={"3px"}
                                                            minW="30px"
                                                            aria-label="reduce quantity"
                                                            onClick={() =>
                                                                handleDecreaseQuantity(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </Text>

                                                        <Text
                                                            minW="32px"
                                                            align="center"
                                                            justify="center"
                                                            fontSize={{
                                                                base: "13px",
                                                                sm: "15px",
                                                                md: "13px",
                                                                xl: "22px",
                                                            }}
                                                        >
                                                            {product?.quantity}
                                                        </Text>
                                                        {/* <Button
                                                    aria-label="Add to quantity"
                                                    onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: product })}
                                                >
                                                    +
                                                </Button> */}

                                                        <Text
                                                            as="button"
                                                            boxSize={{
                                                                base: "30px",
                                                                md: "23px",
                                                                xl: "39px",
                                                            }}
                                                            bgColor="accent_8"
                                                            color="white"
                                                            rounded={"3px"}
                                                            minW="30px"
                                                            aria-label="Add to quantity"
                                                            onClick={() =>
                                                                handleIncreaseQuantity(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </Text>
                                                        <Box
                                                            ml="20px"
                                                            cursor={"pointer"}
                                                            onClick={() =>
                                                                handleRemoveFromCart(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            <FaTrash />
                                                        </Box>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                    <Divider />
                                </Box>
                            );
                        })}

                        {/* Pricing data */}
                        <Box>
                            <Flex
                                justify="space-between"
                                align="center"
                                mt="34px"
                            >
                                <Text
                                    fontWeight="600"
                                    fontSize={{
                                        base: "12px",
                                        md: "24px",
                                        lg: "25px",
                                    }}
                                    color="accent_2"
                                >
                                    Sub Total
                                </Text>

                                <Text
                                    fontSize={{
                                        base: "12px",
                                        md: "20px",
                                        lg: "24px",
                                        xl: "25px",
                                    }}
                                    fontWeight="600"
                                >
                                    ₦ {total}
                                </Text>
                            </Flex>

                            {/* TOtal price  */}
                            <Flex
                                justify="space-between"
                                align="center"
                                mt="14px"
                            >
                                <Text
                                    fontWeight="600"
                                    fontSize={{
                                        base: "12px",
                                        md: "24px",
                                        lg: "25px",
                                    }}
                                    color="accent_2"
                                >
                                    Total
                                </Text>

                                <Text
                                    fontSize={{
                                        base: "12px",
                                        md: "20px",
                                        lg: "24px",
                                        xl: "25px",
                                    }}
                                    fontWeight="600"
                                >
                                    ₦ {total}
                                </Text>
                            </Flex>
                        </Box>

                        <Box maxW="571px" mx="auto" w="100%" textAlign="center">
                            {/* Button Section  */}

                            <Flex
                                gap={{ base: "16px", md: "20px", xl: "30px" }}
                                w="100%"
                                mt={{ base: "40px", md: "50px", xl: "58px" }}
                            >
                                <SecondaryButton
                                    w="100%"
                                    text="View Cart"
                                    handleButton={() => router.push("/cart")}
                                />

                                {user && user ? (
                                    <PrimaryButton
                                        text="Check Out"
                                        w="100%"
                                        handleButton={sendCartItems}
                                        isLoading={loading}
                                    />
                                ) : (
                                    <PrimaryButton
                                        text="Login to checkout"
                                        w="100%"
                                        handleButton={() => {
                                            // onClose();
                                            onOpenAuth();
                                        }}
                                        isLoading={loading}
                                    />
                                )}
                            </Flex>

                            <Box mt={{ base: "18px", md: "24px" }}>
                                <Text
                                    fontWeight="600"
                                    cursor="pointer"
                                    fontSize={{ base: "12px", lg: "16px" }}
                                    color="primary_1"
                                    onClick={onClose}
                                >
                                    Continue Shopping
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                )}
                {/* <Divider my={["24px", null, "34px"]} /> */}
            </Box>
            {/* Login page modal */}
            <AuthModal
                isOpen={isOpenAuth}
                onOpen={onOpenAuth}
                onClose={onCloseAuth}
            />
        </>
    );
};

export default ModalCartItem;
