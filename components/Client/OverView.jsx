import { StateContext } from "@/context/StateProvider";
import {
    Box,
    Divider,
    Flex,
    Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";

const OverView = ({ onToggle }) => {
    const { user } = useContext(StateContext);

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
                <Text> Greetings, Mr.{user?.first_name} 🥰 </Text>
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

export default OverView;
