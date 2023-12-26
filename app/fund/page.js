"use client";
import { useState, useEffect } from "react";
// import { ethers } from "ethers";
import Funding from "../abi/Funding.json";
import MingCoin from "../abi/MingCoin.json";
import { getFundingAmount } from "../public_api";
const { ethers } = require("ethers");

const fundingABI = Funding.abi;

export default function Fund() {
  const [totalFunds, setTotalFunds] = useState(0);
  const [fundAmount, setFundAmount] = useState("");
  const [amountOfMing, setAmountOfMing] = useState(0);
  const [loading, setIsLoading] = useState(false);

  async function fetchContractData() {
    const balance = await getFundingAmount();

    setTotalFunds(balance);
    // const response = await fetch(
    //   "/api/getBalanceOf?userAddress=" +
    //     process.env.NEXT_PUBLIC_FUND_CONTRACT_ADDRESS +
    //     "&contractAddress=" +
    //     process.env.NEXT_PUBLIC_WETH_CONTRACT_ADDRESS
    // );
    // const data = await response.json();

    // if (data.balance) {
    //   setTotalFunds(data.balance); // Convert the result to ETH if needed
    // }
  }

  useEffect(() => {
    fetchContractData();
  }, []);

  const handleFund = async () => {
    // TODO: Implement funding logic using the contract
    setIsLoading(true);
    console.log(`Funding with amount: ${fundAmount} ETH`);
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
          const tx = await fundingContract.fund4TestOnly({
            value: amountInWei,
          });
          // Wait for the transaction to be confirmed
          await tx.wait();

          const amountReceived = amountOfMing;
          fetchContractData();
          setIsLoading(false);
          onNumberChange(0)
          alert("You've recieved " + amountReceived + " $MING!");
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
    setAmountOfMing(value * 2222222222222);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-3xl font-bold mb-2">Fund $MING</div>
      <div className="text-xl mb-4">Initiate $MING with a fair launch</div>
      <div className="text-lg font-semibold mb-2">How does it work?</div>
      <div className="mb-4 text-center max-w-md">
        We set the initiatial $MING price at 1 ETH = 2,222,222,222,222 $MING,
        aiming to raise 100 ETH. After it reaches the funding goal, all funds
        will be sent to Uniswap, along with the other half of $MING to provide
        liquidity. For more information, please{" "}
        <a
          href="LINK_TO_WHITEPAPER"
          className="text-blue-500 hover:text-blue-700"
        >
          read the white paper
        </a>
        .
      </div>
      <div className="text-xl font-bold mb-4">
        Total Funds Raised: {totalFunds} ETH
      </div>

      <input
        type="number"
        value={fundAmount}
        onChange={(e) => onNumberChange(e.target.value)}
        placeholder="Amount of ETH"
        className="p-2 border border-gray-300 rounded text-black"
      />
      <div className="text-m font-bold mb-4 mt-1">
        You will receive: {amountOfMing} MING
      </div>
      <button
        onClick={handleFund}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? "Funding..." : "Fund"}
      </button>
    </div>
  );
}
