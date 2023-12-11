"use client";
import { useState, useEffect } from "react";

export default function Fund() {
  const [totalFunds, setTotalFunds] = useState(0);
  const [fundAmount, setFundAmount] = useState("");

  useEffect(() => {
    async function fetchContractData() {
      const response = await fetch("/api/getFundingAmount");
      const data = await response.json();

      if (data.totalFunds) {
        setTotalFunds(data.totalFunds); // Convert the result to ETH if needed
      }
    }

    fetchContractData();
  }, []);

  const handleFund = async () => {
    // TODO: Implement funding logic using the contract
    console.log(`Funding with amount: ${fundAmount} ETH`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-2xl font-bold mb-4">
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
