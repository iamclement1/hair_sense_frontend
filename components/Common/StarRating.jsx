import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { AiFillStar } from "react-icons/ai";

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return (
        <Flex justify={""} align="center">
            {/* {[...Array(fullStars)].map((_, index) => (
                <Icon key={index} as={AiFillStar} color="yellow.500" />
            ))}
            {hasHalfStar && <Icon as={AiFillStar} color="yellow.500" mr={1} />}
            {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map(
                (_, index) => (
                    <Icon key={index} as={AiFillStar} color="gray.500" />
                )
            )} */}
        </Flex>
    );
};

export default StarRating;
