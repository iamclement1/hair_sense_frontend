import { useQuery } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const useSuperDashboard = () => {
  const fetchSuperDashboard = async () => {
    const data = await client.get("/admin");
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["admin"],
    queryFn: fetchSuperDashboard,
    staleTime: 300000,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useSuperDashboard;
