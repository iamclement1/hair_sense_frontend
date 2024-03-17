import { useQuery } from "@tanstack/react-query";
import client from "@/context/axiosInstance";

const useAdmin = () => {
  const fetchAllAdmin = async () => {
    const data = await client.get("/admin/admins/?skip=0&limit=10");
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["alladmin"],
    queryFn: fetchAllAdmin,
    staleTime: 300000,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useAdmin;
