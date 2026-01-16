"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Swords, Trophy, Video, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/battle", icon: Swords, label: "Battle", featured: true },
  { href: "/leaderboard", icon: Trophy, label: "Ranks" },
  { href: "/clips", icon: Video, label: "Clips" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-dark border-t border-dark-navy">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors",
                  item.featured && "relative",
                  isActive ? "text-fire" : "text-gray-500 hover:text-gray-300"
                )}
              >
                {item.featured ? (
                  <div className="absolute -top-4 bg-fire rounded-full p-3 fire-glow">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <Icon className="w-5 h-5" />
                )}
                <span
                  className={cn(
                    "text-xs",
                    item.featured && "mt-6"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
