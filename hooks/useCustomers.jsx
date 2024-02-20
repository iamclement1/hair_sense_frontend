import { useQuery } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const useCustomers = () => {
  const fetchCustomers = async () => {
    const data = await client.get("/customers");
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
    staleTime: 300000,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useCustomers;
