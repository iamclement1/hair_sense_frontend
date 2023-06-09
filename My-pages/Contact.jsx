import React from "react";
import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import ContactForm from "@/components/Common/ContactForm";

const Contact = () => {
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
                        Help and contact
                    </Text>
                    <Icon as={FaTimes} />
                </Flex>
                <Divider mt="10px" />
            </Box>
            <Box>
                <Box w="100%">
                    <Flex w="100%">
                        <ContactForm />
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default Contact;
