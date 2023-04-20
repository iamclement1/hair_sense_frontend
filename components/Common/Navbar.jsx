import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Navbar = () => {
    return (
        <Flex align="center" justify="center" h="240px" bgColor={"blue.800"}>
            <Text textAlign={"center"} fontFamily={"inter"}>
                {" "}
                Welcome Back
                
            </Text>
        </Flex>
    );
};

export default Navbar;
