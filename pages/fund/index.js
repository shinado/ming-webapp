"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Funding from "../../abi/Funding.json";
import "../../app/globals.css";
import i18next from "../../app/i18n";
import { getTotalMinted } from "@/app/public_api";
const { ethers } = require("ethers");

const fundingABI = Funding.abi;

export default function Fund() {
  const [totalFunds, setTotalFunds] = useState(0);
  const [fundAmount, setFundAmount] = useState("");
  const [amountOfMing, setAmountOfMing] = useState(0);
  const [loading, setIsLoading] = useState(false);

  async function fetchContractData() {
    const balance = await getTotalMinted();
    setTotalFunds(balance);
  }

  useEffect(() => {
    fetchContractData();
  }, []);

  const handleFund = async () => {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider) {
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_FUND_CONTRACT_ADDRESS,
          fundingABI,
          provider
        );
        const signer = await provider.getSigner();
        const fundingContract = contract.connect(signer);
        // Convert the amount to Wei (1 ETH = 1e18 Wei)
        const amountInWei = ethers.parseEther(fundAmount);
        try {
          const tx = await fundingContract.batchMint({
            value: amountInWei,
          });
          // Wait for the transaction to be confirmed
          await tx.wait();
          await fetchContractData();

          onNumberChange(0);
          setIsLoading(false);
          //show successful dialog
        } catch (e) {
          alert("Error: " + e);
          setIsLoading(false);
        }
      }
    } else {
      console.log("Install MetaMask");
      setIsLoading(false);
    }
  };

  const onNumberChange = (value) => {
    setFundAmount(value);
    setAmountOfMing(value * 5005005005);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen px-20">
      <div className="flex flex-col items-left justify-center md:w-2/3">
        <div className="text-6xl font-bold mb-2">
          {i18next.t("funding.title1")}
        </div>
        {/* <div className="text-6xl font-bold mb-2">
          {i18next.t("funding.title2")}
        </div> */}
        <div className="text-left">
          {i18next.t("funding.body") + " "}
          <Link
            href="LINK_TO_WHITEPAPER"
            className="text-blue-500 hover:text-blue-700"
          >
            {i18next.t("funding.readwhitepaper")}
          </Link>
          , {" " + i18next.t("global.or")}
          <Link
            href="LINK_TO_WHITEPAPER"
            className="text-blue-500 hover:text-blue-700"
          >
            {i18next.t("funding.viewcontract")}
          </Link>
        </div>

        <div className="text-sm">{i18next.t("funding.note")}</div>

        <div className="text-l font-bold mt-6">
          {i18next.t("freemint.process") +
            " " +
            totalFunds +
            "(444,444,444,444) " +
            (totalFunds / 444444444444) * 100 +
            "%"}
        </div>

        <div className="flex flex-row mt-8">
          <input
            type="number"
            value={fundAmount}
            onChange={(e) => onNumberChange(e.target.value)}
            placeholder="ETH"
            className="p-2 border border-gray-300 rounded text-black"
          />
          <button
            onClick={handleFund}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? i18next.t("funding.funding") : i18next.t("funding.fund")}
          </button>
        </div>

        <div className="text-sm mb-4 mt-1">
          {i18next.t("funding.receive") + amountOfMing.toLocaleString()} $MING
        </div>
      </div>

      <div className="flex flex-col md:w-1/3 justify-center ml-10">
        <img src="/icon_launch_large.png" alt="" className="w-full" />
      </div>
    </div>
  );
}
