import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";

import { BsHeart, BsHeartFill } from "react-icons/bs";
import { StarRating } from ".";

const ProductBox = ({ productData }) => {
    const { id, imageUrl, text, rating, price } = productData;

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
                        src={imageUrl}
                        alt={text}
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
                <Box mt="19px">
                    <Text fontSize={["13px", null, "14px", "16px"]}>
                        {text}
                    </Text>
                    <Box mt="13px">
                        {/* <Icon as={AiFillStar} /> */}
                        <StarRating rating={rating} />
                    </Box>
                    <Text
                        mt="10px"
                        fontSize={["18px", null, "24px"]}
                        fontWeight={600}
                    >
                        ₦{price}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductBox;
