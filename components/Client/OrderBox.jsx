import Badge from "@/components/Common/Badge";
import {
    Box,
    Flex,
    Text,

    Image,
} from "@chakra-ui/react";
import React from "react";


const OrderBox = ({ data }) => {
    console.log(data)
    const { payment, status } = data;
    const { name, productImg, amount } = data.products;

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
                            src={productImg}
                            alt={name}

                            // src="/images/cream.svg"
                            // alt={"dummy "}
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
                                {payment}
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
                                    {amount}
                                </Text>
                            </Box>

                            {/* <PrimaryButton
                                maxW="fit-content"
                                text="Track Order"
                                handleButton={() =>
                                    router.push(`/track_orders/${"Product Id"}`)
                                }
                            /> */}

                            <Badge status={payment} />
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
                                {status}

                            </Text>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default OrderBox;
