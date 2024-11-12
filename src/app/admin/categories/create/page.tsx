"use client";

import { CreateCategoryForm } from "@/features/categories/components/create-category-form";

export default function Page() {
  return (
    <>
      <h2 className="text-lg font-medium">Thêm loại sản phẩm mới</h2>
      <CreateCategoryForm />
    </>
  );
}
