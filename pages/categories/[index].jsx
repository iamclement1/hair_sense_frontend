import React from "react";
import { useRouter } from "next/router";
import { Layout, ScreenSize } from "@/components/layouts";
import { Box } from "@chakra-ui/react";

const SingleCategory = () => {
    const router = useRouter();
    const { index } = router.query;
    return (
        <Box>
            <Layout title={`category || ${index}`}>
                <ScreenSize>{index}</ScreenSize>
            </Layout>
        </Box>
    );
};
export default SingleCategory;
