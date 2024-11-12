"use client";

import { useAuth } from "@/features/auth/api/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && data?.id) {
      router.push("/");
    }
  }, [data, isLoading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      {children}
    </div>
  );
}
