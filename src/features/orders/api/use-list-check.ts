import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResType = InferResponseType<
  (typeof client.api)["orders"]["list-check"]["$get"]
>;

export const useListCheck = () => {
  return useQuery<ResType, Error>({
    queryKey: ["list-check"],
    queryFn: async () => {
      const res = await client.api["orders"]["list-check"].$get();
      return await res.json();
    },
  });
};
