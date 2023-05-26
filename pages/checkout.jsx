import CheckoutPage from "@/My-pages/CheckoutPage";
import { Layout, ScreenSize } from "@/components/layouts";
import React from "react";

const checkout = () => {
    return (
        <Layout title="Hair Sense Checkout page">
            {/* <ScreenSize> */}
            <CheckoutPage />
            {/* </ScreenSize> */}
        </Layout>
    );
};

export default checkout;
