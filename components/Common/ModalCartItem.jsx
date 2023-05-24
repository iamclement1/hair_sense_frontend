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

const ModalCartItem = ({ onOpen, onClose }) => {
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


    // Retrieve cart items from localStorage
    const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem("cartItems")) || [];

    // calculate total item in cartItemsFromLocalStorage

    useEffect(() => {
        let totalPrice = 0;
        state.forEach((product) => {
            totalPrice += (product.actual_price * product.quantity);
            // const productData = product;
            // setProducts(productData);
            // console.log("productin modal", productData);
        });
        setTotal(totalPrice);
    }, [state]);


    //handle checkout payment button with paystack
    const handleCheckout = () => {
        alert("Checkout");
    };



    return (
        <Box>
            {/* Cart Item Section  */}
            {
                state.length === 0 ? (
                    <Box mt="19px">
                        <Center>
                            <Text fontSize={{
                                base: "120px",
                                md: "160px",
                                lg: "240px",
                                xl: "320px",
                            }}
                                align="center"
                                fontWeight={"600"}>
                                <BsCart4 />
                            </Text>
                        </Center>

                        <Box mt="19px" textAlign="center">
                            <Text fontSize={{ base: "20px", md: "20px", lg: "20px", xl: "20px" }}>
                                You have no items in your cart.
                            </Text>
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        {
                            cartItemsFromLocalStorage && cartItemsFromLocalStorage.map((product, index) => {
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
                                                        src={
                                                            product?.product_img
                                                        }
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
                                                                fontWeight={
                                                                    "600"
                                                                }
                                                            >
                                                                ₦{" "}
                                                                {product.quantity *
                                                                    product.actual_price}
                                                            </Text>
                                                        </Box>

                                                        <Flex
                                                            align="center"
                                                            alignSelf="flex-end"
                                                            // display={{
                                                            //     base: "none",
                                                            //     md: "flex",
                                                            //     lg: "flex",
                                                            //     xl: "flex",
                                                            // }}
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
                                                                onClick={() => {
                                                                    if (
                                                                        product.quantity >
                                                                        1
                                                                    ) {
                                                                        dispatch(
                                                                            {
                                                                                type: "DECREASE_QUANTITY",
                                                                                payload:
                                                                                    product,
                                                                            }
                                                                        );
                                                                    } else {
                                                                        dispatch(
                                                                            {
                                                                                type: "REMOVE",
                                                                                payload:
                                                                                    product,
                                                                            }
                                                                        );

                                                                        // Retrieve the existing cart items from localStorage
                                                                        const existingCartItems =
                                                                            JSON.parse(
                                                                                localStorage.getItem(
                                                                                    "cartItems"
                                                                                )
                                                                            ) ||
                                                                            [];

                                                                        // Find the index of the item to be removed
                                                                        const itemIndex =
                                                                            existingCartItems.findIndex(
                                                                                (
                                                                                    item
                                                                                ) =>
                                                                                    item.id ===
                                                                                    product.id
                                                                            );

                                                                        if (
                                                                            itemIndex !==
                                                                            -1
                                                                        ) {
                                                                            // Remove the item from the cart items array
                                                                            existingCartItems.splice(
                                                                                itemIndex,
                                                                                1
                                                                            );

                                                                            // Save the updated cart items to localStorage
                                                                            localStorage.setItem(
                                                                                "cartItems",
                                                                                JSON.stringify(
                                                                                    existingCartItems
                                                                                )
                                                                            );
                                                                        }
                                                                    }
                                                                }}
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
                                                                {
                                                                    product?.quantity
                                                                }
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
                                                                onClick={() => {
                                                                    dispatch({
                                                                        type: "INCREASE_QUANTITY",
                                                                        payload:
                                                                            product,
                                                                    });

                                                                    // Retrieve the existing cart items from localStorage
                                                                    const existingCartItems =
                                                                        JSON.parse(
                                                                            localStorage.getItem(
                                                                                "cartItems"
                                                                            )
                                                                        ) || [];

                                                                    // Find the index of the item to be increased
                                                                    const itemIndex =
                                                                        existingCartItems.findIndex(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.id ===
                                                                                product.id
                                                                        );

                                                                    if (
                                                                        itemIndex !==
                                                                        -1
                                                                    ) {
                                                                        // Increase the quantity of the item
                                                                        existingCartItems[
                                                                            itemIndex
                                                                        ] = {
                                                                            ...existingCartItems[
                                                                                itemIndex
                                                                            ],
                                                                            quantity:
                                                                                existingCartItems[
                                                                                    itemIndex
                                                                                ]
                                                                                    .quantity +
                                                                                1,
                                                                        };

                                                                        // Save the updated cart items to localStorage
                                                                        localStorage.setItem(
                                                                            "cartItems",
                                                                            JSON.stringify(
                                                                                existingCartItems
                                                                            )
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                +
                                                            </Text>

                                                            <Box
                                                                onClick={() => {
                                                                    dispatch({
                                                                        type: "REMOVE",
                                                                        payload:
                                                                            product,
                                                                    });

                                                                    // Retrieve the existing cart items from localStorage
                                                                    const existingCartItems =
                                                                        JSON.parse(
                                                                            localStorage.getItem(
                                                                                "cartItems"
                                                                            )
                                                                        ) || [];

                                                                    // Find the index of the item to be removed
                                                                    const itemIndex =
                                                                        existingCartItems.findIndex(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item.id ===
                                                                                product.id
                                                                        );

                                                                    if (
                                                                        itemIndex !==
                                                                        -1
                                                                    ) {
                                                                        // Remove the item from the cart items array
                                                                        existingCartItems.splice(
                                                                            itemIndex,
                                                                            1
                                                                        );

                                                                        // Save the updated cart items to localStorage
                                                                        localStorage.setItem(
                                                                            "cartItems",
                                                                            JSON.stringify(
                                                                                existingCartItems
                                                                            )
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                {/* <Box ml="20px">
                                                                <FaTrash />
                                                            </Box> */}
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
                                        handleButton={() =>
                                            router.push("/checkout")
                                        }
                                    />
                                ) : (
                                    <PrimaryButton
                                        text="Login to checkout"
                                        w="100%"
                                        handleButton={() => {
                                            // onClose();
                                            onOpenAuth();
                                        }}
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
