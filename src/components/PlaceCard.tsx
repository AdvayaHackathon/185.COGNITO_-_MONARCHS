// components/PlaceCard.tsx
import * as React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface PlaceCardProps {
    image: string;
    title: string;
    description?: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ image, title, description }) => {
    return (
        <Card className="overflow-hidden">
            <div className="relative h-48 w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 ease-in-out hover:scale-105"
                />
            </div>
            <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">{title}</h3>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>
        </Card>
    );
};

export default PlaceCard;
