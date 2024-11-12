import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ReqType = InferRequestType<
  (typeof client.api)["billboards"][":id"]["$put"]
>;
type ResType = InferResponseType<
  (typeof client.api)["billboards"][":id"]["$put"]
>;

export const useUpdateBillboard = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<ResType, Error, ReqType>({
    mutationFn: async ({ json }) => {
      const res = await client.api["billboards"][":id"].$put({
        param: { id },
        json,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["billboards"],
      });
      queryClient.invalidateQueries({
        queryKey: ["billboards", id],
      });
    },
  });
};
