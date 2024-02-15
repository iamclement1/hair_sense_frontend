import { useQuery } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const useCategory = () => {
  const fetchCategory = async () => {
    const data = await client.get("/store/categories");
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
    staleTime: 300000,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useCategory;
