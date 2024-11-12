"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@/components/user-button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const AdminHeader = () => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full duration-300 bg-card border-b border-border/40 shrink-0 items-center gap-2 ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
        hidden && "-translate-y-full",
      )}
    >
      <div className="flex h-14 items-center justify-between w-full px-4 gap-2">
        <div className="flex items-center gap-2 flex-1">
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
};
