import { Compass } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
      <footer className="border-t bg-background">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <Compass className="h-6 w-6" />
                <span className="font-bold">TravelGems</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Discover hidden travel destinations and create unforgettable memories.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                  <li><Link href="/careers">Careers</Link></li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy">Privacy Policy</Link></li>
                  <li><Link href="/terms">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TravelGems. All rights reserved.
          </div>
        </div>
      </footer>
  );
}