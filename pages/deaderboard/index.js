"use client";
import Navigation from "@/components/home/navbar";
import Deaderboard from "@/components/home/Deaderboard";
import { StatusProvider } from "@/app/WalletStatus";

export default function deaderboard() {
  return (
    <StatusProvider>
      <Navigation selected="deaderboard" />
      <Deaderboard displayButton={true} />
    </StatusProvider>
  );
}
