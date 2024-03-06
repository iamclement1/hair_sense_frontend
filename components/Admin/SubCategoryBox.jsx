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
import { MdOutlineDashboard, MdOutlineDelete } from "react-icons/md";
import { PrimaryButton } from "../Common";
import { FiEdit } from "react-icons/fi";

import { IoCheckmarkOutline } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";

const SubCategoryBox = ({ data }) => {
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(data && data.name);
    const closeEdit = () => {
        setEdit(false);
    };
    const activateEdit = () => {
        setEdit(true);
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };
    const acceptEdit = () => {

        setEdit(false);
    };
    return (
        <form>
            <Flex
                align="center"
                justify="space-between"
                // px={["17px", "27px", "47px"]}
                bgColor="white"
                py="10px"
                gap="20px"
            >
                {edit ? (
                    <Input
                        type="text"
                        required
                        bgColor={"shades_10"}
                        py="24px"
                        placeholder="Name of category"
                        value={name}
                        onChange={handleChange}
                        maxW="400px"
                    />
                ) : (
                    <Text fontSize={["18px"]} fontWeight="500">
                        {name}
                    </Text>
                )}
                {edit ? (
                    <Flex gap="20px">
                        {/* accpet changes Icon/trigger  */}
                        <Icon
                            as={IoCheckmarkOutline}
                            cursor="pointer"
                            boxSize="16px"
                            onClick={acceptEdit}
                        />
                        {/* Cancle edit mode  */}
                        <Icon
                            as={HiXMark}
                            cursor="pointer"
                            boxSize="16px"
                            onClick={closeEdit}
                        />
                    </Flex>
                ) : (
                    <Flex gap="20px">
                        {/* Edit Content Icon/trigger */}
                        <Icon
                            as={FiEdit}
                            cursor="pointer"
                            boxSize="16px"
                            onClick={activateEdit}
                        />
                        {/* Delete content Icon/trigger  */}
                        <Icon
                            as={MdOutlineDelete}
                            cursor="pointer"
                            boxSize="16px"
                        />
                    </Flex>
                )}
            </Flex>
        </form>
    );
};

export default SubCategoryBox;
