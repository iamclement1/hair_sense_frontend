import { useContext, useEffect, useState } from "react";
import {
    Flex,
    Box,
    Image,
    Link,
    Icon,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
} from "@chakra-ui/react";

import ScreenSize from "../layouts/ScreenSize";
import NextLink from "next/link";
import SearchInput from "./SearchInput";
import { FaBars, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { NavDropDown } from ".";
import MobileNav from "./MobileNav";
import AuthModal from "../modal/AuthModal";
import { useRouter } from "next/router";
import CartModal from "../modal/CartModal";
import { CartContext, StateContext } from "@/context/StateProvider";
import { baseUrl } from "@/http-request/http-request";
import Cookies from "js-cookie";
import axios from "axios";
const Navbar = () => {
    // Global cart
    const GlobalCart = useContext(CartContext);
    const state = GlobalCart.state;
    let cartItems = [];

    if (typeof window !== "undefined") {
        cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    }

    // fuction to Open Nav
    const { isOpen, onOpen, onClose } = useDisclosure();
    //fetch user from context api
    const { user, setUser, products, handleLogOut } = useContext(StateContext);
    // console.log("user", user);
    // console.log("Producs is here in nav", products);
    // have userData here
    const [userData, setUserData] = useState(null);
    // console.log("User: " + user);
    // function to handle Authication  modal
    //fetch user info from the endpoint
    const access_token = Cookies.get("access_token");
    // console.log("here is the token", access_token);
    useEffect(() => {
        async function fetchUser() {
            const response = await axios.get(`${baseUrl}/accounts/user`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            // const data = await response;
            setUser(response && response.data && response.data.data);
            setUserData(response && response.data && response.data.data);
        }
        user && fetchUser();
    }, [user]); //eslint-disable-line
    const router = useRouter();
    const {
        isOpen: isOpenAuth,
        onOpen: onOpenAuth,
        onClose: onCloseAuth,
    } = useDisclosure();
    // function to handle Cart  modal
    const {
        isOpen: isOpenCart,
        onOpen: onOpenCart,
        onClose: onCloseCart,
    } = useDisclosure();

    const navigateToFav = () => {
        router.push("/favorite");
    };
    const menuItems = [
        {
            url: () => onOpenAuth(),
            text: "My Account",
            icon: FaUser,
        },
        {
            url: navigateToFav,
            text: "Favorite product",
            icon: FaHeart,
        },
        {
            url: onOpenCart,
            text: "My Cart",
            icon: FaShoppingCart,
        },
    ];
    const logOutmenuItems = [
        {
            url: () => onOpenAuth(),
            text: "My Account",
            icon: FaUser,
        },

        {
            url: onOpenCart,
            text: "My Cart",
            icon: FaShoppingCart,
        },
    ];

    return (
        <>
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

                        <Box
                            display="flex"
                            alignItems="center"
                            flexShrink={"0"}
                        >
                            <Link as={NextLink} href="/">
                                <Image
                                    src={"/images/Hairsense-logo.svg"}
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
                                {user && user ? (
                                    <>
                                        {menuItems.map(
                                            ({ url, text, icon }, i) => {
                                                return (
                                                    <Box key={i}>
                                                        {" "}
                                                        {text ===
                                                        "My Account" ? (
                                                            <>
                                                                {" "}
                                                                <Menu>
                                                                    <Box
                                                                        as={
                                                                            MenuButton
                                                                        }
                                                                        cursor={
                                                                            "pointer"
                                                                        }
                                                                        textAlign={
                                                                            "center"
                                                                        }
                                                                    >
                                                                        <Icon
                                                                            as={
                                                                                icon
                                                                            }
                                                                            color="accent_2"
                                                                        />
                                                                        <Text color="accent_2">
                                                                            {user &&
                                                                                user.first_name}
                                                                        </Text>
                                                                    </Box>
                                                                    <MenuList py="0px">
                                                                        <MenuItem
                                                                            rounded="4px"
                                                                            shadow="lg"
                                                                            onClick={() => {
                                                                                handleLogOut();
                                                                            }}
                                                                        >
                                                                            Log
                                                                            out
                                                                        </MenuItem>
                                                                    </MenuList>
                                                                </Menu>
                                                            </>
                                                        ) : (
                                                            <Box
                                                                pos="relative"
                                                                cursor={
                                                                    "pointer"
                                                                }
                                                                key={i}
                                                                textAlign={
                                                                    "center"
                                                                }
                                                                onClick={url}
                                                            >
                                                                <Icon
                                                                    as={icon}
                                                                    color="accent_2"
                                                                />
                                                                <Text color="accent_2">
                                                                    {text}{" "}
                                                                </Text>
                                                                {text ===
                                                                    "My Cart" &&
                                                                    cartItems.length >
                                                                        0 && (
                                                                        <Flex
                                                                            bgColor="primary_1"
                                                                            color="white"
                                                                            rounded="full"
                                                                            w="20px"
                                                                            h="20px"
                                                                            align="center"
                                                                            justify="center"
                                                                            fontSize="10px"
                                                                            fontWeight="600"
                                                                            pos="absolute"
                                                                            top="-2"
                                                                            right="1px"
                                                                        >
                                                                            {cartItems &&
                                                                                cartItems.length}
                                                                        </Flex>
                                                                    )}
                                                            </Box>
                                                        )}{" "}
                                                    </Box>
                                                );
                                            }
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {logOutmenuItems.map(
                                            ({ url, text, icon }, i) => {
                                                return (
                                                    <Box
                                                        pos="relative"
                                                        cursor={"pointer"}
                                                        key={i}
                                                        textAlign={"center"}
                                                        onClick={url}
                                                    >
                                                        <Icon
                                                            as={icon}
                                                            color="accent_2"
                                                        />
                                                        <Text color="accent_2">
                                                            {text}{" "}
                                                        </Text>
                                                        {text === "My Cart" &&
                                                            state.length >
                                                                0 && (
                                                                <Flex
                                                                    bgColor="primary_1"
                                                                    color="white"
                                                                    rounded="full"
                                                                    w="20px"
                                                                    h="20px"
                                                                    align="center"
                                                                    justify="center"
                                                                    fontSize="10px"
                                                                    fontWeight="600"
                                                                    pos="absolute"
                                                                    top="-2"
                                                                    right="1px"
                                                                >
                                                                    {cartItems &&
                                                                        cartItems.length}
                                                                </Flex>
                                                            )}
                                                    </Box>
                                                );
                                            }
                                        )}
                                    </>
                                )}
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

                {/* Modal Requirement Importation for the Account */}
            </Box>

            <AuthModal
                isOpen={isOpenAuth}
                onOpen={onOpenAuth}
                onClose={onCloseAuth}
            />
            <CartModal
                isOpen={isOpenCart}
                onOpen={onOpenCart}
                onClose={onCloseCart}
            />
        </>
    );
};

export default Navbar;
