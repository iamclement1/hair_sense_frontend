import { useQuery } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const useTransactions = () => {
  const fetchTransactions = async () => {
    const data = await client.get("/customers");
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: 300000,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useTransactions;
