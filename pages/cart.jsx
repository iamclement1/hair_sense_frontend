import Cart from "@/My-pages/Cart";
import { Layout, ScreenSize } from "@/components/layouts";
import React from "react";

const cart = () => {
    return (
        <Layout title="Hair Sense Cart page">
            <ScreenSize>
                <Cart />
            </ScreenSize>
        </Layout>
    );
};

export default cart;
