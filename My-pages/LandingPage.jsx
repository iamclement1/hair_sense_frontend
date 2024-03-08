import React, { useContext, useEffect } from "react";
import { HeroSlider, ProductSlider } from "@/components/Common";
import { Box } from "@chakra-ui/react";
import { CartContext, StateContext } from "@/context/StateProvider";
import { useRouter } from "next/router";
import useCategory from "@/hooks/useCategory";
import useCategoryById from "@/hooks/useCategoryById";

const LandingPage = () => {
    const { products } = useContext(StateContext);
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

    const { data: categoriesData, isLoading: categoriesLoading } = useCategory();

    return (
        <Box pt={["40px", null, "40px"]}>
            <HeroSlider />

            {/* Render product sliders for each category */}
            {!categoriesLoading &&
                categoriesData?.data?.data?.map((category) => (
                    <CategoryProductSlider key={category.id} categoryId={category.id} categoryName={category.name} />
                ))}
        </Box>
    );
};

const CategoryProductSlider = ({ categoryId, categoryName }) => {
    const { data: categoryProductData, isLoading: categoryProductLoading } = useCategoryById(categoryId);
    const categoryProducts = categoryProductData?.data?.data?.products;

    return (
        <Box>
            {!categoryProductLoading && categoryProducts && (
                <ProductSlider section={categoryName} productDatas={categoryProducts} />
            )}
        </Box>
    );
};

export default LandingPage;
