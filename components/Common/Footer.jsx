import { Box, Flex, Icon, Link, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { BiPhone } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import NextLink from "next/link";
import {
    FaFacebookSquare,
    FaInstagram,
    FaLinkedin,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";
import { ScreenSize } from "../layouts";

const Footer = () => {
    return (
        <Box py={["40px", null, "95px"]} bgColor={"accent_1"} mt="40px">
            <ScreenSize>
                <SimpleGrid columns={[1, 2, 2, 4]} spacingY={"20px"}>
                    {/* General Information section */}
                    <Box>
                        <Text
                            fontSize={["20px", null, "28px"]}
                            fontWeight={600}
                            mb={["16px", null, "20px", null, "24px"]}
                        >
                            General Information
                        </Text>
                        <Box>
                            {generalInformation.map(({ url, text }, i) => {
                                return (
                                    <Link
                                        as={NextLink}
                                        key={i}
                                        display={"block"}
                                        href={url}
                                        mb="8px"
                                        fontSize={[
                                            "16px",
                                            null,
                                            "16px",
                                            null,
                                            "20px",
                                        ]}
                                    >
                                        {text}
                                    </Link>
                                );
                            })}
                        </Box>
                    </Box>
                    <Box>
                        <Text
                            fontSize={["20px", null, "28px"]}
                            fontWeight={600}
                            mb={["16px", null, "24px"]}
                        >
                            Services
                        </Text>
                        <Box>
                            {services.map(({ url, text }, i) => {
                                return (
                                    <Link
                                        as={NextLink}
                                        key={i}
                                        display={"block"}
                                        href={url}
                                        mb="8px"
                                        fontSize={[
                                            "16px",
                                            null,
                                            "16px",
                                            null,
                                            "20px",
                                        ]}
                                    >
                                        {text}
                                    </Link>
                                );
                            })}
                        </Box>
                    </Box>
                    <Box>
                        <Text
                            fontSize={["20px", null, null, "24px", "28px"]}
                            fontWeight={600}
                            mb={["16px", null, "20px", null, "24px"]}
                        >
                            Why Patronize Us{" "}
                        </Text>
                        <Box>
                            {whyPatronizeUs.map(({ url, text }, i) => {
                                return (
                                    <Link
                                        as={NextLink}
                                        key={i}
                                        display={"block"}
                                        href={url}
                                        mb="8px"
                                        fontSize={[
                                            "16px",
                                            null,
                                            "16px",
                                            null,
                                            "20px",
                                        ]}
                                    >
                                        {text}
                                    </Link>
                                );
                            })}
                        </Box>
                    </Box>

                    <Box>
                        <Text
                            fontSize={["20px", null, null, "24px", "28px"]}
                            fontWeight={600}
                            mb={["16px", null, "20px", null, "24px"]}
                        >
                            Contact Us
                        </Text>
                        <Box>
                            {contactUs.map(({ text, url, icon }, i) => {
                                return (
                                    <Link
                                        as={NextLink}
                                        key={i}
                                        display={"block"}
                                        href={url}
                                        mb="8px"
                                        fontSize={[
                                            "16px",
                                            null,
                                            "16px",
                                            null,
                                            "20px",
                                        ]}
                                    >
                                        <Flex align="center" gap="10px">
                                            <Icon as={icon} />
                                            <Text
                                                fontSize={[
                                                    "16px",
                                                    null,
                                                    "16px",
                                                    null,
                                                    "20px",
                                                ]}
                                            >
                                                {text}
                                            </Text>
                                        </Flex>
                                    </Link>
                                );
                            })}

                            {/* Socials Section */}

                            <Flex mt="19px" align={"center"} gap={"18px"}>
                                {socials.map(({ icon, url }, i) => {
                                    return (
                                        <Link
                                            as={NextLink}
                                            key={i}
                                            display={"block"}
                                            href={url}
                                            mb="8px"
                                            fontSize={[
                                                "16px",
                                                null,
                                                "16px",
                                                null,
                                                "20px",
                                            ]}
                                        >
                                            <Icon
                                                as={icon}
                                                boxSize={"30px"}
                                                color="shades_7"
                                            />
                                        </Link>
                                    );
                                })}
                            </Flex>
                        </Box>
                    </Box>
                </SimpleGrid>
            </ScreenSize>
        </Box>
    );
};

export default Footer;

const generalInformation = [
    {
        text: "Terms and Conditions",
        url: "/",
    },
    {
        text: "Shipping and payments",
        url: "/",
    },
    {
        text: "Delivery Information",
        url: "/",
    },
    {
        text: "Privacy",
        url: "/",
    },
];

const services = [
    {
        text: "Help and Contact",
        url: "/",
    },
    {
        text: "FAQ’S",
        url: "/",
    },
    {
        text: "Returns",
        url: "/",
    },
    {
        text: "Beauty Guide",
        url: "/",
    },
];

const whyPatronizeUs = [
    {
        text: "Secure Shopping",
        url: "/",
    },
    {
        text: "Shipping and Returns",
        url: "/",
    },
    {
        text: "Best Deals",
        url: "/",
    },
];
const contactUs = [
    { text: "Palms Mall, Ilorin", url: "#", icon: IoLocationOutline },
    { text: "+2347033445566", url: "tel:+2347033445566", icon: BiPhone },
    {
        text: "Example@yahoo.com",
        url: "mailto:Example@yahoo.com",
        icon: FiMail,
    },
];

const socials = [
    {
        url: "/",
        icon: FaLinkedin,
    },
    {
        url: "/",
        icon: FaTwitter,
    },
    {
        url: "/",
        icon: FaInstagram,
    },
    {
        url: "/",
        icon: FaFacebookSquare,
    },
    {
        url: "/",
        icon: FaYoutube,
    },
];
