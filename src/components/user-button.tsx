"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/features/auth/api/use-auth";
import { useLogout } from "@/features/auth/api/use-logout";
import {
  CreditCard,
  Gem,
  LibraryBig,
  ListCheck,
  LogIn,
  LogOut,
  ScrollText,
  ShoppingCart,
  User,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { VisuallyHidden } from "./ui/visually-hidden";

const lists = [
  { title: "Thông tin cá nhân", href: "/settings/profile", icon: User },
  { title: "Giỏ hàng", href: "/cart", icon: ShoppingCart },
  { title: "Kiểm tra đơn hàng", href: "/list-check", icon: ListCheck },
];

export function UserButton() {
  const { data: user, isLoading, error } = useAuth();
  const { mutate: logout } = useLogout();

  if (isLoading) {
    return <Skeleton className="size-8 rounded-full" />;
  }

  if (!user?.id) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={"/login"}
            className={buttonVariants({
              variant: "ghost",
              className: "!size-8",
            })}
          >
            <LogIn className="size-4" />
            <span className="sr-only">Login</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end">
          <p>Đăng nhập</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button type="button">
          <Avatar className="rounded-full size-8">
            <AvatarImage src={"/user.png"} alt="avatar" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </button>
      </SheetTrigger>
      <SheetContent showCloseButton={false} className="p-4">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle />
            <SheetDescription />
          </VisuallyHidden>
        </SheetHeader>
        <ul className="list-none py-4">
          {lists.map(({ title, href, icon: Icon }) => (
            <Fragment key={href}>
              <li className="relative">
                <Link
                  href={href}
                  className={
                    "flex w-full h-8 items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                  }
                >
                  <Icon className="size-4" />
                  {title}
                </Link>
              </li>
            </Fragment>
          ))}
          <li className="border-b my-1" />
          <li className="relative">
            <button
              type="button"
              className={
                "flex w-full h-8 items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground"
              }
              onClick={() => logout({})}
            >
              <LogOut className="mr-2 size-4" />
              Đăng xuất
            </button>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
