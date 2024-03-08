import {
    Box,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Link,
    SimpleGrid,
    Text,
    Icon,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { FaChevronDown } from "react-icons/fa";
import useCategory from "@/hooks/useCategory";
import useSubCategoryById from "@/hooks/useSubCategoryById";
import CustomSpinner from "./Spinner";

const NavDropDown = () => {
    return (
        <Box>
            <DesktopMenu />
        </Box>
    );
};

export default NavDropDown;


const DesktopMenu = () => {

    const { data } = useCategory();
    const categories = data?.data?.data;

    return (
        <Flex
            align={"center"}
            justify={"space-between"}
            pb="20px"
            display={["none", null, null, "flex"]}
        >
            {categories?.map((item) => (
                <Box key={item?.id}>
                    <CategoryMenu category={item} />
                </Box>
            ))}
        </Flex>
    );
};

const CategoryMenu = ({ category }) => {
    const { data: subcategories, isLoading } = useSubCategoryById(category?.id);

    const subCat = subcategories?.data?.data?.subcategories

    if (isLoading) return <CustomSpinner />;


    return (
        <Menu placement="bottom-end">
            <MenuButton color={"accent_1"}>
                <Flex align={"center"} gap="10px">
                    <Text color={"accent_2"}>{category?.name} </Text>
                    <Icon
                        as={FaChevronDown}
                        boxSize={"12px"}
                        color={"accent_2"}
                    />
                </Flex>
            </MenuButton>
            <MenuList
                width={{ base: "100%", md: "800px" }}
                borderRadius={"none"}
                zIndex={100}
            >
                <Box px="20px" py="20px">
                    <Text
                        fontWeight={"600"}
                        fontSize={"20px"}
                        mb="10px"
                    >
                        {category?.name}
                    </Text>
                    <SimpleGrid spacingX={"12px"}>
                        {subCat?.map((subItem) => {
                            return (
                                <MenuItem
                                    key={subItem.id}
                                    as={NextLink}
                                    href={`/categories/${subItem?.id}`}
                                    color={"accent_2"}
                                >
                                    {subItem?.name}
                                </MenuItem>
                            );
                        })}
                    </SimpleGrid>
                </Box>
            </MenuList>
        </Menu>
    );
};
