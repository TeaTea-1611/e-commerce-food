import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResType = InferResponseType<
  (typeof client.api)["billboards"][":id"]["$get"]
>;

export const useBillboard = (id: string) => {
  return useQuery<ResType, Error>({
    queryKey: ["billboard", id],
    queryFn: async () => {
      const res = await client.api["billboards"][":id"].$get({ param: { id } });
      return await res.json();
    },
    enabled: !!id,
  });
};
