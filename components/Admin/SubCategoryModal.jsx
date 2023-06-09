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
import React from "react";
import { FaTimes } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import SubCategoryBox from "./SubCategoryBox";

const SubCategoryModal = ({
    data,
    onOpen,
    onClose,
    isOpen,
    onOpenAddSubCategory,
}) => {
    return (
        <Box>
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
                            {data?.name}
                        </Text>
                        <Icon
                            as={FaTimes}
                            onClick={onClose}
                            cursor={"pointer"}
                        />
                    </Flex>
                    <Divider mt="8px" />
                    <Box minH="60vh">
                        {!true ? (
                            <>
                                {dummySubItem.map((item, i) => {
                                    return (
                                        <SubCategoryBox data={item} key={i} />
                                    );
                                })}
                            </>
                        ) : (
                            // If we have no subcategory
                            <Flex
                                align={"center"}
                                mt="20px"
                                color="primary_1"
                                cursor={"pointer"}
                                maxW={"fit-content"}
                                fontSize={"14px"}
                                gap="5px"
                                onClick={() => {
                                    onClose();
                                    onOpenAddSubCategory();
                                }}
                            >
                                <Icon as={MdAdd} boxSize={"20px"} />
                                <Text>Add Sub categories</Text>
                            </Flex>
                        )}
                    </Box>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default SubCategoryModal;

const dummySubItem = [
    { name: "Shampoo", id: "1223" },
    { name: "Hair cream", id: "1253" },
    { name: "Detanglers", id: "253" },
    { name: "Styling Pomades", id: "253" },
    { name: "Sprays", id: "253" },
    { name: "Hair Tonic", id: "253" },
];
