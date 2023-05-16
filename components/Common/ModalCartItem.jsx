import React, { useContext, useEffect, useState } from "react";

import {
    Box,
    Divider,
    Flex,
    Text,
    Button,
    Image,
    Center,
} from "@chakra-ui/react";
import { PrimaryButton, StarRating } from "../Common";
import { CartContext, StateContext } from "@/context/StateProvider";
import { SecondaryButton } from "./Button";
import { FaTrash } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";

const ModalCartItem = () => {
    const { user, product } = useContext(StateContext);
    const [total, setTotal] = useState(0);
    const GlobalCart = useContext(CartContext);
    const state = GlobalCart.state;
    const dispatch = GlobalCart.dispatch

    //calculate total price of the quantity added to the cart


    useEffect(() => {
        let totalPrice = 0;
        state.forEach((product) => {
            totalPrice += (product.sales_price * product.quantity);
        });
        setTotal(totalPrice);
        console.log(totalPrice, total);
    }, [state, total]);

    //handle checkout payment button with paystack
    const handleCheckout = () => {
        alert('Checkout');
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
                            state && state.map((product, index) => {
                                return (
                                    <Box key={index}>
                                        <Flex
                                            flexDirection="column"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Flex align="center" w="100%" justify="space-between">
                                                <Box>
                                                    <Image
                                                        src={product?.product_img}
                                                        alt={product?.name}
                                                        w={{ base: "98px", md: "120px", xl: "177px" }}
                                                        h={{ base: "98px", md: "120px", xl: "177px" }}
                                                        objectFit="cover"
                                                    />
                                                </Box>
                                                <Box>
                                                    <Box>
                                                        <Text
                                                            fontSize={{
                                                                base: "12px",
                                                                md: "16px",
                                                                lg: "24px",
                                                                xl: "32px",
                                                            }}
                                                            fontWeight={"600"}>
                                                            {product?.name}
                                                        </Text>
                                                    </Box>
                                                    <Box>
                                                        <Text
                                                            fontSize={{
                                                                base: "12px",
                                                                md: "16px",
                                                                lg: "24px",
                                                                xl: "32px"
                                                            }}
                                                            fontWeight={"600"} >
                                                            ₦ {" "}{product.quantity * product.sales_price}
                                                        </Text>
                                                    </Box>
                                                </Box>
                                            </Flex>
                                            {/* <Divider /> */}
                                            {/* increaes cart item buttons for large Desktop */}
                                            <Flex
                                                align="center"
                                                alignSelf="flex-end"
                                                display={{
                                                    base: "none",
                                                    md: "flex",
                                                    lg: "flex",
                                                    xl: "flex",
                                                }}
                                            >
                                                <Button
                                                    aria-label="reduce quantity"
                                                    onClick={() => {
                                                        if (product.quantity > 1) {
                                                            dispatch({ type: "DECREASE_QUANTITY", payload: product })
                                                        } else {
                                                            dispatch({ type: "REMOVE", payload: product })
                                                        }
                                                    }}
                                                >
                                                    -
                                                </Button>
                                                <Text w="54px" textAlign="center">
                                                    {product?.quantity}
                                                </Text>
                                                <Button
                                                    aria-label="Add to quantity"
                                                    onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: product })}
                                                >
                                                    +
                                                </Button>
                                                <Box onClick={() => dispatch({ type: "REMOVE", payload: product })}
                                                >
                                                    <FaTrash />
                                                </Box>
                                            </Flex>
                                            <Divider />
                                        </Flex>
                                    </Box>
                                )
                            })
                        }

                        {/* Pricing data */}
                        <Box>
                            <Flex justify="space-between" align="center" mt="14px">

                                <Text
                                    fontWeight="600"
                                    fontSize={{
                                        base: "12px",
                                        md: "24px",
                                        lg: "26px",
                                        xl: "40px",
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
                            <Flex justify="space-between" align="center" mt="14px">

                                <Text
                                    fontWeight="600"
                                    fontSize={{
                                        base: "12px",
                                        md: "24px",
                                        lg: "26px",
                                        xl: "40px",
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
                                <Box>
                                    {user && user ? (
                                        <PrimaryButton w="100%" text="Checkout"
                                        onClick={handleCheckout} />
                                    ) : (
                                        <SecondaryButton w="100%" text="Login to checkout" disabled />
                                    )}
                                    <Box mt={{ base: "18px", md: "24px" }}>
                                        <Text
                                            fontWeight="600"
                                            cursor="pointer"
                                            fontSize={{ base: "12px", lg: "16px" }}
                                            color="primary_1"
                                        >
                                            Continue Shopping
                                        </Text>
                                    </Box>
                                </Box>
                                {/* <SecondaryButton w="100%" text="View Cart" /> */}

                                {/* <PrimaryButton text="Check Out" w="100%" /> */}
                            </Flex>

                        </Box>

                    </Box>
                )
            }

            {/* <Divider my={["24px", null, "34px"]} /> */}
        </Box>
    );
};

export default ModalCartItem;
