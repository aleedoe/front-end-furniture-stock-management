import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster"
import StoreProvider from "./StoreProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Furniture Stock Management",
  description: "manage stock furniture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
