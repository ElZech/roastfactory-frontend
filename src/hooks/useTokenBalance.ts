"use client";

import { useEffect, useState, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import { ROAST_TOKEN_MINT, ROAST_DECIMALS } from "@/config/constants";

export function useTokenBalance() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!publicKey) {
      setBalance(0);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Get the associated token account address
      const tokenAccountAddress = await getAssociatedTokenAddress(
        ROAST_TOKEN_MINT,
        publicKey
      );

      try {
        // Try to get the token account
        const tokenAccount = await getAccount(connection, tokenAccountAddress);
        const rawBalance = Number(tokenAccount.amount);
        const formattedBalance = rawBalance / Math.pow(10, ROAST_DECIMALS);
        setBalance(formattedBalance);
      } catch {
        // Token account doesn't exist - balance is 0
        setBalance(0);
      }
    } catch (err) {
      console.error("Error fetching token balance:", err);
      setError(err as Error);
      setBalance(0);
    } finally {
      setIsLoading(false);
    }
  }, [connection, publicKey]);

  useEffect(() => {
    fetchBalance();

    // Set up interval to refresh balance
    const interval = setInterval(fetchBalance, 30000);

    return () => clearInterval(interval);
  }, [fetchBalance]);

  return {
    balance,
    isLoading,
    error,
    refetch: fetchBalance,
  };
}
