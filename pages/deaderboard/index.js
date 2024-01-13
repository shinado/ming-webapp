"use client";
import { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import MingCoin from "../../abi/MingCoin.json";
import Link from "next/link";
const { ethers } = require("ethers");
console.log(ethers);
const mingABI = MingCoin.abi;
import "../../app/globals.css";

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
        const list = await contract.getBurningList();
        console.log("list", list);
        if (list.length === 0) {
          return [];
        }

        const sorted = [...list].sort((a, b) => {
          return new BigNumber(b.amount)
            .minus(new BigNumber(a.amount))
            .toNumber();
        });
        setLeaderboardData(sorted);
        return list;
      }
    } else {
      console.log("Install MetaMask");
    }
  };

  return (
    <div className="App flex justify-center items-center min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center my-6">Deaderboard</h1>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  No.
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Wealth
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData
                .filter((data) => !data.name.startsWith("0x44444444"))
                .map((entry, index) => (
                  <tr key={index} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td class="px-6 py-4">
                      <Link href={`/profile?address=${entry.addr}`}>
                        {entry.name}
                      </Link>
                    </td>
                    <td class="px-6 py-4">{toNumber(entry.amount)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}
