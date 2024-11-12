import { client } from "@/lib/rpc";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { useEffect } from "react";

type ResType = InferResponseType<
  (typeof client.api)["food-items"]["pagination"]["$get"]
>;

export const usePaginationFoodItems = ({
  categoryId,
  name,
  page,
  take,
}: {
  [key: string]: string | null;
}) => {
  const queryClient = useQueryClient();

  const { ...props } = useQuery<ResType, Error>({
    queryKey: ["foodItems", categoryId, name, page, take],
    queryFn: async () => {
      const res = await client.api["food-items"]["pagination"].$get({
        query: { categoryId, name, page, take },
      });
      return await res.json();
    },
  });

  useEffect(() => {
    if (!props.isPlaceholderData) {
      queryClient.prefetchQuery({
        queryKey: ["foodItems", categoryId, name, page, take],
        queryFn: async () => {
          const res = await client.api["food-items"]["pagination"].$get({
            query: { categoryId, name, page, take },
          });
          return await res.json();
        },
      });
    }
  }, [categoryId, name, page, take, queryClient]);

  return props;
};
