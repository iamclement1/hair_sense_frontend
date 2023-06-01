import { PrimaryButton, ProductSlider } from "@/components/Common";
import Badge from "@/components/Common/Badge";
import {
    Box,
    Divider,
    Flex,
    Text,
    Icon,
    Image,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";

const MyAccount = () => {
    const [activeNav, setActiveNav] = useState(1);
    const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
    return (
        <Box>
            <Box w="100%" mt={{ base: "33px", md: "74px", xl: "" }}>
                <Box w="100%">
                    <Flex justify="flex-end" align="center">
                        <Icon
                            as={IoIosCloseCircleOutline}
                            boxSize={{ base: "21px", md: "27px" }}
                        />
                    </Flex>
                    <Flex gap="40px">
                        {/* Nav Section  */}
                        <Box
                            w="100%"
                            maxW="229px"
                            display={[
                                isOpen ? "none" : "block",
                                isOpen ? "none" : "block",
                                "block",
                            ]}
                        >
                            {navContent.map((item, i) => {
                                const { text, navNo } = item;
                                return (
                                    <Box
                                        cursor="pointer"
                                        py="13px"
                                        key={i}
                                        borderBottom={"1pxstart"}
                                        borderColor="accent_10"
                                        fontWeight={
                                            activeNav === navNo ? "600" : "400"
                                        }
                                        onClick={() => {
                                            setActiveNav(navNo);
                                            onOpen();
                                        }}
                                    >
                                        <Box> {text} </Box>
                                    </Box>
                                );
                            })}
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
                            {activeNav === 1 ? (
                                <OverView onToggle={onToggle} />
                            ) : activeNav === 2 ? (
                                <Orders onToggle={onToggle} />
                            ) : activeNav === 3 ? (
                                <RecentlyViewed onToggle={onToggle} />
                            ) : (
                                ""
                            )}
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default MyAccount;

const OverView = ({ onToggle }) => {
    return (
        <Box>
            <Flex
                align="center"
                onClick={onToggle}
                mb="4"
                display={{ base: "flex", sm: "none", md: "none", xl: "none" }}
            >
                <FiChevronLeft />
            </Flex>
            <Flex align={"center"} gap={["20px"]} px={["0px"]}>
                <Divider borderColor="accent_10" />
                <Text
                    flexShrink={0}
                    fontSize={{ base: "18px", md: "20px", xl: "30px" }}
                    fontWeight={600}
                    color="accent_2"
                >
                    Overview
                </Text>
                <Divider />
            </Flex>

            <Box fontSize={["16px", null, null, null, "18px"]}>
                <Text> Greetings, Mr. Salaudeen!</Text>
                <Text mt="18px">
                    Our online store is eager to have you as a customer.
                    Purchase your own particular beauty favorites or explore
                    with us the newest, most cutting-edge care trends. Your
                    opinion is always appreciated as we work to make your
                    shopping experience better.
                </Text>
            </Box>
        </Box>
    );
};

const Orders = ({ onToggle }) => {
    return (
        <Box>
            <Flex
                align="center"
                onClick={onToggle}
                mb="4"
                display={{ base: "flex", sm: "none", md: "none", xl: "none" }}
            >
                <FiChevronLeft />

                {/* <Text fontSize={"12px"}>Back</Text> */}
            </Flex>
            <Flex align={"center"} gap={["20px"]} px={["0px"]}>
                <Divider borderColor="accent_10" />
                <Text
                    flexShrink={0}
                    fontSize={{ base: "18px", md: "20px", xl: "30px" }}
                    fontWeight={600}
                    color="accent_2"
                >
                    Orders
                </Text>
                <Divider />
            </Flex>

            <Box>
                {!true ? (
                    <Flex minH="20vh" align="center">
                        <Text>You currently do not have any order</Text>
                    </Flex>
                ) : (
                    <OrderBox data={""} />
                )}
            </Box>
        </Box>
    );
};

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

const OrderBox = ({ data }) => {
    return (
        <Box>
            <Flex
                flexDirection="column"
                justifyContent="space-between"
                py="30px"
            >
                <Flex w="100%" h="max-content" gap={["none", "30px"]}>
                    <Box>
                        <Image
                            // src={product?.product_img}
                            // alt={product?.name}

                            src="/images/cream.svg"
                            alt={"dummy "}
                            w={{
                                base: "125px",
                                md: "130px",
                            }}
                            h={{
                                base: "115px",
                                md: "130px",
                            }}
                            objectFit="cover"
                        />
                    </Box>
                    <Flex flexDir="column" justify="space-between" flex="1">
                        <Box>
                            <Text
                                fontSize={{
                                    base: "12px",
                                    sm: "14px",
                                    md: "18px",
                                    // lg: "23px",
                                }}
                                fontWeight={"600"}
                                maxW="600px"
                                noOfLines={2}
                            >
                                {/* {product?.name} */}
                                Hyggee Vegan Sun Cream - 50ml
                            </Text>
                        </Box>
                        <Flex
                            justify="space-between"
                            align={["unset", null, "center"]}
                            gap="16px"
                            flexDir={["column", null, "row"]}
                            order={{ base: "3", md: "2", xl: "2" }}
                        >
                            <Box>
                                <Text
                                    fontSize={{
                                        base: "14px",
                                        md: "18px",
                                        // lg: "23px",
                                    }}
                                    fontWeight={"600"}
                                >
                                    ₦ 4,000
                                </Text>
                            </Box>

                            {/* <PrimaryButton
                                maxW="fit-content"
                                text="Track Order"
                                handleButton={() =>
                                    router.push(`/track_orders/${"Product Id"}`)
                                }
                            /> */}

                            <Badge />
                        </Flex>
                        <Box order={{ base: "2", md: "2", xl: "2" }}>
                            <Text
                                fontSize={{
                                    base: "14px",
                                    md: "18px",
                                    // lg: "23px",
                                }}
                                fontWeight={"400"}
                                maxW="600px"
                                noOfLines={2}
                            >
                                {/* {product?.name} */}
                                22/04/23
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

const RecentlyViewed = ({ onToggle }) => {
    return (
        <Box>
            <Flex
                align="center"
                onClick={onToggle}
                mb="4"
                display={{ base: "flex", sm: "none", md: "none", xl: "none" }}
            >
                <FiChevronLeft />
            </Flex>
            {/* <Flex align={"center"} gap={["20px"]} px={["0px"]}>
                <Divider borderColor="accent_10" />
                <Text
                    flexShrink={0}
                    fontSize={{ base: "18px", md: "20px", xl: "30px" }}
                    fontWeight={600}
                    color="accent_2"
                >
                    Recently Viewed
                </Text>
                <Divider />
            </Flex> */}

            {/* Product Slider  */}

            <Box>
                <ProductSlider
                    section=" Recently Viewed"
                    type="other"
                    productDatas={[]}
                />
            </Box>
        </Box>
    );
};
