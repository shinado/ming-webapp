"use client";
import Navigation from "@/components/home/navbar";
import Burn from "../../components/home/burn";
import { StatusProvider } from "@/app/WalletStatus";

export default function BurnPage() {
  return (
      <StatusProvider>
        <Navigation selected="burn"/>
        <Burn />
      </StatusProvider>
  );
}
