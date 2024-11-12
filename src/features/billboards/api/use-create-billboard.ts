import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

type ReqType = InferRequestType<(typeof client.api)["billboards"]["$post"]>;
type ResType = InferResponseType<(typeof client.api)["billboards"]["$post"]>;

export const useCreateBillboard = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ResType, Error, ReqType>({
    mutationFn: async ({ json }) => {
      const res = await client.api["billboards"].$post({ json });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billboards"] });
      router.push("/admin/billboards");
    },
  });
};
