"use client";

import { Icons } from "@/components/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export function AdminSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center">
                <div className="flex aspect-square size-8 items-center justify-center">
                  <Icons.logo className="size-6 text-primary" />
                </div>
                <div className="grid flex-1 text-left">
                  <span
                    className={`text-primary leading-tight text-lg font-medium`}
                  >
                    {siteConfig.name}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/admin"}>
                    <span className="truncate">Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/admin/orders"}>
                    <span className="truncate">Đơn hàng</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/admin/billboards"}>
                    <span className="truncate">Bảng quảng cáo</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={"/admin/categories"}>
                    <span className="truncate">Loại sản phẩm</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Sản phẩm
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                {
                  title: "Tất cả",
                  href: "/admin/food-items",
                },
                {
                  title: "Thêm mới",
                  href: "/admin/food-items/create",
                },
              ].map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link href={item.href}>
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
