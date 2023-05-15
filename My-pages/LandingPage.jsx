import React, { useContext, useEffect, useState } from "react";
import { Footer, HeroSlider, ProductSlider } from "@/components/Common";
import { Box } from "@chakra-ui/react";
import { baseUrl, httpGet } from "@/http-request/http-request";
import { StateContext } from "@/context/StateProvider";

const LandingPage = () => {
    const { products, setProducts,
        prodID, setProdID } = useContext(StateContext);

    const [clickedProd, setClickedProd] = useState(0)

    useEffect(() => {
        async function fetchAccessories() {
            const response = await httpGet(`${baseUrl}/store/categories`);
            // console.log("A new response is here", response.data.results);
        }

        fetchAccessories();
    }, [])
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
                <ProductSlider
                    section="Equipment & Tools"
                    productDatas={[]}
                />
            </Box>
        </Box>
    );
};

export default LandingPage;
