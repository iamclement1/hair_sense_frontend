
import {
    Box,
    Flex,
    Icon,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import {
    MdAddCircleOutline, MdOutlineDeleteOutline,
} from "react-icons/md";
import { FiEye } from "react-icons/fi";

import SubCategoryModal from "./SubCategoryModal";
import CreateSubCategoryModal from "./CreateSubCategoryModal";
import DeleteCategory from "./DeleteCategory";

const CategoryBox = ({ data }) => {

    const {
        isOpen: isOpenSubCategory,
        onOpen: onOpenSubCategory,
        onClose: onCloseSubCategory,
    } = useDisclosure();

    const {
        isOpen: isOpenAddSubCategory,
        onOpen: onOpenAddSubCategory,
        onClose: onCloseAddSubCategory,
    } = useDisclosure();

    const {
        isOpen: isOpenDeleteCategory,
        onOpen: onOpenDeleteCategory,
        onClose: onCloseDeleteCategory,
    } = useDisclosure();

    return (
        <Box
            _notLast={{
                borderBottom: "1px",
                borderBottomColor: "shades_8",
            }}
            borderColor={"shades_9"}
        >
            {/* <form> */}
            <Flex
                align="center"
                justify="space-between"
                px={["17px", "27px", "47px"]}
                bgColor="white"
                py="24px"
                gap="20px"
            >
                <Text fontSize={["18px"]} fontWeight="500">
                    {data?.name}
                </Text>

                <Flex gap="20px">
                    <Icon
                        as={FiEye}
                        cursor="pointer"
                        boxSize="18px"
                        onClick={onOpenSubCategory}
                    />

                    <Icon
                        as={MdAddCircleOutline}
                        cursor="pointer"
                        boxSize="18px"
                        onClick={onOpenAddSubCategory}
                    />
                    <Icon
                        as={MdOutlineDeleteOutline}
                        cursor="pointer"
                        boxSize="18px"
                        onClick={onOpenDeleteCategory}
                    />
                </Flex>
            </Flex>
            {/* Sub Category Modal for each categories, subCategory Data will be pass as props for each Category */}
            <SubCategoryModal
                data={data}
                isOpen={isOpenSubCategory}
                onOpen={onOpenSubCategory}
                onClose={onCloseSubCategory}
                onOpenAddSubCategory={onOpenAddSubCategory}
            />
            {/* Create Sub category modal */}
            <CreateSubCategoryModal
                Categoryname={data?.name}
                Categoryid={data?.id}
                isOpen={isOpenAddSubCategory}
                onOpen={onOpenAddSubCategory}
                onClose={onCloseAddSubCategory}
            />

            {/* Delete Category */}
            <DeleteCategory
                data={data}
                isOpen={isOpenDeleteCategory}
                onOpen={onOpenDeleteCategory}
                onClose={onCloseDeleteCategory}
            />
            {/* </form> */}
        </Box>
    );
};

export default CategoryBox;
