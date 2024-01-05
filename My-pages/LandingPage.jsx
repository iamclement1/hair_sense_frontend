import React, { useContext, useEffect } from "react";
import { HeroSlider, ProductSlider } from "@/components/Common";
import { Box } from "@chakra-ui/react";
import { baseUrl, httpGet } from "@/http-request/http-request";
import { CartContext, StateContext } from "@/context/StateProvider";

const LandingPage = () => {
    const { products } =
        useContext(StateContext);



    useEffect(() => {
        async function fetchAccessories() {
            const response = await httpGet(`${baseUrl}/store/categories`);

        }

        fetchAccessories();
    }, []);
    //cart context
    const GlobalCart = useContext(CartContext);

    return (
        <Box pt={["40px", null, "40px"]}>
            <HeroSlider />

            <Box>
                <ProductSlider section="What’s New" productDatas={products} />
            </Box>

            <Box>
                <ProductSlider
                    section="Trending Products"
                    productDatas={products}
                />
            </Box>
            <Box>
                <ProductSlider
                    section="Skin Care Product"
                    productDatas={products}
                />
            </Box>
            <Box>
                <ProductSlider section="Accessories" productDatas={products} />
            </Box>
            <Box>
                <ProductSlider section="Hair Care" productDatas={products} />
            </Box>
            <Box>
                <ProductSlider section="Equipment & Tools" productDatas={[]} />
            </Box>
        </Box>
    );
};

export default LandingPage;
