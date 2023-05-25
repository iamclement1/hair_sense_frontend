import { Box, Divider, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

const TrackOrders = () => {
    const router = useRouter();
    return (
        <Box>
            <Box>
                <Box pt={["40px", null, "40px"]}>
                    <Flex align="center" justify="space-between" w="100%">
                        <Text
                            fontSize={{ base: "16px", md: "20px", xl: "30px" }}
                            fontWeight="600"
                        >
                            Package History
                        </Text>
                        <Icon
                            as={FaTimes}
                            onClick={() => router.back()}
                            cursor={"pointer"}
                        />
                    </Flex>
                    <Divider mt="8px" />
                    <Box mt={["40px", "50px", "60px"]}>
                        <Box maxW="975px" mx="auto">
                            <Flex
                                gap={["11px", "14px", "66px"]}
                                align="center"
                                justify="space-between"
                                flexDir={["column", null, "row"]}
                            >
                                {trackOrderData.map((item, i) => {
                                    return (
                                        <TrackOrderBox key={i} data={item} />
                                    );
                                })}
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default TrackOrders;

const TrackOrderBox = ({ data }) => {
    return (
        <>
            {data && data.text === "arrow" ? (
                <Flex
                    align="center"
                    justify="center"
                    flex="1"
                    opacity={data && data.status ? "1" : "0.5"}
                >
                    <Image
                        src="/images/arrow.svg"
                        maxW="100px"
                        h="100%"
                        minH="120px"
                        transform={"auto"}
                        rotate={["90deg", null, "0deg"]}
                        alt="Arrow Icon"
                    />
                </Flex>
            ) : (
                <Box
                    textAlign="center"
                    opacity={data && data.status ? "1" : "0.5"}
                >
                    <Box>
                        <Icon
                            as={BsCheckCircleFill}
                            color="green"
                            boxSize="25px"
                        />
                    </Box>

                    <Text
                        fontsize={["14px", "18px", "22px"]}
                        mt={["11px", null, "15px"]}
                        fontWeight="600"
                    >
                        Order placed
                    </Text>

                    <Text
                        fontSize={["12px", null, "15px"]}
                        mt={["11px", null, "15px"]}
                    >
                        {" "}
                        Monday, 3rd Oct
                    </Text>

                    <Text
                        fontSize={["12px", null, "15px"]}
                        mt={["11px", null, "15px"]}
                    >
                        10:30 A.M
                    </Text>
                </Box>
            )}
        </>
    );
};

const trackOrderData = [
    {
        text: "Order placed",
        data_date: "Monday, 3rd Oct",
        data_time: "10:30 A.M",
        status: true,
    },
    { text: "arrow", status: true },
    {
        text: "Out for Delivery",
        data_date: "Monday, 3rd Oct",
        data_time: "10:30 A.M",
        status: false,
    },
    { text: "arrow", status: false },
    {
        text: "Order Delivered",
        data_date: "Monday, 3rd Oct",
        data_time: "10:30 A.M",
        status: false,
    },
];
