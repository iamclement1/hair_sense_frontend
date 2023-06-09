import React from "react";
import { useRouter } from "next/router";
import { Layout, ScreenSize } from "@/components/layouts";
import { Box } from "@chakra-ui/react";
import Category from "@/My-pages/Category";

const SingleCategory = () => {
    const router = useRouter();
    const { index } = router.query;
    console.log("index", index);
    return (
        <Box>
            <Layout title={`category || ${index}`}>
                <ScreenSize>
                    <Category data={index} />
                </ScreenSize>
            </Layout>
        </Box>
    );
};
export default SingleCategory;
