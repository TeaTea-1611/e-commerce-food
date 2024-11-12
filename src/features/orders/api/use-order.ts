import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResType = InferResponseType<(typeof client.api)["orders"][":id"]["$get"]>;

export const useOrder = (id: string) => {
  return useQuery<ResType, Error>({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await client.api["orders"][":id"].$get({ param: { id } });
      return await res.json();
    },
    enabled: !!id,
  });
};
