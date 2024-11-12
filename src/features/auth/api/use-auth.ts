import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await client.api.auth.me.$get();
      return await res.json();
    },
  });

  return query;
};
