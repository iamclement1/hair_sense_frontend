import {
    Box,
    Flex,
    Icon,
    IconPrimaryButton,
    Image,
    Text,
} from "@chakra-ui/react";
import React from "react";
import Slider from "react-slick";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

import ScreenSize from "../layouts/ScreenSize";
import { PrimaryButton } from ".";

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <Icon
            aria-label="Next"
            color="accent_2"
            as={BsChevronRight}
            onClick={onClick}
            position="absolute"
            top="50%"
            right={["0", "10px"]}
            transform="translateY(-50%)"
            zIndex="1"
            boxSize={["20px", null, "20px", "40px"]}
            cursor={"pointer"}
        />
    );
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <Icon
            aria-label="Previous"
            color="accent_2"
            as={BsChevronLeft}
            onClick={onClick}
            position="absolute"
            top="50%"
            left={["0", "10px"]}
            transform="translateY(-50%)"
            zIndex="1"
            boxSize={["20px", null, "20px", "40px"]}
            cursor={"pointer"}
        />
    );
};

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
};

const HeroSlider = ({ children }) => {
    return (
        <ScreenSize>
            <Slider {...settings}>
                <Box>
                    <Flex
                        bgColor={"accent_4"}
                        px="20px"
                        py={["60px", null, "0px"]}
                        rounded={"12px"}
                    >
                        <Flex w="50%" justify={"center"} align={"center"}>
                            <Box maxW="584px">
                                <Text
                                    fontWeight={"600"}
                                    fontSize={["16px", "24px", "54px", "64px"]}
                                >
                                    Find Your Favorite Hair Care Products
                                </Text>
                                <Text
                                    mt={["15px"]}
                                    color="accent_2"
                                    fontSize={["10px", null, "15px", "28px"]}
                                >
                                    Your favorite hair care product is just one
                                    click away
                                </Text>
                                <PrimaryButton>Discover Now</PrimaryButton>
                            </Box>
                        </Flex>
                        <Box w="50%">
                            <Image
                                src="/images/heroBg.svg"
                                alt="hero background"
                            />
                        </Box>
                    </Flex>
                </Box>
                <Box></Box>
            </Slider>
            {/* <PrevArrow onClick={() => slider.current.slickPrev()} />
            <NextArrow onClick={() => slider.current.slickNext()} /> */}
        </ScreenSize>
    );
};

export default HeroSlider;
