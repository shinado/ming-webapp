"use client";
import { useRef } from "react";
import "./globals.css"; // Adjust the path to your global CSS file
import Burn from "../components/home/burn";
import Banner from "../components/home/Banner";
import Roadmap from "../components/home/roadmap";
import Footer from "../components/home/footer";
import { StatusProvider } from "./WalletStatus"; // adjust the path as needed
import Introduction from "@/components/home/Introduction";
import Features from "@/components/home/Features";

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
        {/* <Navbar /> */}
        <Banner onBurning={onBurning} />
        <Introduction />
        <Features />
        {/* <FadeDiv ref={ref}/> */}
        <Burn ref={ref} />
        <Roadmap />
        <Footer />
      </StatusProvider>
    </>
  );
}
