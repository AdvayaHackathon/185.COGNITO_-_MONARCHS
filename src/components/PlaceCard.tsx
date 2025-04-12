// src/components/PlaceCard.tsx
import Link from "next/link";
import Image from "next/image";

interface PlaceCardProps {
    id: string;
    image: string;
    title: string;
    description: string;
}

export default function PlaceCard({ id, image, title, description }: PlaceCardProps) {
    return (
        <Link
            href={`/places/${id}`}
            className="group block overflow-hidden rounded-lg bg-card transition-all hover:shadow-lg"
        >
            <div className="relative h-48 w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
        </Link>
    );
}