import OrderDetails from "@/My-pages/OrderDetails";
import { Layout, ScreenSize } from "@/components/layouts";
import { Box } from "@chakra-ui/react";
import React from "react";

const order_details = () => {
    return (
        <Layout title="Hair Sense Favortie page">
            <ScreenSize>
                <OrderDetails />
            </ScreenSize>
        </Layout>
    );
};

export default order_details;
