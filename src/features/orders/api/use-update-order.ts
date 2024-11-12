import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ReqType = InferRequestType<(typeof client.api)["orders"][":id"]["$put"]>;
type ResType = InferResponseType<(typeof client.api)["orders"][":id"]["$put"]>;

export const useUpdateOrder = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<ResType, Error, ReqType>({
    mutationFn: async ({ json }) => {
      const res = await client.api["orders"][":id"].$put({
        param: { id },
        json,
      });
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
        queryClient.invalidateQueries({
          queryKey: ["orders", id],
        });
        toast("Đã cập nhật");
      }
    },
  });
};
