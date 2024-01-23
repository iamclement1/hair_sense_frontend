import React, { useContext, useEffect } from "react";
import { HeroSlider, ProductSlider } from "@/components/Common";
import { Box } from "@chakra-ui/react";
import { CartContext, StateContext } from "@/context/StateProvider";
import { useRouter } from "next/router";

const LandingPage = () => {
    const { products } =
        useContext(StateContext);
    let role;
    const router = useRouter();

    if (typeof window !== 'undefined') {
        role = sessionStorage.getItem("role");
    }

    useEffect(() => {
        if (role === 'admin') {
            router.push("/admin");
        }
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
