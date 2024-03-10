import React, { useEffect } from "react";
import { HeroSlider, ProductSlider } from "@/components/Common";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useCategory from "@/hooks/useCategory";
import useCategoryById from "@/hooks/useCategoryById";
import CustomSpinner from "@/components/Common/Spinner";

const LandingPage = () => {

    let role;
    const router = useRouter();

    if (typeof window !== 'undefined') {
        role = sessionStorage.getItem("role");
    }

    useEffect(() => {
        if (role === 'admin') {
            router.push("/admin");
        }
    }, [role, router]);

    const { data: categoriesData } = useCategory();

    return (
        <Box pt={["40px", null, "40px"]}>
            <HeroSlider />

            {/* Render product sliders for each category */}
            {categoriesData?.data?.data?.map((category) => (
                <CategoryProductSlider key={category.id} categoryId={category.id} categoryName={category.name} />
            ))}
        </Box>
    );
};

const CategoryProductSlider = ({ categoryId, categoryName }) => {
    const { data: categoryProductData, isLoading } = useCategoryById(categoryId);
    const categoryProducts = categoryProductData?.data?.data?.products;

    if (isLoading) return <CustomSpinner />

    // Render category name only if products are available
    if (categoryProducts?.length > 0) {
        return (
            <Box>
                <ProductSlider section={categoryName} productDatas={categoryProducts} />
            </Box>
        );
    }

    // Return null if no products are available for the category
    return null;
};

export default LandingPage;
