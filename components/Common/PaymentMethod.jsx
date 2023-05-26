import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import AddressDetailsPreview from "./AddressDetailsPreview";
import DeliveryDetailsPreview from "./DeliveryDetailsPreview";
import { PrimaryButton } from ".";
import { useRouter } from "next/router";

const PaymentMethod = ({ handleCheckOutStep }) => {
    const router = useRouter();
    return (
        <Box>
            <AddressDetailsPreview handleCheckOutStep={handleCheckOutStep} />

            <Box>
                <DeliveryDetailsPreview
                    handleCheckOutStep={handleCheckOutStep}
                />
            </Box>

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
                            fontSize={{ base: "18px", md: "15px", xl: "" }}
                            fontWeight="600"
                        >
                            Order Summary
                        </Text>
                    </Flex>
                    <Divider mt="8px" />
                    {/* *********** */}

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
                                ₦ 4,000
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
                            text="Make Payment"
                            w="100%"
                            handleButton={() => router.push("/order_details")}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PaymentMethod;
