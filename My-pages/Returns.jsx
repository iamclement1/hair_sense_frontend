import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";

const Returns = () => {
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
                        Returns
                    </Text>
                    <Icon as={FaTimes} />
                </Flex>
                <Divider mt="10px" />
            </Box>
            <Box>
                <Box mt="30px">
                    <Box>
                        <Box
                            fontSize={{ base: "14px", md: "15px", xl: "15px" }}
                            mt="18px"
                        >
                            <Text mt="16px">
                                Except for items that are damaged upon delivery,
                                we do not provide refunds or accept returns.
                                When your package is delivered, we strongly
                                advise you to carefully check it to make sure
                                all of the contents are there. Please DO NOT
                                accept the item(s) if they are damaged in the
                                unlikely event that they arrive, and get in
                                touch with us via email or one of our social
                                media channels within 24 hours.
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Returns;
