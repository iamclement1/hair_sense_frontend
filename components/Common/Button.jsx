import React from "react";
import { Button } from "@chakra-ui/react";

const PrimaryButton = ({ text, ...props }) => {
    return (
        <Button
            {...props}
            _hover={{}}
            _active={{}}
            _focus={{}}
            bgColor={"primary_1"}
        >
            {text}
        </Button>
    );
};

export default PrimaryButton;
