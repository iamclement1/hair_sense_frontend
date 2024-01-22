import { CartContext } from "@/context/StateProvider";
import {
    Box,
    Flex,
    Icon,
    Text,
    Image,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const CartItemBoxDetails = ({ singleItem }) => {

    const { id, name, actual_price, sales_price, product_img, quantity } =
        singleItem;

    const [total, setTotal] = useState(0);
    const GlobalCart = useContext(CartContext);
    const state = GlobalCart.state;
    const dispatch = GlobalCart.dispatch;

    //remove cart from state and sessionStorage
    const handleRemoveFromCart = (singleItem) => {
        const dispatch = GlobalCart.dispatch;

        // Remove the item from the cart state
        dispatch({ type: "REMOVE", payload: singleItem });

        // Get the existing cart data from sessionStorage
        const existingCartData = JSON.parse(sessionStorage.getItem("cart")) || [];

        // Find the index of the item to remove in the existing cart data
        const itemIndex = existingCartData.findIndex(
            (item) => item.id === singleItem.id
        );

        if (itemIndex !== -1) {
            // Remove the item from the existing cart data
            existingCartData.splice(itemIndex, 1);

            // Update the cart data in sessionStorage
            sessionStorage.setItem("cart", JSON.stringify(existingCartData));
        }
    };

    //increase the quantity of an item in the cart and update the quantity in the sessionStorage
    const handleIncreaseQuantity = (singleItem) => {
        const dispatch = GlobalCart.dispatch;

        // Update the quantity in the cart state
        dispatch({ type: "INCREASE_QUANTITY", payload: singleItem });

        // Get the existing cart data from sessionStorage
        const existingCartData = JSON.parse(sessionStorage.getItem("cart")) || [];

        // Find the index of the item in the existing cart data
        const itemIndex = existingCartData.findIndex(
            (item) => item.id === singleItem.id
        );

        if (itemIndex !== -1) {
            // Update the quantity in the existing cart data
            existingCartData[itemIndex].quantity += 1;

            // Update the cart data in sessionStorage
            sessionStorage.setItem("cart", JSON.stringify(existingCartData));
        }
    };

    //decrease the quantity of an item in the cart and in sessionStorage
    const handleDecreaseQuantity = (singleItem) => {
        const dispatch = GlobalCart.dispatch;

        if (singleItem.quantity > 1) {
            // Decrease the quantity in the cart state
            dispatch({ type: "DECREASE_QUANTITY", payload: singleItem });

            // Get the existing cart data from sessionStorage
            const existingCartData =
                JSON.parse(sessionStorage.getItem("cart")) || [];

            // Find the index of the item in the existing cart data
            const itemIndex = existingCartData.findIndex(
                (item) => item.id === singleItem.id
            );

            if (itemIndex !== -1) {
                // Decrease the quantity in the existing cart data
                existingCartData[itemIndex].quantity -= 1;

                // Update the cart data in sessionStorage
                sessionStorage.setItem("cart", JSON.stringify(existingCartData));
            }
        } else {
            // Remove the item from the cart state
            dispatch({ type: "REMOVE", payload: singleItem });

            // Get the existing cart data from sessionStorage
            const existingCartData =
                JSON.parse(sessionStorage.getItem("cart")) || [];

            // Remove the item from the existing cart data
            const updatedCartData = existingCartData.filter(
                (item) => item.id !== singleItem.id
            );

            // Update the cart data in sessionStorage
            sessionStorage.setItem("cart", JSON.stringify(updatedCartData));
        }
    };

    useEffect(() => {
        let totalPrice = 0;
        // Get the existing cart data from sessionStorage
        const existingCartData = JSON.parse(sessionStorage.getItem("cart")) || [];

        existingCartData.forEach((singleItem) => {
            totalPrice += singleItem.actual_price * singleItem.quantity;
        });

        setTotal(totalPrice);
    }, [state]);

    return (
        <Flex
            mt="30px"
            flexWrap={{ base: "wrap", md: "nowrap", xl: "" }}
            gap="30px"
            align={{ base: "auto", md: "center", xl: "" }}
        >
            <Box>
                <Icon
                    as={IoIosCloseCircleOutline}
                    boxSize={{ base: "21px", md: "27px" }}
                />
            </Box>
            {/* product Image */}

            <Image
                src={product_img && product_img}
                maxW={{ base: "188px", md: "115px" }}
                maxH={{ base: "188px", md: "115px" }}
                alt={name}
                display={"block"}
                mx="auto"
            />

            {/* Product Name */}
            <Box w={["100%", "80%"]}>
                <Text
                    fontSize={{ base: "15px", md: "10px", xl: "17px" }}
                    fontWeight="600"
                >
                    Product
                </Text>
                <Text
                    fontSize={{ base: "16px", md: "15px", xl: "24px" }}
                    pt={{
                        base: "13px",
                        sm: "20px",
                        md: "20px",
                        lg: "29px",
                    }}
                    fontWeight="600"
                    flexShrink={0}
                    noOfLines={3}
                >
                    {name && name}
                </Text>
            </Box>

            {/* New Box */}

            <Flex
                w="100%"
                flexDir={{ base: "column", md: "row", xl: "" }}
                gap={{ base: "18px", md: "20px", xl: "" }}
                // align="center"
                justify="space-between"
            >
                {/* Price Section  */}
                <Flex
                    w="100%"
                    flexDir={{ base: "row", md: "column", xl: "" }}
                    gap={{ base: "13px", md: "20px", lg: "29px" }}
                    justify="space-between"
                    order={{ base: "2", md: "1", xl: "" }}
                >
                    <Text
                        fontSize={{ base: "15px", md: "10px", xl: "17px" }}
                        fontWeight="600"
                    >
                        Price
                    </Text>
                    <Text
                        fontSize={{ base: "16px", md: "14px", xl: "24px" }}
                        fontWeight={600}
                    >
                        ₦ {actual_price}
                    </Text>
                </Flex>
                {/* Quantity Section */}
                <Flex
                    order={{ base: "1", md: "2", xl: "" }}
                    w="100%"
                    flexDir={{ base: "row", md: "column", xl: "" }}
                    gap={{ base: "13px", md: "20px", lg: "29px" }}
                    justify="space-between"
                >
                    <Text
                        fontSize={{ base: "15px", md: "10px", xl: "17px" }}
                        fontWeight="600"
                    >
                        Quantity
                    </Text>
                    <Flex
                        align="center"
                        gap={{ base: "12px", md: "22px", xl: "" }}
                    >
                        <Text
                            as="button"
                            aria-label="minus from quantity"
                            boxSize={{
                                base: "30px",
                                md: "23px",
                                xl: "39px",
                            }}
                            bgColor="accent_8"
                            color="white"
                            rounded={"3px"}
                            minW="30px"
                            onClick={() => handleDecreaseQuantity(singleItem)}
                        >
                            {" "}
                            -{" "}
                        </Text>
                        <Flex
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
                            {quantity}
                        </Flex>
                        <Text
                            as="button"
                            aria-label="Add to quantity"
                            boxSize={{
                                base: "30px",
                                md: "23px",
                                xl: "39px",
                            }}
                            bgColor="accent_8"
                            color="white"
                            rounded={"3px"}
                            onClick={() => handleIncreaseQuantity(singleItem)}
                        >
                            {" "}
                            +{" "}
                        </Text>
                    </Flex>
                </Flex>

                {/* SubTotal */}
                <Flex
                    order="3"
                    w="100%"
                    flexDir={{ base: "row", md: "column", xl: "" }}
                    gap={{ base: "13px", md: "20px", lg: "29px" }}
                    justify="space-between"
                >
                    <Text
                        fontSize={{ base: "15px", md: "10px", xl: "17px" }}
                        fontWeight="600"
                    >
                        Subtotal
                    </Text>
                    <Text
                        fontSize={{ base: "16px", md: "14px", xl: "24px" }}
                        fontWeight={600}
                    >
                        ₦ {total}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default CartItemBoxDetails;
