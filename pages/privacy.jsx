import Privacy from "@/My-pages/Privacy";
import Returns from "@/My-pages/Returns";
import { Layout, ScreenSize } from "@/components/layouts";
import { Box } from "@chakra-ui/react";
import React from "react";
const privacy = () => {
    return (
        <Layout>
            <ScreenSize>
                <Privacy />
            </ScreenSize>
        </Layout>
    );
};

export default privacy;
