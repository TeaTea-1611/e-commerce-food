import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation";

type ResType = InferResponseType<
  (typeof client.api)["billboards"][":id"]["$delete"]
>;

export const useDeleteBillboard = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ResType, Error>({
    mutationFn: async () => {
      const res = await client.api["billboards"][":id"].$delete({
        param: { id },
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["billboards"],
      });
      router.push("/admin/billboards");
    },
  });
};
