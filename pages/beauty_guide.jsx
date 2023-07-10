import Beauty_guide from "@/My-pages/Beauty_guide";
import Faq from "@/My-pages/Faq";
import Returns from "@/My-pages/Returns";
import { Layout, ScreenSize } from "@/components/layouts";
import { Box } from "@chakra-ui/react";
import React from "react";
const beauty_guide = () => {
    return (
        <Layout>
            <ScreenSize>
                <Beauty_guide />
            </ScreenSize>
        </Layout>
    );
};

export default beauty_guide;
