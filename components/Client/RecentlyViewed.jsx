import { PrimaryButton, ProductSlider } from "@/components/Common";
import Badge from "@/components/Common/Badge";
import {
    Box,
    Divider,
    Flex,
    Text,
    Icon,
    Image,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";

const RecentlyViewed = ({ onToggle }) => {
    return (
        <Box>
            <Flex
                align="center"
                onClick={onToggle}
                mb="4"
                display={{ base: "flex", sm: "none", md: "none", xl: "none" }}
            >
                <FiChevronLeft />
            </Flex>
            {/* <Flex align={"center"} gap={["20px"]} px={["0px"]}>
                <Divider borderColor="accent_10" />
                <Text
                    flexShrink={0}
                    fontSize={{ base: "18px", md: "20px", xl: "30px" }}
                    fontWeight={600}
                    color="accent_2"
                >
                    Recently Viewed
                </Text>
                <Divider />
            </Flex> */}

            {/* Product Slider  */}

            <Box>
                <ProductSlider
                    section=" Recently Viewed"
                    type="other"
                    productDatas={[]}
                />
            </Box>
        </Box>
    );
};

export default RecentlyViewed;
