import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ReqType = InferRequestType<
  (typeof client.api)["categories"][":id"]["$put"]
>;
type ResType = InferResponseType<
  (typeof client.api)["categories"][":id"]["$put"]
>;

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<ResType, Error, ReqType>({
    mutationFn: async ({ json }) => {
      const res = await client.api["categories"][":id"].$put({
        param: { id },
        json,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      queryClient.invalidateQueries({
        queryKey: ["categories", id],
      });
    },
  });
};
