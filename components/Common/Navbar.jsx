import { useState } from "react";
import {
    Flex,
    Box,
    Image,
    Link,
    Icon,
    Text,
    useDisclosure,
} from "@chakra-ui/react";

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
import { NavDropDown } from ".";
import MobileNav from "./MobileNav";

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box bgColor="secondary_1">
            <ScreenSize>
                <Flex
                    align="center"
                    justify="space-between"
                    py="40px"
                    gap="20px"
                    flexWrap={["wrap", null, "nowrap"]}
                >
                    {/* The logo section */}

                    <Box display="flex" alignItems="center" flexShrink={"0"}>
                        <Link as={NextLink} href="/">
                            <Image
                                src="/images/logo.svg"
                                alt="Logo"
                                height="100%"
                                width={["120px", "150px", "150px", "200px"]}
                                mr={2}
                            />
                        </Link>
                    </Box>

                    {/*Search Input Section */}
                    <Box
                        w={["100%", null, "100%"]}
                        order={[3, 3, 2]}
                        // flexShrink={1}
                    >
                        <SearchInput />
                    </Box>
                    {/* Account and other menu section */}
                    <Box
                        order={3}
                        justifyContent={"flex-end"}
                        display={["none", "none", "none", "flex"]}
                        flexShrink={0}
                    >
                        <Flex gap="20px">
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
                    {/* Humbuger for Mobile Nav */}
                    <Box
                        // w={"50%"}
                        order={[2, 2, 3]}
                        display={["block", null, "null", "none"]}
                        onClick={onOpen}
                        cursor={"pointer"}
                    >
                        <Icon as={FaBars} boxSize={"25px"} />
                    </Box>
                </Flex>
                {/* Destop NaV */}
                <Box>
                    <NavDropDown />
                </Box>
                {/* Moble Nav */}
                <Box>
                    <MobileNav
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                    />
                </Box>
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
