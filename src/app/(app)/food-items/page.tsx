"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { usePaginationFoodItems } from "@/features/food-items/api/use-pagination-food-items";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Sidebar } from "./components/sidebar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";

export default function Page() {
  const params = useSearchParams();
  const router = useRouter();

  const categoryId = params.get("categoryId") || "";
  const name = params.get("name") || "";
  const page = params.get("page") || "0";
  const take = params.get("take") || "20";

  const { data, isLoading } = usePaginationFoodItems({
    categoryId,
    name,
    page,
    take,
  });

  const handlePageChange = (newPage: number) => {
    router.push(
      `/food-items?categoryId=${categoryId}&page=${newPage}&take=${take}&name=${name}`,
    );
  };

  return (
    <div className="lg:grid lg:grid-cols-4 gap-2 lg:items-start">
      <Sidebar />
      <div className="lg:col-span-3 space-y-3">
        <Input
          placeholder="Tìm kiếm"
          onChange={(e) => {
            router.push(
              `/food-items?categoryId=${categoryId}&page=${page}&take=${take}&name=${e.target.value}`,
            );
          }}
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : !data?.foodItems ? (
          <p>Error loading data</p>
        ) : (
          <div>
            <div className="grid grid-cols-4 gap-3 w-full">
              {data?.foodItems?.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-2">
                    <div className="relative h-40 rounded-md bg-muted">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="object-cover size-full"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col text-left p-2">
                    <div className="flex w-full">
                      <Link
                        href={`/food-items/${item.id}`}
                        className="text-left font-semibold text-sm"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="flex w-full">
                      <span className="font-medium text-sm text-primary">
                        {item.price}đ
                      </span>
                    </div>
                    <div className="flex flex-col w-full space-y-2">
                      <div className="font-normal flex items-center justify-between text-xs leading-none text-muted-foreground">
                        <p>Đã bán {item.sold}</p>
                        <p>Còn {item.quantity}</p>
                      </div>
                      <Progress
                        className="h-2"
                        value={(item.sold / (item.sold + item.quantity)) * 100}
                      />
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        page && handlePageChange(parseInt(page) - 1)
                      }
                    />
                  </PaginationItem>
                  {/* You can dynamically add pagination links based on total pages */}
                  {[...Array(3)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => handlePageChange(index)}
                        isActive={!!page && parseInt(page) === index}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        page && handlePageChange(parseInt(page) + 1)
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
