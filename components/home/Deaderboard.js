"use client";
import { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
import MingCoin from "../../abi/MingCoin.json";
import Link from "next/link";
const { ethers } = require("ethers");
const mingABI = MingCoin.abi;
import i18next from "../../app/i18n";
import "../../app/globals.css";
import { useStatus } from "../../app/WalletStatus";

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

export default function Deaderboard({ displayButton, maxDisplay }) {
  const { chain } = useStatus();
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    setLeaderboardData([]);
    listBurnings();
  }, [chain]);

  const listBurnings = async () => {
    if (chain == "eth") {
      const provider = new ethers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_INFURA_URL
      );

      if (provider) {
        //I'm calling this view function in contract getBurningList(), how do I assign the chainId with this contract to make sure it's calling from the correct chain?
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
          mingABI,
          provider
        );

        try {
          const list = await contract.getBurningList();
          if (list.length === 0) {
            return [];
          }

          //display 10 at most
          const sorted = [...list].sort((a, b) => {
            return new BigNumber(b.amount)
              .minus(new BigNumber(a.amount))
              .toNumber();
          });

          setLeaderboardData(sorted.slice(0, maxDisplay));
          return list;
        } catch (e) {
          return [];
        }
      }
    } else if (chain == "btc") {
      //todo
    }
  };

  const table = (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              {i18next.t("deaderboard.rank")}
            </th>
            <th scope="col" className="px-6 py-3">
              {i18next.t("deaderboard.name")}
            </th>
            <th scope="col" className="px-6 py-3">
              {i18next.t("deaderboard.wealth")}
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData
            .filter((data) => !data.name.startsWith("0x44444444"))
            .map((entry, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">
                  <Link href={`/profile?address=${entry.addr}`}>
                    {entry.name}
                  </Link>
                </td>
                <td className="px-6 py-4">{toNumber(entry.amount)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="App bg-slate-800 flex justify-center items-center min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl text-white font-bold text-center my-6">
          {chain.toUpperCase()} {i18next.t("deaderboard.title")} 
        </h1>

        {table}

        {displayButton && (
          <div className="text-center">
            <button
              className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                window.location.href = "/burn";
              }}
            >
              {i18next.t("deaderboard.create")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
