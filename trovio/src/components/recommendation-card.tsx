import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RecommendationCardProps {
  title: string;
  description: string;
  image: string;
  location: string;
  href: string;
}

export function RecommendationCard({
  title,
  description,
  image,
  location,
  href,
}: RecommendationCardProps) {
  return (
    <Link href={href}>
      <Card className="group overflow-hidden transition-all hover:scale-105">
        <CardContent className="p-0">
          <div className="relative aspect-video">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle className="line-clamp-1">{title}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {location}
          </CardDescription>
          <p className="line-clamp-2 text-sm text-muted-foreground">{description}</p>
        </CardHeader>
      </Card>
    </Link>
  );
}