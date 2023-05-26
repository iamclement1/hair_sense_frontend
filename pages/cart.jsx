import Cart from "@/My-pages/Cart";
import { Layout, ScreenSize } from "@/components/layouts";
import React from "react";

const cart = () => {
    return (
        <Layout title="Cart ">
            <ScreenSize>
                <Cart />
            </ScreenSize>
        </Layout>
    );
};

export default cart;
