import { useQuery } from "@tanstack/react-query";
import useCategory from "@/hooks/useCategory";
import client from "@/context/axiosInstance";
import CustomSpinner from "@/components/Common/Spinner";

const useAllCategoriesProducts = () => {
  const { data: categoriesData, isLoading: isCategoryLoading } = useCategory();

  const fetchAllCategoriesProducts = async () => {
    if (!categoriesData) {
      return [];
    }

    const categoryIds = categoriesData?.data?.data?.map((category) => category.id);
    console.log(categoryIds);

    // Fetch products for each category ID
    const categoryProductsPromises = categoryIds.map((categoryId) =>
      client.get(`/store/categories/${categoryId}/products`)
    );
    console.log(categoryProductsPromises);

    // Wait for all requests to complete
    const categoryProductsData = await Promise.all(categoryProductsPromises);

    console.log(categoryProductsData);

    // Combine the results into a single array of products
    const allProducts = categoryProductsData.reduce((acc, cur) => {
      if (cur?.data?.data && Array.isArray(cur.data.data.products)) {
        return [...acc, ...cur.data.data.products];
      }
      return acc;
    }, []);

    return allProducts;
  };

  const { isLoading: isProductsLoading, error, data } = useQuery({
    queryKey: ["categoryProducts"],
    queryFn: fetchAllCategoriesProducts,
    enabled: !isCategoryLoading, // Don't fetch products until categories are loaded
    staleTime: 300000,
  });

  return {
    data,
    isLoading: isCategoryLoading || isProductsLoading, // Combine loading states
    error,
  };
};

export default useAllCategoriesProducts;
