import React, { useState } from "react";
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

import NextLink from "next/link";

import ModalCartItem from "../Common/ModalCartItem";
import { PrimaryButton, SecondaryButton } from "../Common/Button";

const CartModal = ({ isOpen, onClose, onOpen }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent
                bgColor={"white"}
                mx={["16px"]}
                px={["20px", null, "64px"]}
                py={["23px", null, "46px"]}
                rounded={["12px", null, "none"]}
            >
                <Flex gap="20px" justify="space-between" align="center">
                    <Text
                        fontSize={{
                            base: "16px",
                            md: "24px",
                            lg: "26px",
                            xl: "40px",
                        }}
                        fontWeight="600"
                        color="accent_2"
                    >
                        My Cart
                    </Text>
                    <ModalCloseButton
                        position={"relative"}
                        top={"0px"}
                        right="0px"
                    />
                </Flex>

                <Divider mt="15px" />

                <ModalCartItem />

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
                        <Link
                            as={NextLink}
                            fontWeight="600"
                            href="/"
                            color="primary_1"
                        >
                            Continue Shopping
                        </Link>
                    </Box>
                </Box>
            </ModalContent>
        </Modal>
    );
};

export default CartModal;
