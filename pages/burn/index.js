"use client";
import Burn from "../../components/home/burn";
import { StatusProvider } from "@/app/WalletStatus";

export default function BurnPage() {
  return (
    <div className="relative h-screen bg-white flex justify-center items-center">
      <StatusProvider>
        <Burn />
      </StatusProvider>
    </div>
  );
}
