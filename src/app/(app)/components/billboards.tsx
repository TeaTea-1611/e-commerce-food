"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useBillboards } from "@/features/billboards/api/use-billboards";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Billboards() {
  const { data: billboards } = useBillboards();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto max-w-screen-lg">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {billboards?.map((billboard) => (
            <CarouselItem key={billboard.id} className="w-full h-48">
              <img
                src={billboard.imageUrl}
                alt={billboard.name}
                className="object-cover size-full rounded-b-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
