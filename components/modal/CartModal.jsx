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
            </ModalContent>
        </Modal>
    );
};

export default CartModal;
