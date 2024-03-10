import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout, ScreenSize } from "@/components/layouts";
import { Box } from "@chakra-ui/react";
import Category from "@/My-pages/Category";
import useSubcategoryByIndex from "@/hooks/useCategoryByIndex";
import CustomSpinner from "@/components/Common/Spinner";

const SingleCategory = () => {
    const router = useRouter();
    const { index } = router.query;

    const { data: categoryData, isLoading } = useSubcategoryByIndex(index);
    if (isLoading) return <CustomSpinner />
    const subCatNames = categoryData?.data?.data
    const subCat = (categoryData?.data?.data);

    return (
        <Box>
            <Layout title={`Category || ${subCatNames?.name}`}>
                <ScreenSize>
                    <Category data={subCat} subCategoryName={subCatNames?.name} />
                </ScreenSize>
            </Layout>
        </Box>
    );
};
export default SingleCategory;
