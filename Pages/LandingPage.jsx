import React, { useEffect, useState } from "react";
import { Footer, HeroSlider, ProductSlider } from "@/components/Common";
import { Box } from "@chakra-ui/react";
import { baseUrl, httpGet } from "@/http-request/http-request";
import { whatsNew } from "@/utils/dummyData";

const LandingPage = () => {
    const [produts, setProduts] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            const response = await httpGet(`${baseUrl}/store/products`);
            setProduts(response);
            console.log("Response is here", response);
        }
        if (!produts) {
            fetchProduct();
        }
    }, [produts]);
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
