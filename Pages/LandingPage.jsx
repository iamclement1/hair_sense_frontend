import React from "react";
import { Footer, HeroSlider, ProductSlider } from "@/components/Common";
import { Box } from "@chakra-ui/react";
import { whatsNew } from "@/utils/dummyData";

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
