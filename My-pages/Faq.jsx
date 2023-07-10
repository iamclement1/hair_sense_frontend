import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";

const Faq = () => {
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
                        Frequently asked questions
                    </Text>
                    <Icon as={FaTimes} />
                </Flex>
                <Divider mt="10px" />
            </Box>
            <Box>
                <Box mt="30px">
                    <Box>
                        <Text
                            fontSize={["0.87rem", null, "1rem"]}
                            fontWeight={"600"}
                        >
                            Change Address ?
                        </Text>
                        <Text
                            fontSize={["0.87rem", null, "1rem"]}
                            mt="1.3rem"
                            lineHeight={"1.95313rem"}
                        >
                            Did you give the wrong address? We can change your
                            billing and / or delivery address if your order has
                            not been sent already. Due to the further processing
                            of the payment by Paystack, we can unfortunately no
                            longer change your address. For all other payment
                            methods, we can still change your address as long as
                            the order has not yet been sent - please contact our
                            customer service.
                        </Text>
                    </Box>

                    <Box mt="1.8rem">
                        <Text
                            fontSize={["0.87rem", null, "1rem"]}
                            fontWeight={"600"}
                        >
                            Already sent item?
                        </Text>
                        <Box
                            fontSize={["0.87rem", null, "1rem"]}
                            mt="1.3rem"
                            lineHeight={"1.95313rem"}
                        >
                            <Text>
                                If we are already preparing your order for
                                dispatch or the goods have already been
                                dispatched, changes are unfortunately no longer
                                possible. The address can only be changed until
                                it is prepared for dispatch in the warehouse.
                            </Text>
                            <Text>
                                If your address has changed and the package
                                cannot be delivered, it will be sent back to us.
                                This process can take up to 10 working days to
                                complete. We will then process the return within
                                a week and reimburse you the purchase amount -
                                just like a normal return.
                            </Text>
                            <Text>
                                If you still want your order, please place a new
                                order. For technical reasons, it is
                                unfortunately not possible to send it again.
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Faq;
