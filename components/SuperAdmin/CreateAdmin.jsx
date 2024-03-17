import {
    Box,
    Button,
    Divider,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import CreateAdminForm from "./CreateAdminForm";

const CreateAdmin = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <Box>
            <Button
                onClick={onOpen}
                bgColor={"primary_1"}
                color={"white"}
                _hover={{}}
                mr="1rem"
            >
                <Text fontSize="0.775rem">Create Admin</Text>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="2xl">
                <ModalOverlay />
                <ModalContent
                    bgColor={"white"}
                    mx={["16px"]}
                    px={["0px", null, "50px"]}
                    py={["83px", null, "100px"]}
                    rounded={["12px", null, "none"]}
                >
                    <ModalCloseButton
                        border={"1px"}
                        rounded={"full"}
                        top={["20px", null, "50px"]}
                        right={["14px", null, "34px"]}
                    />
                    <Box
                        bgColor={""}
                        pos={"relative"}
                        w={"100%"}
                        maxW={["100%", null, "100%", "533px"]}
                        mx="auto"
                    >
                        {" "}
                        <Flex align={"center"} gap={["20px"]} px={["0px"]}>
                            <Divider />
                            <Text
                                flexShrink={0}
                                fontSize="i9px"
                                fontWeight={600}
                                color="accent_2"
                            >
                                Create An Account
                            </Text>
                            <Divider />
                        </Flex>
                        <Box
                            mt={["0px", null, "40px"]}
                            pt={["24px", null, "34px"]}
                            pb={["0px", null, "54px"]}
                            border={"1px"}
                            borderColor={["transparent", null, "dark_1"]}
                            rounded={"12px"}
                            px={["20px", null, "30px"]}
                        >
                            <CreateAdminForm />
                        </Box>
                    </Box>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default CreateAdmin;
