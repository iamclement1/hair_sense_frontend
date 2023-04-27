import { useState } from "react";
import {
    Box,
    Button,
    Flex,
    Icon,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text,
    Stack,
    Collapse,
    Link,
    Slide,
} from "@chakra-ui/react";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { categories } from "@/utils/NavbarData";
import NextLink from "next/link";

export default function MobileNav({ isOpen, onOpen, onClose }) {
    const [selected, setSelected] = useState(0);

    const links = [
        { text: "Home", href: "/" },
        { text: "About", href: "/about" },
        { text: "Contact", href: "/contact" },
    ];
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <Drawer
            isOpen={isOpen}
            placement="left"
            size={["xs", "sm"]}
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent px="32px">
                <Slide direction="left" in={isOpen}>
                    <DrawerHeader>
                        <Flex
                            mt="24px"
                            mb="24px"
                            justify={"space-between"}
                            align="center"
                        >
                            <Text fontSize={"28px"} fontWeight={"600"}>
                                Menu
                            </Text>
                            <DrawerCloseButton
                                pos={"relative"}
                                top="0px"
                                right={0}
                            />
                        </Flex>
                    </DrawerHeader>

                    <DrawerBody>
                        {/* <Input placeholder="Type here..." /> */}

                        {categories.map((item, i) => {
                            return (
                                <NavItem
                                    key={i}
                                    navData={item}
                                    isOpen={isOpen}
                                    onOpen={onOpen}
                                    onClose={onClose}
                                />
                            );
                        })}
                    </DrawerBody>
                </Slide>
            </DrawerContent>
        </Drawer>
    );
}

const NavItem = ({ navData, onOpen, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box mb="16px">
            <Flex
                align={"center"}
                gap="10px"
                onClick={toggleAccordion}
                pb="16px"
                cursor={"pointer"}
                justify={"space-between"}
            >
                <Text fontSize="20px"> {navData.text} </Text>{" "}
                <Icon as={FaChevronDown} boxSize={"16px"} />
            </Flex>

            <Collapse in={isOpen}>
                <Box>
                    {navData &&
                        navData.children.map((item, i) => {
                            const lowNav = item.toLowerCase();

                            return (
                                <Link
                                    href={`/categories/${lowNav}`}
                                    key={i}
                                    mb="16px"
                                    cursor={"pointer"}
                                    display={"block"}
                                    onClick={onClose}
                                    as={NextLink}
                                >
                                    <p>{item}</p>
                                </Link>
                            );
                        })}
                </Box>
            </Collapse>
        </Box>
    );
};
