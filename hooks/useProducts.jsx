import { useQuery } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const useProducts = () => {
  const fetchProduct = async () => {
    const data = await client.get("/store/products");
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProduct,
    staleTime: 300000,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useProducts;
