import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResType = InferResponseType<
  (typeof client.api)["categories"][":id"]["$get"]
>;

export const useCategory = (id: string) => {
  return useQuery<ResType, Error>({
    queryKey: ["category", id],
    queryFn: async () => {
      const res = await client.api["categories"][":id"].$get({ param: { id } });
      return await res.json();
    },
    enabled: !!id,
  });
};
