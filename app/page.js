"use client";
import { useRef, useState } from "react";
import "./globals.css"; // Adjust the path to your global CSS file
import Burn from "../components/home/burn";
import Banner from "../components/home/Banner";
import Footer from "../components/home/footer";
import { StatusProvider } from "./WalletStatus"; // adjust the path as needed
import Introduction from "@/components/home/Introduction";
import Features from "@/components/home/Features";
import Navigation from "@/components/home/navbar";
import Deaderboard from "@/components/home/Deaderboard";
import Team from "@/components/home/Team";

// pages/index.js
export default function Home() {
  const ref = useRef(null);

  const onBurning = () => {
    console.log("calling ref:", ref.current);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <StatusProvider>
        {/* Overlay Bar */}
        <div className="absolute z-10 w-full">
          <div className="hidden md:block bg-black text-white text-sm p-2 text-center">
            View source code in{" "}
            <a href="https://github.com/shinado/ming-webapp">GitHub</a>, make
            some changes, and make pull requests!
          </div>
          <Navigation selected="home" />
        </div>
        <Banner onBurning={onBurning} />
        <Introduction />
        <Features />
        {/* <FadeDiv ref={ref}/> */}
        <Deaderboard displayButton={false} maxDisplay={100} />
        <Burn ref={ref} />
        <Team />
        {/* <Roadmap /> */}
        <Footer />
      </StatusProvider>
    </div>
  );
}
