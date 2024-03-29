'use client'
import React, { useContext, useEffect, useState } from "react";
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    HStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    DrawerOverlay,
    Image,
} from "@chakra-ui/react";
import { MdOutlineDashboard } from "react-icons/md";
import Dashboard from "@/components/Admin/Dashboard";
import Categories from "@/components/Admin/Categories";
import Orders from "@/components/Admin/Orders";
import Transactions from "@/components/Admin/Transactions";
import Customers from "@/components/Admin/Customers";
import NextLink from "next/link";
import { StateContext } from "@/context/StateProvider";
import { useRouter } from "next/router";
import { HiChevronDown, HiOutlineShoppingBag } from "react-icons/hi2";
import CreateProducts from "./CreateProducts";
import Products from "./Products";
import { FiMenu } from "react-icons/fi";

const navData = [
    {
        name: "dashboard",
        value: 1,
        icon: MdOutlineDashboard,
    },
    {
        name: "categories",
        value: 2,
        icon: MdOutlineDashboard,
    },
    {
        name: "create products",
        value: 3,
        icon: MdOutlineDashboard,
    },
    {
        name: "products",
        value: 4,
        icon: MdOutlineDashboard,
    },
    {
        name: "orders",
        value: 5,
        icon: HiOutlineShoppingBag,
    },
    {
        name: "transactions",
        value: 6,
        icon: MdOutlineDashboard,
    },
    {
        name: "Customers",
        value: 7,
        icon: MdOutlineDashboard,
    },
];

export default function AdminDashboard() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [activePage, setActivePage] = useState(1);

    let role;
    const router = useRouter();

    if (typeof window !== 'undefined') {
        role = sessionStorage.getItem("role");
    }

    useEffect(() => {
        if (role !== 'admin') {
            router.push("/");
        }
    }, [role, router]);

    const renderPageContent = () => {
        switch (activePage) {
            case 1:
                return <Dashboard />;
            case 2:
                return <Categories />;
            case 3:
                return <CreateProducts setActivePage={setActivePage} />;
            case 4:
                return <Products setActivePage={setActivePage} />;
            case 5:
                return <Orders />;
            case 6:
                return <Transactions setActivePage={setActivePage} />;
            case 7:
                return <Customers setActivePage={setActivePage} />;
            default:
                return null;
        }
    };
    return (
        <Box minH="100vh" bgColor="shades_8">
            <SidebarContent
                onClose={() => onClose}
                display={{ base: "none", md: "block" }}
                activePage={activePage}
                setActivePage={setActivePage}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
            // size="md"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent
                        onClose={onClose}
                        setActivePage={setActivePage}
                        activePage={activePage}
                    />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav
                onOpen={onOpen}
                setActivePage={setActivePage}
                activePage={activePage}
            />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {renderPageContent()}
            </Box>
        </Box>
    );
}

const SidebarContent = ({ onClose, setActivePage, activePage, ...rest }) => {
    return (
        <Box
            transition="3s ease"
            bg={"primary_1"}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
                py="30px"
            >
                <Link as={NextLink} href="/">
                    <Image
                        src="/images/Hairsense-logo.svg"
                        alt="Logo"
                        w={["150px", null, "225px"]}
                        h="100%"
                    />
                </Link>
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            <Box mt="30px">
                {navData.map((link) => (
                    <NavItem
                        key={link.name}
                        value={link.value}
                        icon={link.icon}
                        setActivePage={setActivePage}
                        activePage={activePage}
                        name={link.name}
                        handleClose={onClose}
                    />
                ))}
            </Box>
        </Box>
    );
};

const NavItem = (
    { icon, name, value, setActivePage, activePage, handleClose, ...rest },
    i
) => {
    return (
        <Flex
            key={i}
            color="white"
            gap={["12px", null, "16px"]}
            borderLeft="2px"
            borderLeftColor={activePage === value ? "white" : "transparent"}
            bgColor={activePage === value ? "whiteAlpha.200" : "transparent"}
            py="13px"
            pl="30px"
            cursor="pointer"
            _hover={{
                bgColor: "whiteAlpha.200",
            }}
            transition={"auto"}
            transitionDuration={".5s"}
            onClick={() => {
                setActivePage(value);
                handleClose();
            }}
        >
            <Icon as={MdOutlineDashboard} boxSize={"24px"} />

            <Text
                textTransform={"capitalize"}
                fontSize={["16px", null, "18px"]}
            >
                {" "}
                {name}{" "}
            </Text>
        </Flex>
    );
};

const MobileNav = ({ onOpen, setActivePage, activePage, ...rest }) => {
    const { handleLogOut } = useContext(StateContext);
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: "flex", md: "none" }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Logo
            </Text>

            <HStack
                spacing={{ base: "0", md: "6" }}
                flexShrink={0}
                cursor={"pointer"}
            >
                {/* <Flex alignItems={"center"}></Flex> */}
                <Menu>
                    <MenuButton
                        as={"flex"}
                        alignContent={"center"}
                        fontWeight="bold"
                        w="fit-content"
                    >
                        <Flex align={"center"} cursor={"pointer"}>
                            {" "}
                            <Text> Admin</Text>{" "}
                            <Icon as={HiChevronDown} ml="2" />
                        </Flex>
                    </MenuButton>
                    <MenuList p="0" overflow={"hidden"}>
                        <MenuItem py="10px" onClick={handleLogOut}>
                            Log out
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Flex>
    );
};
