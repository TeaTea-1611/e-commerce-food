"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useProfileSettings } from "../api/use-profile-settings";
import { profileSettingsSchema, ProfileSettingsSchema } from "../schema";

interface Props {
  initialData: ProfileSettingsSchema;
}

export function ProfileSettingsForm({ initialData }: Props) {
  const form = useForm<ProfileSettingsSchema>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: initialData,
  });

  const { mutate: updateProfileSettings, isPending } = useProfileSettings();

  const onSubmit = async (values: ProfileSettingsSchema) => {
    updateProfileSettings({ json: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SĐT</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Đang xử lý..." : "Lưu"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
