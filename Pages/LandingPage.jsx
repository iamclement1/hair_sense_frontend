import React from "react";
import { Footer, HeroSlider, ProductSlider } from "@/components/Common";
import { Box } from "@chakra-ui/react";

const LandingPage = () => {
    return (
        <Box pt={["40px", null, "40px"]}>
            <HeroSlider />

            <Box>
                <ProductSlider section="What’s New" productDatas={whatsNew} />
            </Box>

            <Box>
                <ProductSlider
                    section="Trending Products"
                    productDatas={whatsNew}
                />
            </Box>
            <Box>
                <ProductSlider
                    section="Skin Care Product"
                    productDatas={whatsNew}
                />
            </Box>
            <Box>
                <ProductSlider section="Accessories" productDatas={whatsNew} />
            </Box>
            <Box>
                <ProductSlider section="Hair Care" productDatas={whatsNew} />
            </Box>
            <Box>
                <ProductSlider
                    section="Equipment & Tools"
                    productDatas={whatsNew}
                />
            </Box>
        </Box>
    );
};

export default LandingPage;

const whatsNew = [
    {
        id: 1,
        imageUrl: "/images/np_1.svg",
        text: "Pomegranate & Honey Moisturizing and Detangling Shampoo 355ml",
        rating: 1,
        price: "3,500",
    },
    {
        id: 2,
        imageUrl: "/images/np_2.svg",
        text: "Pomegranate & Honey Moisturizing and Detangling Shampoo 355ml",
        rating: 2,
        price: "3,500",
    },
    {
        id: 1,
        imageUrl: "/images/np_3.svg",
        text: "Pomegranate & Honey Moisturizing and Detangling Shampoo 355ml",
        rating: 3,
        price: "3,500",
    },
    {
        id: 1,
        imageUrl: "/images/shampoo_2.svg",
        text: "Pomegranate & Honey Moisturizing and Detangling Shampoo 355ml",
        rating: 4,
        price: "3,500",
    },
    {
        id: 1,
        imageUrl: "/images/scp_1.svg",
        text: "Pomegranate & Honey Moisturizing and Detangling Shampoo 355ml",
        rating: 5,
        price: "3,500",
    },
];
