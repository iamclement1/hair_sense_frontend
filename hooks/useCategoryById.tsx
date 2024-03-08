import { useQuery } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const useCategoryById = (id: string) => {
  const fetchCategoryById = async () => {
    const data = await client.get(`/store/categories/${id}/products`);
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["category", id],
    queryFn: fetchCategoryById,
    staleTime: 300000,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useCategoryById;
