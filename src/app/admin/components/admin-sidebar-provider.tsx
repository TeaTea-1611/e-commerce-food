"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { AdminHeader } from "./admin-header";
import { AdminSidebar } from "./admin-sidebar";
import { useAuth } from "@/features/auth/api/use-auth";
import { useRouter } from "next/navigation";

export function AdminSidebarProvider({
  children,
  defaultOpen,
}: {
  children: React.ReactNode;
  defaultOpen: boolean;
}) {
  const { data, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data?.id) {
      router.push("/login");
    }
  }, [data]);

  return (
    <>
      <SidebarProvider
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          document.cookie = `sidebar:state=${open}; path=/`;
        }}
      >
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 pt-4">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
