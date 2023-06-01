import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";

const Terms = () => {
    return (
        <Box>
            <Box
                mt={["59px", null, null, "59px"]}
                mb={["40px", null, null, "80px"]}
            >
                <Flex align="center" justify="space-between" w="100%">
                    <Text
                        fontSize={{ base: "16px", md: "20px", xl: "30px" }}
                        fontWeight="600"
                        color="accent_2"
                    >
                        Terms and conditions
                    </Text>
                    <Icon as={FaTimes} />
                </Flex>
                <Divider mt="10px" />
            </Box>
            <Box>
                <Box>
                    <Text
                        fontSize={{ base: "16px", md: "21px", xl: "24px" }}
                        fontWeight="600"
                    >
                        Information About You
                    </Text>

                    <Text
                        fontSize={{ base: "14px", md: "16px", xl: "16px" }}
                        mt="18px"
                    >
                        Your personal information will be used to complete your
                        order and improve your visit to the website. If any
                        information you provide on this website is incorrect, we
                        will not be held liable.
                    </Text>
                </Box>

                <Box mt={["24px", null, "30px"]}>
                    <Text
                        fontSize={{ base: "16px", md: "21px", xl: "24px" }}
                        fontWeight="600"
                    >
                        Modifications
                    </Text>

                    <Text
                        fontSize={{ base: "14px", md: "16px", xl: "16px" }}
                        mt="18px"
                    >
                        {`The Site's contents are subject to alteration,
                        modification, or removal at any time and without prior
                        notice for any reason. We are not obligated to update
                        any material on our website, though. Additionally, we
                        reserve the right to change or stop offering the Site
                        altogether at any time without prior notice. Any time
                        the Site is altered, its price is raised, it is
                        suspended, or it is discontinued, we won't be held
                        responsible to you or any other party.`}
                    </Text>
                </Box>

                <Box mt={["24px", null, "30px"]}>
                    <Text
                        fontSize={{ base: "16px", md: "21px", xl: "24px" }}
                        fontWeight="600"
                    >
                        Contact Form
                    </Text>

                    <Text
                        fontSize={{ base: "14px", md: "16px", xl: "16px" }}
                        mt="18px"
                    >
                        All data and details collected through contact forms are
                        used solely for correspondence.
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default Terms;
