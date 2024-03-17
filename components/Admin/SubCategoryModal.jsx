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
import useSubCategoryById from "@/hooks/useSubCategoryById";
import CustomSpinner from "../Common/Spinner";
import useCategory from "@/hooks/useCategory";

const SubCategoryModal = ({
    data,
    onOpen,
    onClose,
    isOpen,
    onOpenAddSubCategory,
}) => {
    const { isLoading, data: subcategorybyid } = useSubCategoryById(data?.id);

    const subCatById = subcategorybyid?.data?.data[0]?.subcategories


    if (isLoading) return <CustomSpinner />

    return (
        <Box>
            <Modal isOpen={isOpen} onClose={onClose} size="xl" >
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
                        {subCatById?.length > 0 ? (
                            <Box>
                                {subCatById?.map((item) => (
                                    <Text key={item?.id} fontSize={{ base: "14px", md: "16px", xl: "18px" }}>
                                        {item?.name}
                                    </Text>
                                ))}
                            </Box>
                        ) : (
                            <Text>No Sub Category for this Category was found</Text>
                        )}
                    </Box>


                    <Box>


                        {!true ? (
                            <SubCategoryBox data={item} key={item.id} />
                        ) : (
                            // If we have no subcategory
                            <Box>
                                <Divider mt="8px" />

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
                            </Box>
                        )}
                    </Box>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default SubCategoryModal;

