import { useState } from "react";
import { Field } from "formik";
import {
    Box,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Icon,
    Input,
    Text,
} from "@chakra-ui/react";

import { FiEye, FiEyeOff } from "react-icons/fi";

const CustomInput = ({
    label,
    name,
    type,
    placeholder,
    fontSize,
    px,
    errors,
    touched,
    ...props
}) => {
    const [showPassWord, setShowPassWord] = useState(false);
    const handleShowPassword = () => {
        setShowPassWord(!showPassWord);
    };
    return (
        <FormControl isInvalid={!!errors[name] && touched[name]} mt="16px">
            <FormLabel
                htmlFor={name}
                fontSize="14px"
                color="accent_2"
                fontWeight={600}
            >
                {label}
            </FormLabel>
            <Box pos="relative">
                <Input
                    {...props}
                    as={Field}
                    id={name}
                    name={name}
                    type={
                        type === "password"
                            ? showPassWord
                                ? "text"
                                : "password"
                            : "text"
                    }
                    placeholder={placeholder}
                    fontSize={"15px"}
                    px={"20px"}
                    py="12px"
                    pl={name === "phone_number" ? "70px" : ""}
                    pr={name === "store_domain" ? "155px" : "unset"}
                    display="inline-block"
                    _focusVisible={{
                        border: "1px",
                        borderColor: "dark_4",
                    }}
                    border="1px"
                    borderColor="dark_4"
                    rounded="5px"
                />
                {type === "password" && (
                    <Icon
                        transform={"auto"}
                        pos="absolute"
                        translateY={"-50%"}
                        top="50%"
                        right="22px"
                        as={showPassWord ? FiEyeOff : FiEye}
                        cursor="pointer"
                        onClick={handleShowPassword}
                    />
                )}

                {name === "phone_number" && (
                    <Flex
                        w="100%"
                        maxW="67px"
                        bg={"white"}
                        transform={"auto"}
                        borderRight="1px"
                        bgColor="transparent"
                        borderColor="dark_4"
                        pos="absolute"
                        borderLeftRadius={"8px"}
                        top="9px"
                        bottom="9px"
                        left="1px"
                        fontSize="15px"
                        justify="center"
                        align="center"
                        color="accent_2"
                    >
                        <Text>+234</Text>
                    </Flex>
                )}
            </Box>

            <FormErrorMessage fontSize={["12px"]}>
                {errors[name]}
            </FormErrorMessage>
        </FormControl>
    );
};

export default CustomInput;
