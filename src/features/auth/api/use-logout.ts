import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ReqType = InferRequestType<typeof client.api.auth.logout.$post>;
type ResType = InferResponseType<typeof client.api.auth.logout.$post>;

export const useLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async () => {
      const res = await client.api.auth.logout.$post();
      return await res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
    },
  });

  return mutation;
};
