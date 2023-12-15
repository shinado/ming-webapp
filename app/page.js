"use client";
import Image from "next/image";
import { useState } from "react";
import { useRef } from "react";
import WalletConnect from "./walletConnect";
import Burn from "./burn";

// pages/index.js
export default function Home() {
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkFundStatus");
      const data = await response.json();

      console.log("isFundOver: ", data.isFundOver);
      if (data.isFundOver === "true") {
        window.open(
          "https://app.uniswap.org/tokens/ethereum/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "_blank"
        );
      } else {
        window.location.href = "/fund";
      }
    } catch (error) {
      console.error("Error checking fund status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Overlay Bar */}
      <div className="absolute top-0 left-0 right-0 bg-black text-white text-sm p-2 text-center z-10">
        View source code in{" "}
        <a
          href="https://github.com/shinado/ming-webapp"
          className="text-blue-500 hover:text-blue-300"
        >
          GitHub
        </a>{" "}
        and request to pull your code
      </div>

      {/* Banner */}
      <div
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/banner.png')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#330000] opacity-50"></div>

        {/* Content */}
        <div className="relative flex justify-center items-center h-full">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold">MING COIN</h1>
            <p className="text-2xl mt-4">
              A decentralized crypto currency used in afterlife
            </p>
            <WalletConnect
              onBurning={ref.current?.scrollIntoView({ behavior: "smooth" })}
            />
            {/* <button
              onClick={handleButtonClick}
              className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Get $MING Now
            </button> */}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row bg-white h-screen">
        <div className="md:w-2/5 flex items-center justify-center p-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">$MING</h2>
            <p className="mt-4 text-lg text-gray-500">
              $MING is an ERC-20 token designed to be burnt to the people who
              passed away.
              <a
                target="_blank"
                href="https://docs.google.com/document/d/1WXhmvFGXwOpCzt5NNAXEWGtSqgQuuns0uswm1RZfe2A/edit?usp=sharing"
                className="text-blue-600 hover:text-blue-800"
              >
                Read white paper.
              </a>
            </p>
          </div>
        </div>
        <div className="md:w-3/5 p-8">
          <img
            src="/usd.webp"
            alt="About $MING"
            className="object-cover h-full w-full"
          />
        </div>
      </div>

      {/* Decentralized Section */}
      <div className="flex flex-col md:flex-row bg-white h-screen">
        <div className="md:w-3/5 p-8">
          <img
            src="/eth-note.webp"
            alt="Fully Decentralized"
            className="object-cover h-full w-full rounded-md"
          />
        </div>
        <div className="md:w-2/5 flex items-center justify-center p-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Decentralized
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              $MING is a fully decentralized project. All tokens are distributed
              in a fair launch way. No pre-mined, no reserved distribution.
              <a
                target="_blank"
                className="text-blue-600 hover:text-blue-800"
                href="https://docs.google.com/document/d/1WXhmvFGXwOpCzt5NNAXEWGtSqgQuuns0uswm1RZfe2A/edit?usp=sharing"
              >
                Learn More.
              </a>
            </p>
            <p className="mt-4 text-lg text-gray-500">
              All codes are open-souced, which means you can request to change
              the website or add some features to it.
              <a
                target="_blank"
                href="https://github.com/mingcoineth/mingcoin"
                className="text-blue-600 hover:text-blue-800"
              >
                View in Github
              </a>
            </p>
          </div>
        </div>
      </div>

      <Burn ref={ref} />

      {/* Roadmap Section */}
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Roadmap</h2>

          <div className="mt-10">
            <div className="mb-8">
              <div className="milestone">
                <span className="milestone-date">20/12/2023</span>
                <div className="milestone-details">
                  <h3 className="milestone-title">Testing phase.1</h3>
                  <p className="milestone-description">
                    Released on testnet (without funding)
                  </p>
                </div>
              </div>

              <div className="milestone">
                <span className="milestone-date">15/1/2024</span>
                <div className="milestone-details">
                  <h3 className="milestone-title">Testing phase.2</h3>
                  <p className="milestone-description">
                    Released on testnet (with funding)
                  </p>
                </div>
              </div>

              <div className="milestone">
                <span className="milestone-date">1/2/2024</span>
                <div className="milestone-details">
                  <h3 className="milestone-title">Testing phase.3</h3>
                  <p className="milestone-description">
                    Funding on testnet ends
                  </p>
                </div>
              </div>

              <div className="milestone">
                <span className="milestone-date">1/3/2024</span>
                <div className="milestone-details"c>
                  <h3 className="milestone-title">Main event: Funding</h3>
                  <p className="milestone-description">Released on mainnet</p>
                </div>
              </div>

              <div className="milestone">
                <span className="milestone-date">15/3/2024</span>
                <div className="milestone-details">
                  <h3 className="milestone-title">Main event: Funing</h3>
                  <p className="milestone-description">
                    Funding on mainnet ends! Have fun with $MING!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            {/* Left Side: About or Contact Info */}
            <div>
              <h3 className="text-lg font-semibold">About $MING</h3>
              <p className="mt-2">
                A decentralized currency used in afterlife.
              </p>
              {/* Add more info or links here */}
            </div>

            {/* Right Side: Links or Social Media Icons */}
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              {/* Replace '#' with actual URLs */}
              <ul className="mt-2">
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300">
                    Roadmap
                  </a>
                </li>
                {/* More links */}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8">
            <p>&copy; {new Date().getFullYear()} $MING. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
