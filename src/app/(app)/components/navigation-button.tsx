"use client";

import { File, House, Package, Users } from "lucide-react";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
import { PanelLeft } from "lucide-react";
import Link from "next/link";

const navPlatformItems = [
  {
    title: "Trang chủ",
    href: "/",
    icon: House,
  },
  {
    title: "Giới thiệu",
    href: "/about-us",
    icon: Users,
  },
  {
    title: "Sản phẩm",
    href: "/food-items",
    icon: Package,
  },
  {
    title: "Blog",
    href: "/blogs",
    icon: File,
  },
];

export const NavigationButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="size-8 px-0">
          <PanelLeft className="size-4" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0" showCloseButton={false}>
        <SheetHeader className="relative px-4 pt-4">
          <SheetClose
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "size-8 p-2 !absolute top-2 right-2",
              }),
            )}
          >
            <Cross2Icon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
          <Link
            href={"/"}
            className={`flex items-center text-lg font-medium text-primary leading-tight`}
          >
            <Icons.logo className="size-6 text-primary mr-2" />
            {siteConfig.name}
          </Link>
          <VisuallyHidden>
            <SheetTitle />
            <SheetDescription />
          </VisuallyHidden>
        </SheetHeader>
        <nav className="p-4">
          <ul className="list-none">
            {navPlatformItems.map((item) => (
              <Collapsible key={item.href} asChild>
                <li className="group/menu-item relative">
                  <Link
                    href={item.href}
                    className={
                      "flex w-full h-8 items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                    }
                  >
                    <item.icon className="size-4" />
                    {item.title}
                  </Link>
                </li>
              </Collapsible>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
