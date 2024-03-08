import { useQuery } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const useSubcategoryByIndex = (id: string) => {
  const fetchSubCategoryById = async () => {
    const data = await client.get(`/store/sub_category/${id}`);
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

export default useSubcategoryByIndex;
