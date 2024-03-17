import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import client from "@/context/axiosInstance";

const useMutationProducts = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (allproducts) => {
      return client.post("/store/products", allproducts);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success("Products Created Successfully", {
          theme: "dark",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      const errorMsg = error.response.data.error;
      toast.error(errorMsg, {
        theme: "dark",
      });
    },
  });

  const handleCreateProducts = (payload) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleCreateProducts,
  };
};

export default useMutationProducts;
