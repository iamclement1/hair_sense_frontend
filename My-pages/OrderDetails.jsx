import { PrimaryButton, ProductSlider } from "@/components/Common";
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
import { useRouter } from "next/router";
import React from "react";
import { FaTimes } from "react-icons/fa";

const OrderDetails = () => {
    const router = useRouter();
    return (
        <Box pt={["40px", null, "40px"]}>
            <Flex align="center" justify="space-between" w="100%">
                <Text
                    fontSize={{ base: "13px", md: "20px", xl: "30px" }}
                    fontWeight="600"
                >
                    Order Details
                </Text>
                <Icon
                    as={FaTimes}
                    onClick={() => router.back()}
                    cursor={"pointer"}
                />
            </Flex>
            <Divider mt="8px" />

            <Box mt={["40px", "50px", "60px"]}>
                <Flex
                    boxShadow={"0px 0px 12px 4px rgba(0, 0, 0, 0.06)"}
                    py={["17px", "33px"]}
                    px={["13px", "34px"]}
                    justify="space-between"
                    gap="20px"
                >
                    <Text
                        fontSize={{ base: "13px", md: "18px" }}
                        fontWeight="600"
                    >
                        Thank you for placing an order
                    </Text>
                    <PrimaryButton
                        maxW="186px"
                        text="View order details"
                        fontSize="100px"
                    />
                </Flex>

                <Flex
                    boxShadow={"0px 0px 12px 4px rgba(0, 0, 0, 0.06)"}
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

export default OrderDetails;
