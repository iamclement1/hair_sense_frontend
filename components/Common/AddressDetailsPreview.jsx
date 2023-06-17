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
import { FaTimes } from "react-icons/fa";

const AddressDetailsPreview = ({ handleCheckOutStep, addressDetails }) => {
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
                    1. Address Details
                </Text>
                <Text
                    as="button"
                    fontSize={"12px"}
                    // fontWeight={"600"}
                    color="accent_9"
                    onClick={() => handleCheckOutStep(1)}
                >
                    {" "}
                    Change{" "}
                </Text>
            </Flex>
            <Divider mt="8px" />
            <Box
                mt={["16px", "27px"]}
                fontSize={{ base: "14px", md: "15px", xl: "" }}
                fontWeight="600"
                color="accent_9"
            >
                <Text>
                    {`${addressDetails && addressDetails.first_name} ${
                        addressDetails && addressDetails.last_name
                    }`}{" "}
                </Text>
                <Text mt="10px">
                    {" "}
                    {addressDetails && addressDetails.delivery_address_1}{" "}
                </Text>
                <Text mt="10px">
                    {" "}
                    {addressDetails && addressDetails.phone_number}{" "}
                </Text>
            </Box>
        </Box>
    );
};

export default AddressDetailsPreview;
