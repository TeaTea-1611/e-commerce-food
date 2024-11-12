"use client";
import { useCategories } from "@/features/categories/api/use-categories";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export const Sidebar = () => {
  const { data: categories } = useCategories();
  const params = useSearchParams();

  const name = params.get("name") || "";
  const page = params.get("page") || "0";
  const take = params.get("take") || "20";

  return (
    <div className="lg:col-span-1 flex flex-wrap gap-2">
      {categories?.map((item) => (
        <Link
          key={item.id}
          className="rounded-md px-2 py-1 border flex items-center hover:bg-accent"
          href={`/food-items?categoryId=${item.id}&page=${page}&take=${take}&name=${name}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
