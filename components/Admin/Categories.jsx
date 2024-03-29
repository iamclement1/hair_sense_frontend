
import {
    Box,
    Flex,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { PrimaryButton } from "../Common";
import CategoryBox from "./CategoryBox";
import NewSubModal from "./NewSubModal";
import CustomSpinner from "../Common/Spinner";
import useCategory from "@/hooks/useCategory";

const Categories = () => {
    const { isOpen } = useDisclosure();
    const { isLoading, data } = useCategory();
    const categories = (data?.data?.data)

    const {
        isOpen: isOpenNewSubCategory,
        onOpen: onOpenNewSubCategory,
        onClose: onCloseNewSubCategory,
    } = useDisclosure();

    return (
        <>
            {isLoading && <CustomSpinner />}
            <Box pb="100px">
                <Flex align="center" justify="space-between" gap="20px">
                    <Box>
                        <Text fontSize={["24px"]} fontWeight="600">
                            Categories
                        </Text>
                        <Text mt={["10px", null, "16px"]}>
                            A list of all product category.
                        </Text>
                    </Box>
                </Flex>

                <Flex align="center" justify="flex-end">
                    <PrimaryButton
                        maxW="190px"
                        text="Create Category"
                        align="center"
                        marginTop="20px"
                        isOpen={isOpen}
                        handleButton={onOpenNewSubCategory}
                    />
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

                        {
                            categories?.length > 0 ? (
                                <Box>
                                    {categories?.length > 0 && categories.map((item) => {
                                        return <CategoryBox data={item} key={item?.id} />;
                                    })}
                                </Box>

                            ) : (
                                // <CustomSpinner />
                                <Text>No Category Found</Text>
                            )
                        }

                    </Box>
                </Box>
            </Box>
            {/* New Categories */}
            <NewSubModal
                isOpen={isOpenNewSubCategory}
                onOpen={onOpenNewSubCategory}
                onClose={onCloseNewSubCategory}
            />
        </>
    );
};

export default Categories;

