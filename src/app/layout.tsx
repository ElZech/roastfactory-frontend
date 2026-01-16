import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/shared/Header";
import { BottomNav } from "@/components/shared/BottomNav";
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: "RoastPush - Competitive Roast Battles for SOL Rewards",
  description:
    "Battle your wit in real-time roast competitions. Voice-first battles, AI judging, and ROAST token rewards. Turn savage humor into shareable clips and SOL.",
  keywords: ["roast battle", "comedy", "solana", "web3", "gaming", "tokens"],
  openGraph: {
    title: "RoastPush",
    description: "Competitive Roast Battles for SOL Rewards",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark text-white min-h-screen">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pb-20">{children}</main>
            <BottomNav />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
