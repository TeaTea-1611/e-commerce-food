import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResType = InferResponseType<
  (typeof client.api)["food-items"]["featured"]["$get"]
>;

export const useFeaturedFoodItems = () => {
  return useQuery<ResType, Error>({
    queryKey: ["foodItems"],
    queryFn: async () => {
      const res = await client.api["food-items"]["featured"].$get();
      return await res.json();
    },
  });
};
