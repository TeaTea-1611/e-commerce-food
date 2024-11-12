import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

type ReqType = InferRequestType<(typeof client.api)["categories"]["$post"]>;
type ResType = InferResponseType<(typeof client.api)["categories"]["$post"]>;

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ResType, Error, ReqType>({
    mutationFn: async ({ json }) => {
      const res = await client.api["categories"].$post({ json });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.push("/admin/categories");
    },
  });
};
