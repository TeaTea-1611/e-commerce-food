import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResType = InferResponseType<(typeof client.api)["categories"]["$get"]>;

export const useCategories = () => {
  return useQuery<ResType, Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await client.api["categories"].$get();
      return await res.json();
    },
  });
};
