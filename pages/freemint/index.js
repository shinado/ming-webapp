"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "../../app/globals.css";
import i18next from "../../app/i18n";
import {
  getDisplayableValueFromContract,
  getTotalMinted,
} from "@/app/public_api";
import MintSucceedDialog from "@/components/freemint/MintSucceedDialog";
import BatchMintDialog from "@/components/freemint/BatchMintDialog";
import Navigation from "@/components/home/navbar";
import { StatusProvider } from "@/app/WalletStatus";
const { ethers } = require("ethers");
const { abi } = require("../../abi/MingCoin.json");

export default function Fund() {
  const [totalFunds, setTotalFunds] = useState(0);
  const [myBalance, setMyBalance] = useState(0);
  const [mintAmount, setMintAmount] = useState(10);
  const [loading, setIsLoading] = useState(false);
  const [showSuccessfulDialog, setShowSuccessfulDialog] = useState(false);
  const [showBatchMintDialog, setShowBatchMintDialog] = useState(false);

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

  function showMintSuccessDialog(amount){
    setMintAmount(amount);
    setShowSuccessfulDialog(true);
  }

  const handleMint = async () => {
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

          await fetchContractData();
          await fetchMyBalance();

          showMintSuccessDialog(44444);
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
    <StatusProvider>
      <Navigation selected="freemint" />
      <div className="flex flex-col md:flex-row h-screen px-20">
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
              href={process.env.NEXT_PUBLIC_WHITEPAPER}
              className="text-blue-500 hover:text-blue-700"
            >
              {i18next.t("freemint.readwhitepaper")}
            </Link>
            , {" " + i18next.t("global.or") + " "}
            <Link
              href={process.env.NEXT_PUBLIC_LINK_TO_CONTRACT}
              className="text-blue-500 hover:text-blue-700"
            >
              {i18next.t("freemint.viewcontract")}
            </Link>
          </div>

          <div className="text-l mt-6">
            <span className="font-bold ">{i18next.t("freemint.process")}</span>
            {totalFunds + "(444,444,444,444) "}
            <span className="text-red-500 font-bold">
              {(totalFunds / 444444444444) * 100 + "%"}
            </span>
          </div>

          <div className="text-l">
            <span className="font-bold ">
              {i18next.t("freemint.mybalance")}
            </span>
            {" " + myBalance + " $MING"}
          </div>

          {/* <div class="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
        <div
          class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
          style="width: 45%"
        ></div>
      </div> */}

          <div className="flex flex-row mt-8">
            <button
              onClick={handleMint}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading
                ? i18next.t("freemint.minting")
                : i18next.t("freemint.mint")}
            </button>
            <button
              className="ml-4 hover:bg-pink-700 bg-pink-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setShowBatchMintDialog(true);
              }}
            >
              {i18next.t("freemint.batch.title")}
            </button>
          </div>
        </div>

        <div className="flex flex-col md:w-1/3 justify-center ml-10">
          <img src="/icon_launch_large.png" alt="" className="w-full" />
        </div>
      </div>

      <MintSucceedDialog
        open={showSuccessfulDialog}
        amount={mintAmount}
        handleClose={() => {
          setShowSuccessfulDialog(false);
        }}
      />

      <BatchMintDialog
        open={showBatchMintDialog}
        handleClose={() => {
          setShowBatchMintDialog(false);
        }}
        onMintSuccessful={(amount)=>{
          fetchContractData();
          fetchMyBalance();
          showMintSuccessDialog(amount);
        }}
      />
    </StatusProvider>
  );
}
