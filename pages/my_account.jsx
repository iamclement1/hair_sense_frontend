import MyAccount from "@/My-pages/MyAccount";
import { Layout, ScreenSize } from "@/components/layouts";
import { Box } from "@chakra-ui/react";
import React from "react";

const my_account = () => {
    return (
        <Layout>
            <ScreenSize>
                <MyAccount />
            </ScreenSize>
        </Layout>
    );
};

export default my_account;
