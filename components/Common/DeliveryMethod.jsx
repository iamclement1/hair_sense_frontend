import React, { useState } from "react";
import { PrimaryButton } from "@/components/Common";
import {
    Box,
    Flex,
    Button,
    Divider,
    Icon,
    Text,
    Image,
    Textarea,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Select,
    RadioGroup,
    Radio,
} from "@chakra-ui/react";
import AddressDetailsPreview from "./AddressDetailsPreview";

const DeliveryMethod = ({ handleCheckOutStep }) => {
    const [value, setValue] = useState("door_delivery");
    return (
        <Box>
            <AddressDetailsPreview handleCheckOutStep={handleCheckOutStep} />
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
                        <RadioGroup onChange={setValue} value={value}>
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
                                            value="door_delivery"
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
                                        <Radio value="pick_up" size="lg" />
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
                            <Text mt="20px">Shipment 1 of 1</Text>
                            <Text mt="12px">
                                1 x Hyggee Vegan Sun Cream - 50ml
                            </Text>
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
                                ₦ 4,000
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
                                ₦ 0.00
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
                        <Text fontSize={["16px", "21px"]}>₦ 4,000</Text>
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
