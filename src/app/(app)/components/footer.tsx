import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="p-4 flex items-center justify-center border-t">
      <span className="text-sm text-muted-foreground">
        © 2024 {siteConfig.name}
      </span>
    </footer>
  );
}
