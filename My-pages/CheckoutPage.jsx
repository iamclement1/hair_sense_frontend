import { PrimaryButton } from "@/components/Common";
import AddressDetails from "@/components/Common/AddressDetails";
import CustomInput from "@/components/Common/CustomInput";
import DeliveryMethod from "@/components/Common/DeliveryMethod";
import PaymentMethod from "@/components/Common/PaymentMethod";
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
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const CheckoutPage = () => {
    const [checkOutStep, setCheckOutStep] = useState(1);
    const router = useRouter();
    const handleCheckOutStep = (value) => {
        setCheckOutStep(value);
    };
    return (
        <Flex
            minH="100vh"
            // align="center"
            justify="center"
            w="100%"
            py="60px"
            px={["16px", "24px"]}
            bgColor={"secondary_1"}
        >
            <Box w="100%" maxW="730px">
                {/* title section  */}

                <Flex align="center" justify="space-between" w="100%">
                    <Text
                        fontSize={{ base: "13px", md: "20px", xl: "30px" }}
                        fontWeight="600"
                    >
                        Checkout
                    </Text>
                    <Icon
                        as={FaTimes}
                        onClick={() => router.back()}
                        cursor={"pointer"}
                    />
                </Flex>
                <Divider mt="8px" />
                {/* Address Details page */}
                <Box>
                    {checkOutStep === 1 ? (
                        <AddressDetails
                            handleCheckOutStep={handleCheckOutStep}
                        />
                    ) : checkOutStep === 2 ? (
                        <DeliveryMethod
                            handleCheckOutStep={handleCheckOutStep}
                        />
                    ) : checkOutStep === 3 ? (
                        <PaymentMethod
                            handleCheckOutStep={handleCheckOutStep}
                        />
                    ) : (
                        ""
                    )}
                </Box>
            </Box>
        </Flex>
    );
};

export default CheckoutPage;
