import React from "react";
import ProductDetails from "@/My-pages/ProductDetails";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Layout, ScreenSize } from "@/components/layouts";

const Product_details = () => {
    const router = useRouter();
    // const { product } = router.query;
    console.log(router.query);
    // const singleProductData = product
    //     ? JSON.parse(decodeURIComponent(product))
    //     : null;
    return (
        <Box>
            <Layout title={``}>
                <ScreenSize>
                    <ProductDetails productName={''} />
                </ScreenSize>
            </Layout>
        </Box>
    );
};

export default Product_details;
