import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import client from "@/context/axiosInstance";

const useDeleteCategoryById = (id) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return client.delete(`/store/categories/${id}`);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success("Category Deleted Successfully");
      }
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (error) => {
      const errorMsg = "Unable to complete request, please contact support!"
      toast.error(errorMsg);
    },
  });

  const handleDeleteCategory = (payload) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleDeleteCategory,
  };
};

export default useDeleteCategoryById;
