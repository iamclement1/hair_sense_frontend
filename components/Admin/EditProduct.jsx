import React from "react";
import {
    Box,
    Divider,
    Flex,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
const EditProduct = ({ data, onOpen, onClose, isOpen }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent
                bgColor={"white"}
                mx={["16px"]}
                px={["16px", null, "34px"]}
                py={["38px"]}
                rounded={["12px", null, "16px"]}
            >
                <Flex align="center" justify="space-between" w="100%">
                    <Text
                        fontSize={{ base: "16px", md: "20px", xl: "25px" }}
                        fontWeight="600"
                    >
                        Edit Product
                    </Text>
                    <Icon as={FaTimes} onClick={onClose} cursor={"pointer"} />
                </Flex>
                <Divider mt="8px" />
                <Box></Box>
            </ModalContent>
        </Modal>
    );
};

export default EditProduct;
