import { useQuery } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const useSubCategory = () => {
  const fetchSubCategory = async () => {
    const data = await client.get("/store/sub_categories/");
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["subcategory"],
    queryFn: fetchSubCategory,
    staleTime: 300000,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useSubCategory;
