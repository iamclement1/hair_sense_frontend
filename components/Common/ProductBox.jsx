import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const ProductBox = ({ productData }) => {
    const { id, imageUrl, text, rating, price } = productData;
    console.log(productData);

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
                        boxSize={["137px", null, null, "248px"]}
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

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
        <Flex justify={"center"} align="center">
            {[...Array(fullStars)].map((_, index) => (
                <Icon key={index} as={AiFillStar} color="yellow.500" />
            ))}
            {hasHalfStar && <Icon as={AiFillStar} color="yellow.500" mr={1} />}
            {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map(
                (_, index) => (
                    <Icon key={index} as={AiFillStar} color="gray.500" />
                )
            )}
        </Flex>
    );
};
