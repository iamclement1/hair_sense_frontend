import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const Badge = ({ status = "success", ...props }) => {
    let bgColor = "secondary_2"; // Default background color
    let textColor = "green"; // Default text color

    // Conditionally update background and text colors based on status
    if (status === "Pending") {
        bgColor = "yellow"; // Change background color to yellow
        textColor = "black"; // Change text color to black
    } else if (status === "failed") {
        bgColor = "red"; // Change background color to red
        textColor = "white"; // Change text color to white
    }

    return (
        <Flex
            align="center"
            justify="center"
            bgColor={bgColor}
            opacity={status === "pending" ? 0.5 : 1} // Reduce opacity for pending status
            px="20px"
            py="8px"
            rounded="20px"
            color={textColor}
            fontSize={["12px", null, "16px"]}
        >
            {status}
        </Flex>
    );
};

export default Badge;
