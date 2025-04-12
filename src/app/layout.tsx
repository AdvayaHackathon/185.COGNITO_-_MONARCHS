import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MapsProvider } from "@/context/MapsContext";
import React from 'react';
import {ThemeToggle} from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trovio - Find Your Next Adventure",
  description: "Discover amazing places and plan your next journey with Trov.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MapsProvider>
            {/* Header with Theme Toggle */}
            <div className="container flex justify-end py-4">
              <ThemeToggle />
            </div>

            {children}
          </MapsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}