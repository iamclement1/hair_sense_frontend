import React from "react";
import {
    Box,
    Divider,
    Flex,
    Text,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Link,
    Modal,
    ModalHeader,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Select,
} from "@chakra-ui/react";

const CartModal = () => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent
                bgColor={"white"}
                mx={["16px"]}
                px={["0px", null, "64px"]}
                py={["83px", null, "100px"]}
                rounded={["12px", null, "none"]}
            >
                <ModalCloseButton
                    border={"1px"}
                    rounded={"full"}
                    top={["20px", null, "50px"]}
                    right={["14px", null, "34px"]}
                />
            </ModalContent>
        </Modal>
    );
};

export default CartModal;
