import Orders from "@/components/Client/Orders";
import OverView from "@/components/Client/OverView";
import RecentlyViewed from "@/components/Client/RecentlyViewed";
import { StateContext } from "@/context/StateProvider";
import {
    Box,
    Flex,
    Text,
    Icon,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const MyAccount = () => {
    const [activeNav, setActiveNav] = useState(2);
    const { isOpen, onOpen, onToggle } = useDisclosure();

    const { handleLogOut } = useContext(StateContext);

    const renderNavItems = () => {
        return navContent.map((item, i) => {
            const { text, navNo } = item;
            return (
                <Box
                    cursor="pointer"
                    py="13px"
                    key={i}
                    borderBottom={"1pxstart"}
                    borderColor="accent_10"
                    fontWeight={activeNav === navNo ? "600" : "400"}
                    onClick={() => {
                        setActiveNav(navNo);
                        onOpen();
                    }}
                >
                    <Box> {text} </Box>
                </Box>
            );
        });
    };

    let previewComponent;

    if (activeNav === 1) {
        previewComponent = <OverView onToggle={onToggle} />;
    } else if (activeNav === 2) {
        previewComponent = <Orders onToggle={onToggle} />;
    } else if (activeNav === 3) {
        previewComponent = <RecentlyViewed onToggle={onToggle} />;
    } else {
        previewComponent = null; // Adjust accordingly if needed
    }


    return (
        <Box>
            <Box>
                <Flex display="flex" justify="center" mt="48px" >
                    <Text fontSize="2xl" fontWeight="extrabold">Thank you for choosing us, your orders can be viewed here 🤗</Text>
                </Flex>
            </Box>
            <Box w="100%" mt={{ base: "33px", md: "60px", xl: "" }}>
                <Box w="100%">
                    <Flex justify="flex-end" align="center">
                        <Icon
                            as={IoIosCloseCircleOutline}
                            boxSize={{ base: "21px", md: "27px" }}
                        />
                    </Flex>
                    <Flex gap="40px" pos={""}>
                        {/* Nav Section  */}
                        <Box
                            className="sticky"
                            w="100%"
                            maxW="229px"
                            display={[
                                isOpen ? "none" : "block",
                                isOpen ? "none" : "block",
                                "block",
                            ]}
                        >
                            {renderNavItems()}
                        </Box>

                        {/* Preview section  */}

                        <Box
                            w="100%"
                            h="100%"
                            display={[
                                isOpen ? "block" : "none",
                                isOpen ? "block" : "none",
                                "block",
                            ]}
                        >
                            {previewComponent}
                        </Box>
                    </Flex>

                    <Flex>
                        <Text fontSize="xl" mt="38px" color="#DE3C4B" cursor="pointer"
                            onClick={() => {
                                handleLogOut();
                            }}>
                            Log Out
                        </Text>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default MyAccount;

const navContent = [
    {
        text: "Overview",
        navNo: 1,
    },
    {
        text: "Orders",
        navNo: 2,
    },
    {
        text: "Recently viewed",
        navNo: 3,
    },
];
