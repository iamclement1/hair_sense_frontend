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
    infinite: false,
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
                {heroData.map((data, i) => {
                    return <HeroContent key={i} data={data} />;
                })}
            </Slider>
            {/* <PrevArrow onClick={() => slider.current.slickPrev()} />
            <NextArrow onClick={() => slider.current.slickNext()} /> */}
        </ScreenSize>
    );
};

export default HeroSlider;
const heroData = [
    {
        bgColor: "accent_4",
        title: "Find Your Favorite Hair Care Products",
        subTitle: "Your favorite hair care product is just one click away",
        imageUrl: "/images/heroBg_1.svg",
        url: "/",
    },
    {
        bgColor: "accent_4",
        title: "Beautiful Cosmetics products",
        subTitle: "Your favorite hair care product is just one click away",
        imageUrl: "/images/heroBg_2.svg",
        url: "/",
    },
];
const HeroContent = ({ data }) => {
    const { bgColor, title, subTitle, imageUrl, url } = data;
    return (
        <Box>
            <Flex
                bgColor={bgColor}
                // px="20px"
                px={["20px", null, "20px"]}
                py={["60px", null, "70px"]}
                rounded={"12px"}
                align={"center"}
                gap="20px"
            >
                <Flex w="50%" justify={"center"} align={"center"}>
                    <Box maxW="584px">
                        <Text
                            fontWeight={"600"}
                            fontSize={["16px", "24px", "54px", "56px"]}
                        >
                            {title}
                        </Text>
                        <Text
                            mt={["15px"]}
                            color="accent_2"
                            fontSize={["14px", null, "19px", "28px"]}
                        >
                            {subTitle}
                        </Text>

                        <Box my={["20px", null, "40px", null, "80px"]}>
                            <PrimaryButton text={"Discover Now"} maxW="272px" />
                        </Box>
                    </Box>
                </Flex>
                <Box w="50%">
                    <Image src={imageUrl} alt="hero background" />
                </Box>
            </Flex>
        </Box>
    );
};
