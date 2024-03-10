import {
    Box,
    Divider,
    Flex,
    Icon,
    Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import Slider from "react-slick";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import ScreenSize from "../layouts/ScreenSize";
import ProductBox from "./ProductBox";
const ProductSlider = ({
    section,
    productDatas,
    type = "default",
    children,
}) => {

    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <Icon
                aria-label="Next"
                color="accent_2"
                as={BsChevronRight}
                onClick={() => sliderRef.current.slickPrev()}
                position="absolute"
                top="50%"
                right={["0", "10px"]}
                transform="translateY(-50%)"
                zIndex="1"
                boxSize={["20px", "30px"]}
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
                boxSize={["20px", "30px"]}
                cursor={"pointer"}
            />
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },

            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    const sliderRef = useRef(null);
    //product data

    const handleProduct = (id) => {
        // alert("Product Id === ", id);
    };
    return (
        <ScreenSize>
            {/* Default Header for product slider  */}
            {type === "default" ? (
                <Box
                    mt={["80px", null, null, "100px"]}
                    mb={["40px", null, null, "80px"]}
                >
                    <Text
                        color="accent_2"
                        fontSize={{ base: "18px", md: "20px", xl: "30px" }}
                        mb="12px"
                        fontWeight={600}
                    >
                        {section}
                    </Text>
                    <Divider borderColor={"accent_2"} opacity={"20%"} />
                </Box>
            ) : type === "other" ? (
                <Box
                    mt={["80px", null, null, "100px"]}
                    mb={["40px", null, null, "80px"]}
                >
                    <Flex align={"center"} gap={["20px"]} px={["0px"]}>
                        <Divider />
                        <Text
                            flexShrink={0}
                            fontSize={{ base: "18px", md: "20px", xl: "30px" }}
                            fontWeight={600}
                            color="accent_2"
                        >
                            {section}
                        </Text>
                        <Divider />
                    </Flex>
                </Box>
            ) : (
                ""
            )}

            {/*  Header for product slider which type is === "others"  */}
            <Box>
                {!productDatas ? (
                    <Text fontSize={'24px'} fontWeight={500}> Products not Available </Text>
                ) : (
                    <Slider {...settings} ref={sliderRef}>
                        {productDatas?.map((product) => {
                            product.quantity = 1;
                            return (
                                <ProductBox
                                    key={product.id}
                                    productData={product}
                                    onClick={() => {
                                        handleProduct(product.id)
                                        alert(product.id)
                                    }
                                    }
                                />
                            );
                        })}
                    </Slider>
                )}
            </Box>
        </ScreenSize>
    );
};

export default ProductSlider;
