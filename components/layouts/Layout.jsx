import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React, { useContext } from "react";
import Navbar from "../Common/Navbar";
import { Footer } from "../Common";
import { useRouter } from "next/router";
import { StateContext } from "@/context/StateProvider";

const Layout = ({ title, children }) => {
    const router = useRouter();
   
    // console.log(router);
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
                {router.asPath !== "/checkout" ? <Navbar /> : ""}
                <Box>{children}</Box>

                {router.asPath !== "/checkout" ? <Footer /> : ""}
            </Box>
        </>
    );
};

export default Layout;
