import useMutationAllAdmin from "@/hooks/useMutationAllAdmin";
import {
    Box,
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import CustomSpinner from "../Common/Spinner";

const AdminMode = ({ title, textContent, rowData }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const { handleAdmin, isPending } = useMutationAllAdmin(rowData?.id);

    const payload = {
        email: rowData?.email,
        firstName: rowData?.firstName,
        lastName: rowData?.lastName,
        phone: rowData?.phone,
        role: rowData?.role,
    }

    const handleDeleteAdmin = (id) => {
        handleAdmin(payload)
        onClose();
    };

    const handleEnableAdmin = (id) => {
        handleAdmin(payload)
        onClose();
    };

    const handleDisableAdmin = (id) => {
        handleAdmin(payload)
        onClose();
    };

    if (isPending) return <CustomSpinner />
    return (
        <Box>
            <Button
                onClick={onOpen}
                h="auto"
                fontSize={"12px"}
                py="7px"
                px="26px"
                bgColor={
                    title === "Enable"
                        ? "#CFF8E1"
                        : title === "Disable"
                            ? "#DFDAAD"
                            : title === "Delete"
                                ? "#FFE4E3"
                                : ""
                }
                color={
                    title === "Enable"
                        ? "#30C263"
                        : title === "Disable"
                            ? "#A79A25"
                            : title === "Delete"
                                ? "#DE1A1A"
                                : ""
                }
                rounded="20px"
                border="1px"
                borderColor={title === "Disable" ? "#CCCCCC99" : "transparent"}
                _focus={{}}
                _active={{}}
                _focusVisible={{}}
                _hover={{ opacity: ".8" }}
            >
                {title === "Enable"
                    ? "Enable"
                    : title === "Disable"
                        ? "Disable"
                        : title === "Delete"
                            ? "Delete"
                            : ""}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
                <ModalOverlay />
                <ModalContent
                    bgColor={"white"}
                    mx={["16px"]}
                    px={["16px", null, "20px"]}
                    py={["38px"]}
                    rounded={["12px", null, "16px"]}
                >
                    <ModalBody>
                        <Box>
                            <Text
                                color="#333333"
                                fontSize={"24px"}
                                fontWeight={"900"}
                            >
                                {title} Admin
                            </Text>
                            <Text color="#333333" fontSize={"18px"} mt="16px">
                                {textContent}
                            </Text>
                        </Box>
                        <Flex mt="40px" align="center" gap={"24px"}>
                            <Button
                                maxW="fit-content"
                                py="12.5px"
                                px="34px"
                                bg="transparent"
                                rounded="6px"
                                border="1px"
                                borderColor={"#333333"}
                                color="#333333"
                                _hover={{}}
                                _active={{}}
                                _focus={{}}
                                onClick={onClose}
                                w="122px"
                            >
                                {" "}
                                Cancel{" "}
                            </Button>{" "}
                            <Button
                                maxW="fit-content"
                                py="12.5px"
                                px="34px"
                                bg="primary_1"
                                rounded="6px"
                                color="white"
                                _hover={{}}
                                _active={{}}
                                _focus={{}}
                                onClick={() => {
                                    if (title === "Delete") {
                                        handleDeleteAdmin(rowData?.id);
                                    } else if (title === "Enable") {
                                        handleEnableAdmin(rowData?.id);
                                    } else if (title === "Disable") {
                                        handleDisableAdmin(rowData?.id);
                                    }
                                    onClose();
                                }}
                                w="122px"
                            >
                                Yes
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default AdminMode;
