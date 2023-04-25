import { useState } from "react";
import { Flex, Box, Image, Link, Icon, Text } from "@chakra-ui/react";

import ScreenSize from "../layouts/ScreenSize";
import NextLink from "next/link";
import SearchInput from "./SearchInput";
import {
    FaBars,
    FaHeart,
    FaShoppingCart,
    FaTimes,
    FaUser,
} from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box bgColor="secondary_1">
            <ScreenSize>
                <Flex
                    align="center"
                    justify="space-between"
                    py="40px"
                    gap="20px"
                >
                    {/* The logo section */}

                    <Box display="flex" alignItems="center" flexShrink={"0"}>
                        <Link as={NextLink} href="/">
                            <Image
                                src="/images/logo.svg"
                                alt="Logo"
                                height="100%"
                                width={["100px", "100px", "150px", "200px"]}
                                mr={2}
                            />
                        </Link>
                    </Box>

                    {/*Search Input Section */}
                    <Box w="100%" maxW={["100%", "360px", null, "460px"]}>
                        <SearchInput />
                    </Box>
                    {/* Account and other menu section */}
                    <Box
                        // w="100px"
                        // display={{
                        //     base: isOpen ? "block" : "none",
                        //     md: "flex",
                        // }}
                        display={["none", "none", null, "flex"]}
                        // mt={{ base: 4, md: 0 }}
                        // w="100%"
                    >
                        <Flex gap="20px" flexShrink={0}>
                            {menuItems.map(({ url, text, icon }, i) => {
                                return (
                                    <Link
                                        key={i}
                                        as={NextLink}
                                        href={url}
                                        textAlign={"center"}
                                    >
                                        <Icon as={icon} color="accent_2" />
                                        <Text color="shades_6">{text} </Text>
                                    </Link>
                                );
                            })}
                        </Flex>
                    </Box>
                    {/* Humbuger for mobile screen */}
                    <Box
                        display={["block", null, null, "none"]}
                        onClick={toggleMenu}
                        cursor={"pointer"}
                    >
                        <Icon as={isOpen ? FaTimes : FaBars} boxSize={"20px"} />
                    </Box>
                </Flex>
            </ScreenSize>
        </Box>
    );
};

export default Navbar;

const menuItems = [
    {
        url: "/",
        text: "My Account",
        icon: FaUser,
    },
    {
        url: "/",
        text: "Favorite product",
        icon: FaHeart,
    },
    {
        url: "/",
        text: "My Cart",
        icon: FaShoppingCart,
    },
];
