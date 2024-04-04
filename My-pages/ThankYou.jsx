import { ScreenSize } from "@/components/layouts";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const ThankYou = () => {
    const router = useRouter();

    return (
        <Box>
            <ScreenSize>
                <Flex
                    display="flex"
                    justify="left"
                    mt="48px"
                    borderBottom="1px"
                    borderBottomColor={"#33333333"}
                >
                    <Text
                        fontSize="2xl"
                        fontWeight="extrabold"
                        color="#333333"
                        pb="12px"
                    >
                        Thank you for shopping with us!
                    </Text>
                </Flex>

                {/*  */}

                <Stack mt="29px" spacing={"29px"}>
                    {[
                        {
                            id: 1,
                            title: "Item(s) purchased",
                            value: "Hyggee Vegan Sun Cream - 50ml",
                        },
                        { id: 2, title: "Total payment made", value: "4,000" },
                        {
                            id: 3,
                            title: "Transaction ID",
                            value: "00000000001",
                        },
                        {
                            id: 4,
                            title: "Payment Method",
                            value: "Card",
                        },
                    ].map(({ id, title, value }) => {
                        return (
                            <Flex
                                align={"center"}
                                key={id}
                                flexDir={["column", "row"]}
                                gap="16px"
                            >
                                <Text
                                    fontSize={"18px"}
                                    fontWeight={"600"}
                                    w="100%"
                                >
                                    {title}
                                </Text>

                                <Text
                                    fontSize={
                                        title === "Total payment made"
                                            ? "24px"
                                            : "18px"
                                    }
                                    fontWeight={"600"}
                                    w="100%"
                                    textAlign={["left", "right"]}
                                >
                                    {title === "Total payment made" && "₦"}
                                    {value}
                                </Text>
                            </Flex>
                        );
                    })}
                </Stack>
                <Box mt="22px">
                    <Text color="#333333" fontSize={"22px"}>
                        For any feedback, please send an email address to
                        support @hairsense.com, Thank you
                    </Text>
                </Box>
                <Flex mt="60px" flexWrap={"wrap"} gap="16px">
                    <Button
                        color="white"
                        bgColor={"primary_1"}
                        w="100%"
                        maxW="324px"
                        _hover={{}}
                        _active={{}}
                        mr="24px"
                        fontSize={["14px", "16px"]}
                        onClick={(e) => window?.print()}
                        py="14px"
                    >
                        Download Receipt
                    </Button>{" "}
                    <Button
                        color="primary_1"
                        bgColor={"transparent"}
                        border={"1px"}
                        w="100%"
                        maxW="324px"
                        _hover={{}}
                        _active={{}}
                        mr="24px"
                        fontSize={["14px", "16px"]}
                        onClick={() => router.push("/")}
                        py="14px"
                    >
                        Go back to the homepage
                    </Button>
                </Flex>
            </ScreenSize>
        </Box>
    );
};

export default ThankYou;
