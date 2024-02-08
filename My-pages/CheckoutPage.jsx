import AddressDetails from "@/components/Common/AddressDetails";
import DeliveryMethod from "@/components/Common/DeliveryMethod";
import PaymentMethod from "@/components/Common/PaymentMethod";
import {
    Box,
    Flex,
    Divider,
    Icon,
    Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const CheckoutPage = () => {
    const [checkOutStep, setCheckOutStep] = useState(1);
    const router = useRouter();
    const handleCheckOutStep = (value) => {
        setCheckOutStep(value);
    };

    let stepComponent;


    useEffect(() => {
        // Get the existing cart data from sessionStorage
        const existingCartData = JSON.parse(sessionStorage.getItem("cart"));

        if (!existingCartData || existingCartData?.lenght < 1) {
            toast.error("Cart is empty, You can't be here!!!");
            router.push("/");
        }
    }, []);


    switch (checkOutStep) {
        case 1:
            stepComponent = <AddressDetails handleCheckOutStep={handleCheckOutStep} />;
            break;
        case 2:
            stepComponent = <DeliveryMethod handleCheckOutStep={handleCheckOutStep} />;
            break;
        case 3:
            stepComponent = <PaymentMethod handleCheckOutStep={handleCheckOutStep} />;
            break;
        default:
            stepComponent = null;
    }

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
                    {stepComponent}
                </Box>
            </Box>
        </Flex>
    );
};

export default CheckoutPage;
