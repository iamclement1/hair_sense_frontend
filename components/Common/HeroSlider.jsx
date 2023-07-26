import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Slider from "react-slick";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

import ScreenSize from "../layouts/ScreenSize";
import { PrimaryButton } from ".";


const HeroSlider = ({ children }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
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
                display={currentSlide === 1 ? "none" : "block"}
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
                display={currentSlide === 0 ? "none" : "block"}

            />
        );
    };

    const settings = {
        autoplay: true,
        infinite: true,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        afterChange: (slideIndex) => {
            setCurrentSlide(slideIndex)
            console.log("slideIndex", slideIndex);
            console.log(currentSlide);
        },
    };

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
        title: "Find Your Favorite Facial Products",
        subTitle: "Your favorite facial product is just one click away",
        imageUrl: "/images/hero.png",
        url: "/",
    },
    {
        bgColor: "accent_4",
        title: "Beautiful Cosmetics products",
        subTitle: "Your favorite hair care product is just one click away",
        imageUrl: "/images/hero1.png",
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
                px={["1.92rem", null, "20px"]}
                py={["60px", null, "70px"]}
                rounded={"12px"}
                align={"center"}
                gap={["0.81rem", null, "20px"]}
            >
                <Flex w="50%" justify={"center"} align={"center"}>
                    <Box maxW="584px" pl={["1rem", null, "1.92rem"]}>
                        <Text
                            fontWeight={"600"}
                            fontSize={["16px", "24px", "54px", "56px"]}
                            lineHeight={["1.48594rem", null, "5.125rem"]}
                        >
                            {title}
                        </Text>
                        <Text
                            mt={["15px"]}
                            color="accent_2"
                            fontSize={["0.66044rem", null, "19px", "28px"]}
                        >
                            {subTitle}
                        </Text>

                        <Box mt={["20px", null, "3rem", null, "3rem"]}>
                            <PrimaryButton
                                text={"Discover Now"}
                                maxW="272px"
                                rounded="0.24769rem"
                                width={["fit-content", null, "17rem"]}
                            />
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
