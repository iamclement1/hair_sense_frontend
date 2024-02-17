import { useQuery } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const useOrder = () => {
  const fetchOrder = async () => {
    const data = await client.get("/store/order/");
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrder,
    staleTime: 300000,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useOrder;
