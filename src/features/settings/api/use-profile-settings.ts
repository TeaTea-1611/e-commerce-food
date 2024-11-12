import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ReqType = InferRequestType<typeof client.api.settings.profile.$post>;
type ResType = InferResponseType<typeof client.api.settings.profile.$post>;

export const useProfileSettings = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.settings.profile.$post({ json });
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["me"], data.user);
    },
  });

  return mutation;
};
