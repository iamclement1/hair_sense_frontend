import Contact from "@/My-pages/Contact";
import { Layout, ScreenSize } from "@/components/layouts";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const contact = () => {
    return (
        <Layout>
            <ScreenSize>
                <Contact />
            </ScreenSize>
        </Layout>
    );
};

export default contact;
