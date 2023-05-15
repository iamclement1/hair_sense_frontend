import React, { useContext, useState } from "react";

import {
    Box,
    Divider,
    Flex,
    Text,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Link,
    Modal,
    ModalHeader,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Select,
    Image,
} from "@chakra-ui/react";
import { PrimaryButton, StarRating } from "../Common";
import { CartContext } from "@/context/StateProvider";
import { SecondaryButton } from "./Button";
import { FaTrash } from "react-icons/fa";

const ModalCartItem = () => {
    const [quantity, setQuantity] = useState(1);
    const GlobalCart = useContext(CartContext);
    const state = GlobalCart.state;
    
    const increaseQuantity = () => {
        const dispatch = GlobalCart.dispatch;
        const { id, quantity } = state;
        // console.log(state);
        dispatch({
            type: "INCREASE_QUANTITY",
            payload: {
                id: id,
                quantity: quantity + 1,
            },
        })

    }
    return (
        <Box>
            {/* Cart Item Section  */}
            {
                state && state.map((item, index) => {
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
                                            src={item.product_img}
                                            alt={item.name}
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
                                                {item.name}
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
                                                ₦ {" "}{item.quantity * item.sales_price}
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
                                        
                                    >
                                        -
                                    </Button>
                                    <Text w="54px" textAlign="center">
                                        {item.quantity}
                                    </Text>
                                    <Button
                                        aria-label="Add to quantity"
                                        onClick={increaseQuantity}
                                    >
                                        +
                                    </Button>
                                    <Box>
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
                <Flex justify="space-between" align="center">
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
                        Subtotal
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
                        ₦ 4,000
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
                        ₦ 4,000
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
                    <SecondaryButton w="100%" text="View Cart" />

                    <PrimaryButton text="Check Out" w="100%" />
                </Flex>
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

            {/* <Divider my={["24px", null, "34px"]} /> */}
        </Box>
    );
};

export default ModalCartItem;
