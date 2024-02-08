import { PrimaryButton } from "@/components/Common";
import {
    Box,
    Flex,
    Text,
} from "@chakra-ui/react";
import React from "react";

const OrderDetailsPreview = ({ setShowFullDetails }) => {
    return (
        <Box>
            <Flex
                boxShadow={"0px 1px 6px 2px rgba(0, 0, 0, 0.06)"}
                py={["17px", "33px"]}
                px={["13px", "34px"]}
                justify="space-between"
                gap="20px"
            >
                <Text fontSize={{ base: "13px", md: "18px" }} fontWeight="600">
                    Thank you for placing an order
                </Text>
                <PrimaryButton
                    maxW="186px"
                    text="View order details"
                    handleButton={() => setShowFullDetails(true)}
                />
            </Flex>

            <Flex
                boxShadow={"0px 1px 6px 2px rgba(0, 0, 0, 0.06)"}
                py={["17px", "33px"]}
                px={["13px", "34px"]}
                justify="space-between"
                mt={["16px", "30px"]}
            >
                <Box>
                    <Text
                        fontSize={{ base: "14px", md: "18px" }}
                        fontWeight="600"
                    >
                        Door Delivery
                    </Text>

                    <Text
                        fontSize={{ base: "12px", md: "18px" }}
                        fontWeight="500"
                        mt="6px"
                    >
                        No 88 Brown street, Ilorin
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
};

export default OrderDetailsPreview;
