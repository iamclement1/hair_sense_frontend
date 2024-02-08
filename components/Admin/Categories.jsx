
import {
    Box,
    Flex,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { PrimaryButton } from "../Common";
import CategoryBox from "./CategoryBox";
import NewSubModal from "./NewSubModal";
import { baseUrl, httpGet } from "@/http-request/http-request";
import CustomSpinner from "../Common/Spinner";
import { StateContext } from "@/context/StateProvider";
import { toast } from "react-toastify";

const Categories = () => {
    const { isOpen } = useDisclosure();
    const [catData, setCatData] = useState([]);
    const { user, isLoading, setIsLoading } = useContext(StateContext);


    useEffect(() => {

        const fetchCategory = async () => {
            setIsLoading(true);
            await httpGet(`${baseUrl}/store/categories/`, {
                headers: {
                    Authorization: `Bearer ${user}`,
                },
            })
                .then((response) => {
                    setIsLoading(false)
                    const data = response.data;
                    setCatData(data);
                })
                .catch((error) => {
                    setIsLoading(false)
                    console.log(error);
                    toast.error("Something went wrong");
                });
        }

        fetchCategory();
    }, [user, setIsLoading])

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
                            catData?.length > 0 ? (
                                <Box>
                                    {catData?.length > 0 && catData.map((item) => {
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

