import { useQuery } from "@chakra-ui/react";

export const useCorrespondingCategory = () => {
  const fetchCategory = async () => {
    const data = await client.get("/store/categories");
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
    staleTime: 300000,
  });

  const getCategoryName = (categoryId) => {
    if (data) {
      const category = data.find((category) => category.id === categoryId);
      return category ? category.name : "";
    }
    return "";
  };

  return {
    data,
    isLoading,
    error,
    getCategoryName,
  };
};
