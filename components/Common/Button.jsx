import React from "react";
import { Button, Icon, Image, Spinner, Text } from "@chakra-ui/react";

export const PrimaryButton = ({
    text,
    children,
    handleButton,
    isLoading,
    ...props
}) => {
    return (
        <Button
            {...props}
            _hover={{}}
            _active={{}}
            _focus={{}}
            bgColor={"primary_1"}
            color={"white"}
            px={["16px", null, "26px"]}
            py="15px"
            display={"block"}
            h="auto"
            w="100%"
            fontSize={["14px", null, "20px", null, "20px"]}
            onClick={handleButton}
            isDisabled={isLoading}
        >
            {isLoading ? <Spinner size="md" /> : text}
        </Button>
    );
};

export const SocialButton = ({ icon, text, imageUrl, imageText, ...props }) => {
    return (
        <Button
            display="flex"
            alignContent={"center"}
            justifyContent={"center"}
            {...props}
            _hover={{}}
            _active={{}}
            _focus={{}}
            bgColor={"transparent"}
            px={["16px", null, "26px"]}
            py="15px"
            h="auto"
            w="100%"
            fontSize={["14px", null, "20px", null, "20px"]}
            boxShadow={"0px 1.466px 1.466px rgba(51, 154, 240, 0.1)"}
            border={"1px"}
            borderColor={"dark_2"}
            gap={["12px", "24px"]}
        >
            <Text textAlign={"right"} flex={1}>
                {icon && <Icon as={icon} boxSize={["25px"]} />}
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={imageText}
                        display="inline-block"
                        w={["24px", null, "35px"]}
                    />
                )}
            </Text>
            <Text
                w={["80%", null, "60%", "60%", "60%", "60%"]}
                color="dark_3"
                fontWeight={400}
                fontSize={["16px", null, "20px"]}
                textAlign={"left"}
            >
                {" "}
                {text}
            </Text>
        </Button>
    );
};
