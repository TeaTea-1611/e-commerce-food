"use client";

import { type DialogProps } from "@radix-ui/react-dialog";

import Link from "next/link";
import { buttonVariants } from "./ui/button";

export function CommandMenu({ ...props }: DialogProps) {
  return (
    <>
      <Link
        href={"/food-items"}
        className={buttonVariants({
          variant: "outline",
          className:
            "relative h-8 w-full md:w-80 !justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12",
        })}
        {...props}
      >
        Tìm kiếm
      </Link>
    </>
  );
}
