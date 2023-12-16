"use client";
import { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import MingCoin from "../abi/MingCoin.json";
const { ethers } = require("ethers");
console.log(ethers);

const mingABI = MingCoin.abi;

function toNumber(amount) {
  const num = BigNumber(amount).dividedBy(1e18);
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "b";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "m";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return num.toString();
  }
}

export default function HallOfFame() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    listBurnings();
  }, []);

  const listBurnings = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider) {
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
          mingABI,
          provider
        );
        const list = await contract.getSortedBurnings();
        setLeaderboardData(list);
        return list;
      }
    } else {
      console.log("Install MetaMask");
    }
  };

  return (
    <div className="App flex justify-center items-center min-h-screen">
  
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">Deaderboard</h1>
      <div className="max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        {leaderboardData.filter(data => !data.name.startsWith('0x44444444')).map((entry, index) => (
          <div
            key={index}
            className={`text-black flex justify-between items-center p-4 border-b ${
              index % 2 ? "bg-gray-100" : "bg-white"
            }`}
          >
            <span className="flex-1 mb-2 md:mb-0 md:mr-4 break-words">
              {index + 1}. {entry.name}
            </span>
            <span className="flex-shrink-0 w-20 text-right">
              {toNumber(entry.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
