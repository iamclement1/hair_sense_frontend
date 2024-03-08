import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout, ScreenSize } from "@/components/layouts";
import { Box } from "@chakra-ui/react";
import Category from "@/My-pages/Category";
import useSubcategoryByIndex from "@/hooks/useCategoryByIndex";

const SingleCategory = () => {
    const router = useRouter();
    const { index } = router.query;
    const [categoryName, setCategoryName] = useState(null);
    const { data: categoryData, isLoading } = useSubcategoryByIndex(index);
    console.log(categoryData);

    useEffect(() => {
        if (!isLoading && categoryData) {
            // Extract the category name from the categoryData object
            setCategoryName(categoryData.data.name);
        }
    }, [isLoading, categoryData]);

    return (
        <Box>
            <Layout title={`Category || ${categoryName}`}>
                <ScreenSize>
                    <Category data={index} />
                </ScreenSize>
            </Layout>
        </Box>
    );
};
export default SingleCategory;
