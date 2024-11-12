import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ReqType = InferRequestType<(typeof client.api)["food-items"]["$post"]>;
type ResType = InferResponseType<(typeof client.api)["food-items"]["$post"]>;

export const useCreateFoodItem = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ResType, Error, ReqType>({
    mutationFn: async ({ json }) => {
      const res = await client.api["food-items"].$post({ json });
      return await res.json();
    },
    onSuccess: (data) => {
      toast(data.message);
      if (data.foodItem) {
        queryClient.invalidateQueries({ queryKey: ["foodItems"] });
        router.push(`/admin/food-items/${data.foodItem.id}`);
      }
    },
  });
};
