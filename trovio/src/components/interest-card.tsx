import { Card, CardContent } from "@/src/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface InterestCardProps {
  title: string;
  icon: string;
  image: string;
  href: string;
  className?: string;
}

export function InterestCard({ title, icon, image, href, className }: InterestCardProps) {
  return (
    <Link href={href}>
      <Card className={cn("group overflow-hidden transition-all hover:scale-105", className)}>
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="text-2xl">{icon}</span>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}