import { Box, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ScreenSize from "../layouts/ScreenSize";

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <Icon
            aria-label="Next"
            color="accent_2"
            as={FaChevronRight}
            onClick={onClick}
            position="absolute"
            top="50%"
            right={["0", "10px"]}
            transform="translateY(-50%)"
            zIndex="1"
            boxSize={"40px"}
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
            as={FaChevronLeft}
            onClick={onClick}
            position="absolute"
            top="50%"
            left={["0", "10px"]}
            transform="translateY(-50%)"
            zIndex="1"
            boxSize={"40px"}
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
                    <Box h="695px" bgColor="red">
                        Slide 1
                    </Box>
                </Box>
                <Box>
                    <Box h="695px" bgColor="green">
                        Slide 2
                    </Box>
                </Box>
                <Box>
                    <Box h="695px" bgColor="yellow">
                        Slide 3
                    </Box>
                </Box>
            </Slider>
            {/* <PrevArrow onClick={() => slider.current.slickPrev()} />
            <NextArrow onClick={() => slider.current.slickNext()} /> */}
        </ScreenSize>
    );
};

export default HeroSlider;
