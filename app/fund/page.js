"use client";
import { useState, useEffect } from "react";
// import { ethers } from "ethers";
import Funding from "../abi/Funding.json";
import MingCoin from "../abi/MingCoin.json";
const { ethers } = require("ethers");
console.log(ethers);

const fundingABI = Funding.abi;
const mingABI = MingCoin.abi;

export default function Fund() {
  const [totalFunds, setTotalFunds] = useState(0);
  const [fundAmount, setFundAmount] = useState("");

  async function fetchContractData() {
    const response = await fetch(
      "/api/getBalanceOf?userAddress=" +
        process.env.NEXT_PUBLIC_FUND_CONTRACT_ADDRESS +
        "&contractAddress=" +
        process.env.NEXT_PUBLIC_WETH_CONTRACT_ADDRESS
    );
    const data = await response.json();

    if (data.balance) {
      setTotalFunds(data.balance); // Convert the result to ETH if needed
    }
  }

  useEffect(() => {
    fetchContractData();
  }, []);

  const handleFund = async () => {
    // TODO: Implement funding logic using the contract
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

          const mingContract = new ethers.Contract(
            process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
            mingABI,
            provider
          );

          const signerAddress = await signer.getAddress();
          const balanceOfMing = await mingContract.balanceOf(signerAddress);
          alert("Funding succeed, balance is: " + balanceOfMing);
        } catch (e) {
          console.log("Error: " + e);
        }
      }
    } else {
      console.log("Install MetaMask");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-3xl font-bold mb-2">Fund $MING</div>
      <div className="text-xl mb-4">Initiate $MING with a fair launch</div>
      <div className="text-lg font-semibold mb-2">How does it work?</div>
      <div className="mb-4 text-center max-w-md">
        All funds will be sent to the Funding contract and after funding is
        over, after which you receive the same amount of $MING proportionate to
        the amount of ETH you donated. The ETH you funded will be sent to
        Uniswap to provide liquidity. For more information, please{" "}
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
        onChange={(e) => setFundAmount(e.target.value)}
        placeholder="Amount of ETH"
        className="p-2 border border-gray-300 rounded text-black"
      />
      <button
        onClick={handleFund}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Fund
      </button>
    </div>
  );
}
