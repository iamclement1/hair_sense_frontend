import DeliveryInfo from "@/My-pages/DeliveryInfo";
import { Layout, ScreenSize } from "@/components/layouts";
import { Box, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";

const delivery_info = () => {
    return (
        <Layout>
            <ScreenSize>
                <DeliveryInfo />
            </ScreenSize>
        </Layout>
    );
};

export default delivery_info;
