import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResType = InferResponseType<
  (typeof client.api)["food-items"]["related"][":categoryId"]["$get"]
>;

export const useRelatedFoodItems = (categoryId: string) => {
  return useQuery<ResType, Error>({
    queryKey: ["related", categoryId],
    queryFn: async () => {
      const res = await client.api["food-items"]["related"][":categoryId"].$get(
        { param: { categoryId } },
      );
      return await res.json();
    },
    enabled: !!categoryId,
  });
};
