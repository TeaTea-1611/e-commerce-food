import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResType = InferResponseType<(typeof client.api)["dashboard"]["$get"]>;

export const useDashboard = () => {
  return useQuery<ResType, Error>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await client.api["dashboard"].$get();
      return await res.json();
    },
  });
};
