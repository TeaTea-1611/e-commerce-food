import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResType = InferResponseType<(typeof client.api)["billboards"]["$get"]>;

export const useBillboards = () => {
  return useQuery<ResType, Error>({
    queryKey: ["billboards"],
    queryFn: async () => {
      const res = await client.api["billboards"].$get();
      return await res.json();
    },
  });
};
