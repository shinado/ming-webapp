"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../../app/globals.css";
import i18next from "../../app/i18n";
import {
  getDisplayableValueFromContract,
  getTotalMinted,
} from "@/app/public_api";
const { ethers } = require("ethers");
const { abi } = require("../../abi/MingCoin.json");

export default function Fund() {
  const [totalFunds, setTotalFunds] = useState(0);
  const [myBalance, setMyBalance] = useState(0);
  const [loading, setIsLoading] = useState(false);

  async function fetchContractData() {
    const balance = await getTotalMinted();
    setTotalFunds(balance);
  }

  async function fetchMyBalance() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider) {
        try {
          const signer = await provider.getSigner();
          const response = await fetch(
            "/api/getBalanceOf?userAddress=" +
              signer.address +
              "&contractAddress=" +
              process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS
          );
          const data = await response.json();
          if (data.balance) {
            setMyBalance(getDisplayableValueFromContract(data.balance)); // Convert the result to ETH if needed
          }
        } catch (e) {}
      }
    }
  }

  useEffect(() => {
    fetchContractData();
    fetchMyBalance();
  }, []);

  const handleFund = async () => {
    // TODO: Implement funding logic using the contract
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider) {
        try {
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
            abi,
            provider
          );

          const ming = contract.connect(signer);

          await ming.mint();

          fetchContractData();
          fetchMyBalance();
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
        }

        // } catch (e) {
        //   alert("Error: " + e);
        //   setIsLoading(false);
        // }
      }
    } else {
      console.log("Install MetaMask");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row mt-10 h-screen px-20">
      <div className="flex flex-col items-left justify-center md:w-2/3">
        <div className="text-7xl font-bold mb-2">
          {i18next.t("freemint.title1")}
        </div>
        <div className="text-7xl font-bold mb-2">
          {i18next.t("freemint.title2")}
        </div>
        <div className="text-left">
          {i18next.t("freemint.body") + " "}
          <Link
            href="LINK_TO_WHITEPAPER"
            className="text-blue-500 hover:text-blue-700"
          >
            {i18next.t("freemint.readwhitepaper")}
          </Link>
          , {" " + i18next.t("global.or") + " "}
          <Link
            href="LINK_TO_WHITEPAPER"
            className="text-blue-500 hover:text-blue-700"
          >
            {i18next.t("freemint.viewcontract")}
          </Link>
        </div>

        <div className="text-l font-bold mt-2">
          {i18next.t("freemint.balance") + " " + totalFunds + " $MING"}
        </div>

        <div className="text-l font-bold mt-2">
          {i18next.t("freemint.mybalance") + " " + myBalance + " $MING"},{" "}
          <Link href="/burn" className="text-blue-500 hover:text-blue-700">
            {i18next.t("global.burn")}
          </Link>
        </div>

        {/* <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
        <div
          class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
          style="width: 45%"
        ></div>
      </div> */}

        <div className="flex flex-row mt-8">
          <button
            onClick={handleFund}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading
              ? i18next.t("freemint.minting")
              : i18next.t("freemint.mint")}
          </button>
          <button
            className="ml-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
            disabled="true"
          >
            Batch Mint (coming soon)
          </button>
        </div>
      </div>

      <div className="flex flex-col md:w-1/3 justify-center ml-10">
        <img src="/icon_launch_large.png" alt="" className="w-full" />
      </div>
    </div>
  );
}
