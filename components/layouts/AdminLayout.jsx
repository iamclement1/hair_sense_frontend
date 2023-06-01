import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

import { useRouter } from "next/router";

const AdminLayout = ({ children }) => {
    return (
        <>
            <Head>
                <title> Admin Page || Hair Sense </title>
                <meta
                    name="description"
                    content="Hair Sense Ecommerce Website"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/images/favicon.svg" />
            </Head>
            <Box>{children}</Box>
        </>
    );
};

export default AdminLayout;
