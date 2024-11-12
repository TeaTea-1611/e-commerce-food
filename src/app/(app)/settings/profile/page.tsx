"use client";

import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/features/auth/api/use-auth";
import { ProfileSettingsForm } from "@/features/settings/components/profile-settings-form";
import { useEffect } from "react";

export default function Page() {
  const { data, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !data) {
    }
  }, [data, isLoading]);

  if (!data?.id) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Thông tin cá nhân</h2>
      <Separator />
      <ProfileSettingsForm initialData={data} />
    </div>
  );
}
