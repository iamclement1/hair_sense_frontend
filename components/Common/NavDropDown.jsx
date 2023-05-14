import {
    Box,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Link,
    SimpleGrid,
    Text,
    Button,
    Icon,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { categories } from "@/utils/NavbarData";

const NavDropDown = () => {
    return (
        <Box>
            <DesktopMenu />
        </Box>
    );
};

export default NavDropDown;

const DesktopMenu = () => {
    return (
        <Flex
            align={"center"}
            justify={"space-between"}
            pb="20px"
            display={["none", null, null, "flex"]}
        >
            {categories.map((item, i) => {
                return (
                    <Box key={i}>
                        <Menu placement="bottom-end">
                            <MenuButton color={"accent_1"}>
                                <Flex align={"center"} gap="10px">
                                    <Text color={"accent_2"}>{item.text} </Text>
                                    <Icon
                                        as={FaChevronDown}
                                        boxSize={"12px"}
                                        color={"accent_2"}
                                    />
                                </Flex>
                            </MenuButton>
                            <MenuList
                                width={{ base: "100%", md: "800px" }}
                                borderRadius={"none"}
                                zIndex={100}
                            >
                                <Box px="20px" py="20px">
                                    <Text
                                        fontWeight={"600"}
                                        fontSize={"20px"}
                                        mb="10px"
                                    >
                                        {item.category}
                                    </Text>
                                    <SimpleGrid spacingX={"12px"}>
                                        {item &&
                                            item.children.map((subItem, i) => {
                                                const lowNav =
                                                    subItem.toLowerCase();
                                                return (
                                                    <Box
                                                        key={i}
                                                        as={MenuItem}
                                                        _hover={{
                                                            bgColor:
                                                                "transparent",
                                                        }}
                                                        _focus={{
                                                            bgColor:
                                                                "transparent",
                                                        }}
                                                        _active={{
                                                            bgColor:
                                                                "transparent",
                                                        }}
                                                    >
                                                        <Link
                                                            h="100%"
                                                            w="100%"
                                                            display={"block"}
                                                            as={NextLink}
                                                            href={`/categories/${item.id}`}
                                                            color={"accent_2"}
                                                        >
                                                            {subItem}
                                                        </Link>
                                                    </Box>
                                                );
                                            })}
                                    </SimpleGrid>
                                </Box>
                            </MenuList>
                        </Menu>
                    </Box>
                );
            })}
        </Flex>
    );
};

// const mobileNav = () =>{
//     return(

//     )
// }
