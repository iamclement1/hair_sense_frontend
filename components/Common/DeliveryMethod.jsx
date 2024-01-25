import React, { useContext, useState } from "react";
import { PrimaryButton } from "@/components/Common";
import {
    Box,
    Flex,
    Divider,
    Text,
    RadioGroup,
    Radio,
} from "@chakra-ui/react";
import AddressDetailsPreview from "./AddressDetailsPreview";
import { useRouter } from "next/router";
import { StateContext } from "@/context/StateProvider";

const DeliveryMethod = ({ handleCheckOutStep }) => {
    const { addressDetails, setDeliveryMethod, deliveryMethod } =
        useContext(StateContext);

    const cartItems = JSON.parse(sessionStorage.getItem("cart"));

    if (!addressDetails) {
        handleCheckOutStep(1);
    }
    // Get length of cartItems
    const cartItemLength = cartItems?.length;

    // delivery fee
    let deliverFee = deliveryMethod === "pickup" ? 0.0 : 1200;
    //Get subtotal price
    let subTotal = 0;
    const semiSubTotal = cartItems?.map((item) => {
        return item.quantity * item.sales_price;
    });

    // Adding all the prices together using a for-of loop
    for (const price of semiSubTotal) {
        subTotal += price;
    }

    let totalBill = subTotal + deliverFee;

    return (
        <Box>
            <AddressDetailsPreview
                handleCheckOutStep={handleCheckOutStep}
                addressDetails={addressDetails}
            />
            {/* Delivery Method start  */}
            <Box>
                <Box
                    mt="52px"
                    w="100%"
                    border="1px"
                    borderColor="dark_4"
                    rounded="6px"
                    p="20px"
                    pb="40px"
                >
                    <Flex align="center" justify={"space-between"}>
                        {" "}
                        <Text
                            fontSize={{
                                base: "18px",
                                md: "15px",
                                xl: "",
                            }}
                            fontWeight="600"
                        >
                            2. Delivery Method
                        </Text>
                    </Flex>
                    <Divider mt="8px" />
                    {/* Selct delaivery Method section */}

                    <Box mt={["16px", "23px"]}>
                        <RadioGroup
                            onChange={setDeliveryMethod}
                            value={deliveryMethod}
                        >
                            <Flex
                                align="center"
                                flexDir={["column", "row"]}
                                justify={"space-between"}
                                gap="24px"
                            >
                                {/* Door delivery */}
                                <Flex gap="15px">
                                    <Box>
                                        <Radio
                                            value="cod"
                                            size="lg"
                                        />
                                    </Box>
                                    <Box
                                        maxW={["100%", "260px"]}
                                        fontSize={"14px"}
                                    >
                                        <Text fontWeight={600}>
                                            Door delivery
                                        </Text>

                                        <Text mt="12px">
                                            Delivery is NGN 1,200
                                        </Text>

                                        <Text>
                                            Items is ready and will be delivered
                                            in 24 - 48 hours if purchase is made
                                            now
                                        </Text>
                                    </Box>
                                </Flex>

                                <Flex gap="15px">
                                    {/* Pick Up  */}
                                    <Box>
                                        <Radio value="pickup" size="lg" />
                                    </Box>
                                    <Box
                                        maxW={["100%", "260px"]}
                                        fontSize={"14px"}
                                    >
                                        <Text fontWeight={600}>
                                            Pick up at the store
                                        </Text>
                                        <Text mt="12px">
                                            Delivery is NGN 0.00
                                        </Text>
                                        <Text>
                                            Items is ready and will be delivered
                                            in 24 - 48 hours if purchase is made
                                            now
                                        </Text>
                                    </Box>
                                </Flex>
                            </Flex>
                        </RadioGroup>
                    </Box>

                    {/* Delivery Details start */}
                    <Box>
                        <Flex
                            align="center"
                            justify={"space-between"}
                            mt={["32px", "54px"]}
                        >
                            {" "}
                            <Text
                                fontSize={{
                                    base: "18px",
                                    md: "15px",
                                    xl: "",
                                }}
                                fontWeight="600"
                            >
                                Delivery Details
                            </Text>
                        </Flex>
                        <Divider mt="8px" />

                        <Box fontSize={"14px"}>
                            <Text mt="20px">
                                Shipment {cartItemLength} of {cartItemLength}
                            </Text>
                            {/* Nmae of things to buy  */}
                            {cartItems &&
                                cartItems.map((item, i) => {
                                    return (
                                        <Text mt="12px" key={i}>
                                            {item && item.name}
                                        </Text>
                                    );
                                })}
                            <Text mt="12px">
                                Delivery between 24 hours of purchase.
                            </Text>
                        </Box>
                    </Box>
                    <Divider my="27px" />
                    {/* Price Section  */}

                    <Box>
                        <Flex align={"center"} justify={"space-between"}>
                            <Text fontSize={["16px", "15px"]}>Subtotal</Text>
                            <Text fontSize={["16px", "21px"]} fontWeight={600}>
                                ₦ {subTotal}
                            </Text>
                        </Flex>

                        <Flex
                            mt="15px"
                            align={"center"}
                            justify={"space-between"}
                            fontWeight={"400"}
                        >
                            <Text fontSize={["16px", "15px"]}>
                                Delivery fee
                            </Text>
                            <Text fontSize={["16px", "21px"]} fontWeight={600}>
                                ₦ {deliverFee}
                            </Text>
                        </Flex>
                    </Box>

                    <Divider my="17px" />
                    <Flex
                        align={"center"}
                        justify={"space-between"}
                        fontWeight={600}
                    >
                        <Text fontSize={["16px", "15px"]}>Total</Text>
                        <Text fontSize={["16px", "21px"]}>₦ {totalBill}</Text>
                    </Flex>

                    {/* Button Section  */}

                    <Box mt="30px">
                        <PrimaryButton
                            text="Proceed to Payment"
                            w="100%"
                            handleButton={() => handleCheckOutStep(3)}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DeliveryMethod;
