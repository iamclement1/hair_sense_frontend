import AdminLayout from "@/components/layouts/AdminLayout";
import {
    Box,
    Flex,
    Image,
    Link,
    Icon,
    Text,
    useDisclosure,
    Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";
import {
    MdAdd,
    MdAddCircleOutline,
    MdOutlineDashboard,
    MdOutlineDelete,
} from "react-icons/md";
import { PrimaryButton } from "../Common";
import { FiEdit, FiEye } from "react-icons/fi";

import { IoCheckmarkOutline } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";
import SubCategoryModal from "./SubCategoryModal";
import CreateSubCategoryModal from "./CreateSubCategoryModal";
import NewSubModal from "./NewSubModal";

const CategoryBox = ({ data }) => {
    const [name, setName] = useState(data && data.name);
    const [id, setId] = useState(data && data.id);
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
                    {name}
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
                Categoryname={name}
                Categoryid={id}
                isOpen={isOpenAddSubCategory}
                onOpen={onOpenAddSubCategory}
                onClose={onCloseAddSubCategory}
            />
          
            {/* </form> */}
        </Box>
    );
};

export default CategoryBox;
