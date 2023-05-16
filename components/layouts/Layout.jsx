import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Navbar from "../Common/Navbar";
import { Footer } from "../Common";
import { useRouter } from "next/router";

const Layout = ({ title, children }) => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>{title}</title>
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
            <Box>
                <Navbar />
                <Box>{children}</Box>
                <Footer />
            </Box>
        </>
    );
};

export default Layout;
