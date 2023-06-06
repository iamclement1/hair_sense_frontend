import {
    Box,
    Flex,
    Button,
    Divider,
    Icon,
    Text,
    Image,
} from "@chakra-ui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import CartItemBoxDetails from "@/components/Common/CartItemBoxDetails";
import { PrimaryButton, ProductSlider } from "@/components/Common";
import { useRouter } from "next/router";

const EmptyCart = ({ onOpen, onClose }) => {
    const router = useRouter();
    return (
        <Flex minH="300px" align="center" justify="center">
            <Box>
                <Box
                    p="31px 36px"
                    border="1px"
                    borderColor="primary_1"
                    maxW="150px"
                    mx="auto"
                    rounded="10px"
                >
                    <Icon
                        as={MdRemoveShoppingCart}
                        color="primary_1"
                        boxSize="71px"
                    />
                </Box>
                <Box textAlign="center" mt="20px">
                    <Text
                        fontWeight="600"
                        fontSize={{ base: "20px", md: "32px" }}
                    >
                        Your cart is empty
                    </Text>
                    <Text mt="10px">
                        Browse through our categories and discover our amazing
                        deals
                    </Text>
                </Box>
                <Box mt={{ base: "30px" }}>
                    <PrimaryButton
                        text="Go Shopping"
                        maxW={{ base: "100%", md: "215px" }}
                        mx="auto"
                        handleButton={() => {
                            onClose();
                            router.push("/");
                        }}
                    />
                </Box>
            </Box>
        </Flex>
    );
};

export default EmptyCart;
