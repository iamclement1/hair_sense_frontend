import { PrimaryButton } from "@/components/Common";
import AddressDetails from "@/components/Common/AddressDetails";
import CustomInput from "@/components/Common/CustomInput";

import PaymentMethod from "@/components/Common/PaymentMethod";
import { StateContext } from "@/context/StateProvider";
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
} from "@chakra-ui/react";
import { ErrorMessage, Field, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

const DeliveryDetailsPreview = ({ handleCheckOutStep }) => {
    const { deliveryMethod } = useContext(StateContext);
    return (
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
                    fontSize={{ base: "18px", md: "15px", xl: "" }}
                    fontWeight="600"
                >
                    2. Delivery Method
                </Text>
                <Text
                    as="button"
                    fontSize={"12px"}
                    // fontWeight={"600"}
                    color="accent_9"
                    onClick={() => handleCheckOutStep(2)}
                >
                    {" "}
                    Change{" "}
                </Text>
            </Flex>
            <Divider mt="8px" />
            <Box mt={["16px", "23px"]}>
                <Flex
                    align="center"
                    flexDir={["column", "row"]}
                    justify={"space-between"}
                    gap="24px"
                >
                    {/* Door delivery */}
                    <Flex gap="15px">
                        <Box>
                            <Icon
                                as={BsCheckCircleFill}
                                color="green"
                                size="lg"
                            />
                        </Box>
                        <Box maxW={["100%", "260px"]} fontSize={"14px"}>
                            <Text fontWeight={600}>
                                {" "}
                                {deliveryMethod === "pickup"
                                    ? "Pick Up"
                                    : "Door delivery"}
                            </Text>

                            <Text mt="12px">
                                Delivery is NGN{" "}
                                {deliveryMethod === "pickup"
                                    ? "0.00"
                                    : "1,200"}
                            </Text>

                            <Text>
                                Items is ready and will be delivered in 24 - 48
                                hours if purchase is made now
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

export default DeliveryDetailsPreview;
