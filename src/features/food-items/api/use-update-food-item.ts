import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ReqType = InferRequestType<
  (typeof client.api)["food-items"][":id"]["$put"]
>;
type ResType = InferResponseType<
  (typeof client.api)["food-items"][":id"]["$put"]
>;

export const useUpdateFoodItem = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<ResType, Error, ReqType>({
    mutationFn: async ({ param, json }) => {
      const res = await client.api["food-items"][":id"].$put({
        param,
        json,
      });
      return await res.json();
    },
    onSuccess: (data) => {
      console.log(data);

      toast(data.message);
      queryClient.invalidateQueries({
        queryKey: ["foodItems"],
      });
      queryClient.invalidateQueries({
        queryKey: ["foodItem", id],
      });
    },
  });
};
