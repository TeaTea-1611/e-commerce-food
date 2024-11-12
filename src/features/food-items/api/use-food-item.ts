import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResType = InferResponseType<
  (typeof client.api)["food-items"][":id"]["$get"]
>;

export const useFoodItem = (id: string) => {
  return useQuery<ResType, Error>({
    queryKey: ["foodItem", id],
    queryFn: async () => {
      const res = await client.api["food-items"][":id"].$get({ param: { id } });
      return await res.json();
    },
    enabled: !!id,
  });
};
