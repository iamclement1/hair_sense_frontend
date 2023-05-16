import React, { useContext, useEffect, useState } from "react";
import { Footer, HeroSlider, ProductSlider } from "@/components/Common";
import { Box } from "@chakra-ui/react";
import { baseUrl, httpGet } from "@/http-request/http-request";
import { StateContext } from "@/context/StateProvider";
import axios from "axios";

const LandingPage = () => {
    const { products, setProducts, prodID, setProdID } =
        useContext(StateContext);

    const [clickedProd, setClickedProd] = useState(0);

    useEffect(() => {
        async function fetchAccessories() {
            const response = await httpGet(`${baseUrl}/store/categories`);
            // console.log("A new response is here", response);
        }

        fetchAccessories();
    }, []);

    useEffect(() => {
        async function fetchProduct() {
            const response = await axios.get(`${baseUrl}/store/products`);
            if (response && response.data && response.status === 200) {
                setProducts(response && response.data && response.data.results);
            }
            // console.log(
            //     "Response is here",
            //     response &&
            //         response.data &&
            //         response.data.data &&
            //         response.data.data.results
            // );
            setProducts(
                response &&
                    response.data &&
                    response.data.data &&
                    response.data.data.results
            );
            // console.log(
            //     "product data fetched is here mf",
            //     response.data.results
            // );
        }
        if (!products) {
            fetchProduct();
        }
    }, [products, setProducts]);

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
