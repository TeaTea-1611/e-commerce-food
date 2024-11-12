import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResType = InferResponseType<(typeof client.api)["orders"]["$get"]>;

export const useOrders = () => {
  return useQuery<ResType, Error>({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await client.api["orders"].$get();
      return await res.json();
    },
  });
};
