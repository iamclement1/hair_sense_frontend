import React from "react";
import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";

const DeliveryInfo = () => {
    return (
        <Box>
            <Box
                mt={["59px", null, null, "60px"]}
                mb={["40px", null, null, "59px"]}
            >
                <Flex align="center" justify="space-between" w="100%">
                    <Text
                        fontSize={{ base: "16px", md: "20px", xl: "30px" }}
                        fontWeight="600"
                        color="accent_2"
                    >
                        Delivery informations
                    </Text>
                    <Icon as={FaTimes} />
                </Flex>
                <Divider mt="10px" />
            </Box>
            <Box>
                <Box mt="30px">
                    <Text
                        fontSize={{ base: "16px", md: "21px", xl: "24px" }}
                        fontWeight="600"
                    >
                        Timelines For Processing Orders
                    </Text>
                    <Box>
                        <Box
                            fontSize={{ base: "14px", md: "15px", xl: "16px" }}
                            mt="18px"
                        >
                            <Text mt="16px">
                                Orders processed and sent to our courier
                                partners within one working day if paid for and
                                placed by 2pm, Monday through Friday (excluding
                                public holidays).
                            </Text>
                            <Text mt="16px">
                                From Monday through Friday, our courier partners
                                often pick up orders paid for with a debit or
                                credit card the same day.
                            </Text>
                            <Text mt="16px">
                                When a bank deposit is made, orders are picked
                                up by our courier partners the following
                                business day.
                            </Text>
                        </Box>
                    </Box>
                </Box>

                <Box mt="30px">
                    <Text
                        fontSize={{ base: "16px", md: "21px", xl: "24px" }}
                        fontWeight="600"
                    >
                        Delivery Times
                    </Text>
                    <Box>
                        <Box
                            fontSize={{ base: "14px", md: "15px", xl: "16px" }}
                            mt="18px"
                        >
                            <Text mt="16px">
                                All orders are handled in one to two business
                                days. The processing time is added to the
                                shipping time to get the anticipated delivery
                                time.
                            </Text>
                            <Text mt="16px">
                                We offer national shipping. At checkout, the
                                shipping cost is calculated. The price may
                                change based on the weight of the cargo and the
                                location.
                            </Text>
                        </Box>
                    </Box>
                </Box>

                <Box mt="30px">
                    <Text
                        fontSize={{ base: "16px", md: "21px", xl: "24px" }}
                        fontWeight="600"
                    >
                        Pick Up In Store Is Free
                    </Text>
                    <Box>
                        <Box
                            fontSize={{ base: "14px", md: "15px", xl: "16px" }}
                            mt="18px"
                        >
                            <Text mt="16px">
                                In any of our stores in Ilorin, Lagos, Abuja and
                                Osun, we are happy to provide free in-store
                                pickup.
                            </Text>
                        </Box>
                    </Box>
                </Box>

                <Box mt="30px">
                    <Text
                        fontSize={{ base: "16px", md: "21px", xl: "24px" }}
                        fontWeight="600"
                    >
                        Failed Deliveries
                    </Text>
                    <Box>
                        <Box
                            fontSize={{ base: "14px", md: "15px", xl: "16px" }}
                            mt="18px"
                        >
                            <Text mt="16px">
                                Prior to attempting a delivery, our courier
                                partners will typically contact you. However,
                                the shipment will be returned to our office if
                                they are unable to deliver it or reach the
                                customer by phone to arrange a second delivery.
                                Call us to set up collection at your earliest
                                convenience.
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DeliveryInfo;
