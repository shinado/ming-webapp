"use client";
import { useState } from "react";
import { useRef } from "react";
import Burn from "./burn";
import Ming from "./ming";
import Decentralized from "./dec";
import Banner from "./banner";
import Roadmap from "./roadmap";
import Footer from "./footer";
import { StatusProvider } from "./WalletStatus"; // adjust the path as needed

// pages/index.js
export default function Home() {
  const ref = useRef(null);

  const onBurning = () => {
    console.log("calling ref:", ref.current);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <StatusProvider>
        <Banner onBurning={onBurning} />
        <Ming />
        <Decentralized />
        <Burn ref={ref} />
        <Roadmap />
        <Footer />
      </StatusProvider>
    </>
  );
}
