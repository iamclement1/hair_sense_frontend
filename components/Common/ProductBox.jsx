import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";

import { BsHeart, BsHeartFill } from "react-icons/bs";
import { StarRating } from ".";

const ProductBox = ({ productData }) => {
    // const { id, imageUrl, text, rating, price } = productData;
    const {
        id,
        name,
        actual_price,
        sales_price,
        first_description,
        product_img,
    } = productData;

    return (
        <Box>
            <Box
                cursor={"pointer"}
                bgColor=""
                maxW="285px"
                textAlign={"center"}
                mx="auto"
            >
                <Box w="100%" maxW="247px" pos={"relative"}>
                    <Image
                        mx="auto"
                        boxSize={["137px", null, "200px", "247px"]}
                        objectFit="cover"
                        src={product_img}
                        display="inline-block"
                        alt={name}
                        fallbackSrc="https://via.placeholder.com/150"
                    />
                    <Icon
                        as={!true ? BsHeartFill : BsHeart}
                        cursor={"pointer"}
                        color={!true ? "primary_1" : "accent_2"}
                        pos={"absolute"}
                        top={0}
                        right={2}
                    />
                </Box>
                <Box mt="19px" textAlign="center">
                    <Text fontSize={["13px", null, "14px", "16px"]}>
                        {name}
                    </Text>
                    <Flex mt="13px" justify="center">
                        {/* <Icon as={AiFillStar} /> */}
                        <StarRating rating={3.5} />
                    </Flex>
                    <Text
                        mt="10px"
                        fontSize={["18px", null, "24px"]}
                        fontWeight={600}
                    >
                        ₦{actual_price}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductBox;
