

import Privacy from "@/My-pages/Privacy";
import Returns from "@/My-pages/Returns";
import Shipping from "@/My-pages/Shipping";
import { Layout, ScreenSize } from "@/components/layouts";
import { Box } from "@chakra-ui/react";
import React from "react";
const shipping = () => {
    return (
        <Layout>
            <ScreenSize>
                <Shipping />
            </ScreenSize>
        </Layout>
    );
};

export default shipping;
