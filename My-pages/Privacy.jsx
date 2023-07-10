import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";

const Privacy = () => {
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
                        Privacy
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
                            1.Regarding This Notice
                        </Text>
                        <Text
                            fontSize={["0.87rem", null, "1rem"]}
                            mt="1.3rem"
                            lineHeight={"1.95313rem"}
                        >
                            When you use our website, Hairsense Retail may
                            collect and use information about you that is
                            personal to you. It outlines our practices for using
                            and protecting your personal information, as well as
                            your rights with regard to that information.
                        </Text>
                    </Box>

                    <Box mt="1.8rem">
                        <Text
                            fontSize={["0.87rem", null, "1rem"]}
                            fontWeight={"600"}
                        >
                            2. Our Identity
                        </Text>
                        <Box
                            fontSize={["0.87rem", null, "1rem"]}
                            mt="1.3rem"
                            lineHeight={"1.95313rem"}
                        >
                            <Text>
                                Our platform is made up of our marketplace, our
                                logistics service, which enables the shipment
                                and delivery of packages from Us to our buyers,
                                and our payment service, which makes it possible
                                for participants on our platform to transact
                                with us conveniently.
                            </Text>
                        </Box>
                    </Box>

                    <Box mt="1.8rem">
                        <Text
                            fontSize={["0.87rem", null, "1rem"]}
                            fontWeight={"600"}
                        >
                            3. The Information We Gather About You?
                        </Text>
                        <Box
                            fontSize={["0.87rem", null, "1rem"]}
                            mt="1.3rem"
                            lineHeight={"1.95313rem"}
                        >
                            <Text>
                                Any information that may be used to directly or
                                indirectly identify a specific person is
                                considered personal data. Your personal
                                information is collected so that we can give you
                                customized goods and services, as well as to
                                analyze and improve them over time. Different
                                types of personal data may be gathered, used,
                                stored, and transferred by us for marketing and
                                personal data optimization reasons. Hairsense
                                Retail further makes targeted offers for
                                particular goods and services to our customers
                                using Google Digital Marketing
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Privacy;
