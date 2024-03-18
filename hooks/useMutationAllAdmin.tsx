import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import client from "@/context/axiosInstance";

const useMutationAllAdmin = (id) => { // Add the id parameter here
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return client.delete(`/admin/users/${id}`); // Fix the typo here and pass the id parameter
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success("Admin Deleted Successfully", {
          theme: "dark",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["alladmin"] });
    },
    onError: (error) => {
      const errorMsg = "Unable to complete request, please contact support!"
      toast.error(errorMsg);
    },
  });

  const handleAdmin = (payload) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleAdmin,
  };
};

export default useMutationAllAdmin;
