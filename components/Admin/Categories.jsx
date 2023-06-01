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
import CreateCategoryModal from "./CreateCategoryModal";
import { IoCheckmarkOutline } from "react-icons/io5";
import { HiXMark } from "react-icons/hi2";

const Categories = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <CreateCategoryModal
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            />
            <Box>
                <Flex align="center" justify="space-between" gap="20px">
                    <Box>
                        <Text fontSize={["24px"]} fontWeight="600">
                            Categories
                        </Text>
                        <Text mt={["10px", null, "16px"]}>
                            A list of all product category.
                        </Text>
                    </Box>
                    <Box>
                        <PrimaryButton text="Create" handleButton={onOpen} />
                    </Box>
                </Flex>

                <Box mt="50px">
                    <Box rounded="16px" overflow="hidden">
                        <Box
                            py="20px"
                            bgColor="shades_9"
                            px={["17px", "27px", "47px"]}
                        >
                            <Text fontWeight="600" fontSize={["16px", "18px"]}>
                                Name
                            </Text>
                        </Box>

                        {/* Categories */}

                        <Box>
                            {!true ? (
                                <Flex
                                    px={["17px", "27px", "47px"]}
                                    bgColor="white"
                                    py="24px"
                                    align="center"
                                    justify="center"
                                >
                                    <Text>No Categories listed</Text>
                                </Flex>
                            ) : (
                                <>
                                    {catData.map((item, i) => {
                                        return (
                                            <Box
                                                key={i}
                                                _notLast={{
                                                    borderBottom: "1px",
                                                    borderBottomColor:
                                                        "shades_8",
                                                }}
                                                borderColor={"shades_9"}
                                            >
                                                <CategoryBox data={item} />
                                            </Box>
                                        );
                                    })}
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Categories;

const CategoryBox = ({ data }) => {
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
        console.log(name);
        setEdit(false);
    };
    return (
        <form>
            <Flex
                align="center"
                justify="space-between"
                px={["17px", "27px", "47px"]}
                bgColor="white"
                py="24px"
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
                            boxSize="18px"
                            onClick={acceptEdit}
                        />
                        {/* Cancle edit mode  */}
                        <Icon
                            as={HiXMark}
                            cursor="pointer"
                            boxSize="18px"
                            onClick={closeEdit}
                        />
                    </Flex>
                ) : (
                    <Flex gap="20px">
                        {/* Edit Content Icon/trigger */}
                        <Icon
                            as={FiEdit}
                            cursor="pointer"
                            boxSize="18px"
                            onClick={activateEdit}
                        />
                        {/* Delete content Icon/trigger  */}
                        <Icon
                            as={MdOutlineDelete}
                            cursor="pointer"
                            boxSize="18px"
                        />
                    </Flex>
                )}
            </Flex>
        </form>
    );
};

const catData = [
    {
        name: "Hair Styling",
        id: 1,
    },
    {
        name: "Skin Care",
        id: 1,
    },
    {
        name: "Equipments & Tools",
        id: 1,
    },
    {
        name: "Accessories",
        id: 1,
    },
];
