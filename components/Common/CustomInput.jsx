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
            <FormLabel htmlFor={name} fontSize="14px" fontWeight={600}>
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
                    fontSize={"16px"}
                    px={"20px"}
                    py="12px"
                    pr={name === "store_domain" ? "155px" : "unset"}
                    display="inline-block"
                    _focusVisible={{
                        border: "1px",
                        borderColor: "primary_500",
                    }}
                    border="1px"
                    borderColor="primary_100"
                    rounded="8px"
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

                {name === "store_domain" && (
                    <Flex
                        w="100%"
                        maxW="150px"
                        bg={"white"}
                        transform={"auto"}
                        borderLeft="1px"
                        borderColor="primary_100"
                        pos="absolute"
                        borderRightRadius={"8px"}
                        top="1px"
                        bottom="1px"
                        right="1px"
                        fontSize="12px"
                        justify="center"
                        align="center"
                        color="grey_300"
                    >
                        <Text>statamart.shop</Text>
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
