
import {
    Box,
    Flex,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../Common";
import CategoryBox from "./CategoryBox";
import NewSubModal from "./NewSubModal";
import { baseUrl, httpGet } from "@/http-request/http-request";
import CustomSpinner from "../Common/Spinner";
import Cookies from "js-cookie";

const Categories = () => {
    const { isOpen } = useDisclosure();
    const [catData, setCatData] = useState([]);
    useEffect(() => { }, []);

    const accessToken = Cookies.get("access_token");

    useEffect(() => {

        const fetchCategory = async () => {
            await httpGet(`${baseUrl}/store/categories/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    const data = response.data.results;
                    setCatData(data);
                })
                .catch((error) => {
                });
        }

        fetchCategory();
    }, [accessToken])

    const {
        isOpen: isOpenNewSubCategory,
        onOpen: onOpenNewSubCategory,
        onClose: onCloseNewSubCategory,
    } = useDisclosure();

    return (
        <>
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
                            catData && catData.length > 0 ? (
                                <Box>
                                    {catData && catData.length > 0 && catData.map((item, i) => {
                                        return <CategoryBox data={item} key={i} />;
                                    })}
                                </Box>

                            ) : (
                                <CustomSpinner />
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

// const catData = [
//     {
//         name: "Hair Styling",
//         id: 1,
//     },
//     {
//         name: "Hair Product",
//         id: 2,
//     },
//     {
//         name: "Skin Care",
//         id: 3,
//     },

//     {
//         name: "Hair Care",
//         id: 4,
//     },
//     {
//         name: "Equipments & Tools",
//         id: 5,
//     },
//     {
//         name: "Accessories",
//         id: 6,
//     },
//     {
//         name: "Cosmetics",
//         id: 7,
//     },
// ];
