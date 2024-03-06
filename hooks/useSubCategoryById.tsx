import { useQuery } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const useSubCategoryById = (id: string) => {
  const fetchSubCategoryById = async () => {
    const data = await client.get(`/store/categories/${id}`);
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["subcategory", id],
    queryFn: fetchSubCategoryById,
    staleTime: 300000,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useSubCategoryById;
