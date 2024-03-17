import { useQuery } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const useProductById = (id: string) => {
  const fetchProductById = async () => {
    const data = await client.get(`/store/products/${id}`);
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["products", id],
    queryFn: fetchProductById,
    staleTime: 300000,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useProductById;
