import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ReqType = InferRequestType<typeof client.api.auth.login.$post>;
type ResType = InferResponseType<typeof client.api.auth.login.$post>;

export const useLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.auth.login.$post({ json });
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data.user);
    },
  });

  return mutation;
};
