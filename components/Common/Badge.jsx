import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const Badge = ({ status = "success", ...props }) => {
    // const success = "secondary_2";

    return (
        <Flex
            align="center"
            justify="center"
            bgColor={"secondary_2"}
            px="20px"
            py="8px"
            rounded="20px"
            color="green"
            fontSize={["12px", null, "16px"]}
        >
            Success
        </Flex>
    );
};

export default Badge;
