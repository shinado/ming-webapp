"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Funding from "../../abi/Funding.json";
import "../../app/globals.css";
import i18next from "../../app/i18n";
const { ethers } = require("ethers");

const fundingABI = Funding.abi;

export default function Fund() {
  const [totalFunds, setTotalFunds] = useState(0);
  const [fundAmount, setFundAmount] = useState("");
  const [amountOfMing, setAmountOfMing] = useState(0);
  const [loading, setIsLoading] = useState(false);

  async function fetchContractData() {
    const response = await fetch(
      "/api/getBalanceOf?userAddress=" +
        process.env.NEXT_PUBLIC_FUND_CONTRACT_ADDRESS +
        "&contractAddress=" +
        process.env.NEXT_PUBLIC_WETH_CONTRACT_ADDRESS
    );
    const data = await response.json();
    console.log("balance of funding: ", data);

    if (data.balance) {
      setTotalFunds(data.balance); // Convert the result to ETH if needed
    }
  }

  useEffect(() => {
    fetchContractData();
  }, []);

  const handleFund = async () => {
    //do nothing for now
    // setIsLoading(true);
    // if (typeof window.ethereum !== "undefined") {
    //   const provider = new ethers.BrowserProvider(window.ethereum);
    //   // const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   if (provider) {
    //     const contract = new ethers.Contract(
    //       process.env.NEXT_PUBLIC_FUND_CONTRACT_ADDRESS,
    //       fundingABI,
    //       provider
    //     );
    //     const signer = await provider.getSigner();
    //     const fundingContract = contract.connect(signer);

    //     // Convert the amount to Wei (1 ETH = 1e18 Wei)
    //     const amountInWei = ethers.parseEther(fundAmount);
    //     try {
    //       const tx = await fundingContract.fund4TestOnly({
    //         value: amountInWei,
    //       });
    //       // Wait for the transaction to be confirmed
    //       await tx.wait();

    //       const amountReceived = amountOfMing;
    //       fetchContractData();
    //       setIsLoading(false);
    //       onNumberChange(0);
    //       alert("You've recieved " + amountReceived + " $MING!");
    //     } catch (e) {
    //       alert("Error: " + e);
    //       setIsLoading(false);
    //     }
    //   }
    // } else {
    //   console.log("Install MetaMask");
    //   setIsLoading(false);
    // }
  };

  const onNumberChange = (value) => {
    setFundAmount(value);
    setAmountOfMing(value * 500500500500.5);
  };

  return (
    <div className="flex flex-col md:flex-row mt-10 h-screen px-20">
      <div className="flex flex-col items-left justify-center md:w-2/3">
        <div className="text-6xl font-bold mb-2">
          {i18next.t("funding.title1")}
        </div>
        <div className="text-6xl font-bold mb-2">
          {i18next.t("funding.title2")}
        </div>
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

        <div className="text-l font-bold mt-2">
          {i18next.t("funding.raised") + totalFunds + " ETH"}
        </div>

        {/* <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
        <div
          class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
          style="width: 45%"
        ></div>
      </div> */}

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
