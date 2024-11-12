import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

type ReqType = InferRequestType<typeof client.api.auth.register.$post>;
type ResType = InferResponseType<typeof client.api.auth.register.$post>;

export const useRegister = () => {
  const router = useRouter();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.auth.register.$post({ json });
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push("/login");
      }
    },
  });

  return mutation;
};
