"use client";
import Burn from "../../components/home/burn";
import { StatusProvider } from "@/app/WalletStatus";

export default function BurnPage() {
  return (
      <StatusProvider>
        <Burn />
      </StatusProvider>
  );
}
