import { Box } from "@chakra-ui/react";
import React from "react";

const ScreenSize = ({ children }) => {
    return (
        <Box px={["16px", "20px", "25px", "64px"]} maxW="1568px" mx="auto">
            {children}
        </Box>
    );
};

export default ScreenSize;
