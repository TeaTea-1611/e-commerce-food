import { cookies } from "next/headers";
import { AdminSidebarProvider } from "./components/admin-sidebar-provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isOpen = (await cookies()).get("sidebar:state");
  const defaultOpen = isOpen ? JSON.parse(isOpen.value) : true;

  return (
    <AdminSidebarProvider defaultOpen={defaultOpen}>
      {children}
    </AdminSidebarProvider>
  );
}
