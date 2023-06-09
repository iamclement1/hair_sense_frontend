import Returns from "@/My-pages/Returns";
import { Layout, ScreenSize } from "@/components/layouts";
import { Box } from "@chakra-ui/react";
import React from "react";
const returns = () => {
    return (
        <Layout>
            <ScreenSize>
                <Returns />
            </ScreenSize>
        </Layout>
    );
};

export default returns;
