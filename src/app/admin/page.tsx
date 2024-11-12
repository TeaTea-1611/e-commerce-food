"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { useDashboard } from "@/features/dashboard/api/use-dashboard";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

export default function Page() {
  const { data } = useDashboard();

  const chartConfig = {
    total: {
      label: "Tổng",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex-1 space-y-2">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <p className="text-muted-foreground text-sm">Tổng quan cửa hàng</p>
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Tổng doanh thu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {data?.totalRevenue.toLocaleString("vi-vn")} VND
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Tổng đơn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">+{data?.salesCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Tổng sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{data?.foodItemCount}</div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Biểu Đồ Thanh - Nhãn</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-full h-96">
              <BarChart accessibilityLayer data={data?.graphRevenue}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="total" fill="var(--color-total)" radius={8}>
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
        </Card>
      </div>
    </div>
  );
}
