"use client";

import { truncateAddress } from "@/lib/utils";
import { Settings, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ProfileHeaderProps {
  address: string;
}

export function ProfileHeader({ address }: ProfileHeaderProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-dark-lighter rounded-xl p-6 space-y-4">
      {/* Avatar and name */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fire to-neon-pink flex items-center justify-center text-2xl font-bold">
          {address.slice(0, 2)}
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold">Your Profile</h1>
          <button
            onClick={copyAddress}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-sm">{truncateAddress(address, 6)}</span>
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
        <button className="p-2 bg-dark-navy rounded-lg hover:bg-dark transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
