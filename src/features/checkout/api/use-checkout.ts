import { useCart } from "@/hooks/use-cart";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ReqType = InferRequestType<typeof client.api.checkout.zalopay.$post>;
type ResType = InferResponseType<typeof client.api.checkout.zalopay.$post>;

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResType, Error, ReqType>({
    mutationFn: async ({ json }) => {
      const res = await client.api.checkout.zalopay.$post({ json });
      return await res.json();
    },
    onSuccess(data: any) {
      if (data?.error) {
        toast(data.error);
      } else if (data?.order_url) {
        router.push(data.order_url);
      }
    },
  });

  return mutation;
};
