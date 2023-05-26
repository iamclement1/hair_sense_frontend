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
import EmptyCart from "@/components/Common/EmptyCart";

const Cart = () => {
    // Retrieve cart items from localStorage
    let cartItems = [];

    if (typeof window !== "undefined") {
        cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    }

    return (
        <Box w="100%" mt={{ base: "33px", md: "74px", xl: "" }}>
            <Flex align="center" justify="space-between" w="100%">
                <Text
                    fontSize={{ base: "13px", md: "20px", xl: "30px" }}
                    fontWeight="600"
                >
                    My Cart
                </Text>
                <Icon as={FaTimes} />
            </Flex>
            <Divider mt="8px" />

            <Box mt="59px" w="100%">
                {cartItems ? (
                    <>
                        {cartItems &&
                            cartItems.map((item, i) => {
                                return (
                                    <CartItemBoxDetails
                                        key={i}
                                        singleItem={item}
                                    />
                                );
                            })}

                        <Box mt={{ base: "35px", md: "53px" }}>
                            <PrimaryButton
                                text="Proceed to Checkout"
                                maxW={{ base: "100%", md: "215px" }}
                                mx="auto"
                            />
                        </Box>
                    </>
                ) : (
                    <EmptyCart />
                )}
            </Box>
            {/* **********Other Component ************** */}

            {/* Clients Also Bought */}
            <Box>
                <ProductSlider
                    section="Clients Also Bought"
                    type="other"
                    productDatas={[]}
                />
            </Box>

            {/* Related Products */}
            <Box>
                <ProductSlider
                    section="Related Product"
                    type="other"
                    productDatas={[]}
                />
            </Box>
        </Box>
    );
};

export default Cart;
