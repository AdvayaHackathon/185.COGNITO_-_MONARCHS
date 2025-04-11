import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryPillProps {
  title: string;
  href: string;
  className?: string;
}

export function CategoryPill({ title, href, className }: CategoryPillProps) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20",
        className
      )}
    >
      {title}
    </Link>
  );
}