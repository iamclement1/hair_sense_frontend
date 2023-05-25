import { PrimaryButton, ProductSlider } from "@/components/Common";
import OrderDetailsPreview from "@/components/Common/OrderDetailsPreview";
import {
    Box,
    Flex,
    Button,
    Divider,
    Icon,
    Text,
    Image,
    Textarea,
    FormErrorMessage,
    FormLabel,
    FormControl,
    Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const OrderDetails = () => {
    const router = useRouter();
    const [showFullDetails, setShowFullDetails] = useState(false);

    return (
        <Box pt={["40px", null, "40px"]}>
            <Flex align="center" justify="space-between" w="100%">
                <Text
                    fontSize={{ base: "16px", md: "20px", xl: "30px" }}
                    fontWeight="600"
                >
                    Order Details
                </Text>
                <Icon
                    as={FaTimes}
                    onClick={() => router.back()}
                    cursor={"pointer"}
                />
            </Flex>
            <Divider mt="8px" />
            <Box mt={["40px", "50px", "60px"]}>
                {!showFullDetails ? (
                    <OrderDetailsPreview
                        setShowFullDetails={setShowFullDetails}
                    />
                ) : (
                    <FullOrderDetails />
                )}
            </Box>
        </Box>
    );
};

export default OrderDetails;

const FullOrderDetails = () => {
    return (
        <Box>
            <Flex
                mt="15px"
                align={"center"}
                justify={"space-between"}
                fontWeight={"400"}
            >
                <Text
                    fontSize={{
                        base: "14px",
                        md: "18px",
                    }}
                    fontWeight="600"
                >
                    Hyggee Vegan Sun Cream - 50ml{" "}
                    <Text
                        as="span"
                        display={["none", null, "inline-block"]}
                        ml="10px"
                    >
                        x {1}
                    </Text>
                </Text>
                <Text fontSize={["16px", "21px", "23px"]} fontWeight={600}>
                    <Text
                        as="span"
                        display={["none", null, "inline-block"]}
                        pr="10px"
                    >
                        Total{" "}
                    </Text>
                    ₦ 4,000{" "}
                </Text>
            </Flex>
            {/* Order in progress */}

            <Flex
                align="center"
                justify="space-between"
                w="100%"
                mt={["41px", null, "80px"]}
            >
                <Text
                    fontSize={{ base: "14px", md: "20px", xl: "23px" }}
                    fontWeight="600"
                    color="accent_2"
                >
                    Order in progress
                </Text>
            </Flex>
            <Divider mt="8px" />

            <Box mt={["25px", null, "35px"]}>
                {/* Order in Progress Card  */}
                <OrderProgressCard />
            </Box>

            {/* Delivery Information */}

            <Flex
                align="center"
                justify="space-between"
                w="100%"
                mt={["41px", null, "80px"]}
            >
                <Text
                    fontSize={{ base: "14px", md: "20px", xl: "23px" }}
                    fontWeight="600"
                    color="accent_2"
                >
                    Delivery Information
                </Text>
            </Flex>
            <Divider mt="8px" />
            <Box>
                <DeliveryInformation />
            </Box>

            {/* Payment Information */}
            <Flex
                align="center"
                justify="space-between"
                w="100%"
                mt={["41px", null, "80px"]}
            >
                <Text
                    fontSize={{ base: "14px", md: "20px", xl: "23px" }}
                    fontWeight="600"
                    color="accent_2"
                >
                    Delivery Information
                </Text>
            </Flex>
            <Divider mt="8px" />
            <Box>
                <PaymentInformation />
            </Box>
        </Box>
    );
};

const OrderProgressCard = () => {
    const router = useRouter();
    return (
        <Box>
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

                                <PrimaryButton
                                    maxW="fit-content"
                                    text="Track Order"
                                    handleButton={() =>
                                        router.push(
                                            `/track_orders/${"Product Id"}`
                                        )
                                    }
                                />
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
                                    Quantity: {1}
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    );
};

const DeliveryInformation = () => {
    return (
        <Box mt={["20px", null, "30px"]}>
            <Flex align={"center"} justify={"space-between"} gap="20px">
                <Text fontSize={["12px", "17px"]} fontWeight="600">
                    Delivery Method
                </Text>
                <Text fontSize={["12px", "17px"]} fontWeight={400}>
                    Door Delivery
                </Text>
            </Flex>

            {/* Delivery address  */}

            <Flex
                align={"center"}
                justify={"space-between"}
                gap="20px"
                mt="17px"
            >
                <Text fontSize={["12px", "17px"]} fontWeight="600">
                    Delivery Address
                </Text>
                <Text fontSize={["12px", "17px"]} fontWeight={400}>
                    No 88 Brown street, Ilorin
                </Text>
            </Flex>
        </Box>
    );
};

const PaymentInformation = () => {
    return (
        <Box mt={["20px", null, "30px"]}>
            <Flex align={"center"} justify={"space-between"} gap="20px">
                <Text fontSize={["12px", "17px"]} fontWeight="600">
                    Payment Method
                </Text>
                <Text fontSize={["12px", "17px"]} fontWeight={600}>
                    Card
                </Text>
            </Flex>

            <Flex
                align={"center"}
                justify={"space-between"}
                gap="20px"
                mt="17px"
            >
                <Text fontSize={["12px", "17px"]} fontWeight="400">
                    Items sold:
                </Text>
                <Text fontSize={["12px", "17px"]} fontWeight={600}>
                    4,000
                </Text>
            </Flex>

            <Flex
                align={"center"}
                justify={"space-between"}
                gap="20px"
                mt="17px"
            >
                <Text fontSize={["12px", "17px"]} fontWeight="400">
                    Delivery fee:
                </Text>
                <Text fontSize={["12px", "17px"]} fontWeight={600}>
                    1,200
                </Text>
            </Flex>

            <Flex
                align={"center"}
                justify={"space-between"}
                gap="20px"
                mt="17px"
            >
                <Text fontSize={["12px", "17px"]} fontWeight="400">
                    Total:
                </Text>
                <Text fontSize={["12px", "17px"]} fontWeight={600}>
                    5,200
                </Text>
            </Flex>
        </Box>
    );
};
