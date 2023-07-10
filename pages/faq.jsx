import Faq from "@/My-pages/Faq";
import Returns from "@/My-pages/Returns";
import { Layout, ScreenSize } from "@/components/layouts";
import { Box } from "@chakra-ui/react";
import React from "react";
const faq = () => {
    return (
        <Layout>
            <ScreenSize>
                <Faq />
            </ScreenSize>
        </Layout>
    );
};

export default faq;
