import React, { useState, useRef } from "react";
import { MD5 } from "crypto-js";
const { ethers } = require("ethers");
import MingCoin from "./abi/MingCoin.json";

const abi = MingCoin.abi;

const Burn = ({ onBurning }) => {
  const [personName, setPersonName] = useState("");
  const [mingAmount, setMingAmount] = useState("");

  const handleBurnClick = async () => {
    const hashedName = MD5(personName).toString();
    const recipient = "0x44444444" + hashedName;

    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider) {
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
          abi,
          provider
        );

        const signer = await provider.getSigner();
        const contractWithSigner = contract.connect(signer);

        // Convert the amount to Wei (1 ETH = 1e18 Wei)
        const amout = ethers.parseEther(mingAmount);

        const tx = await contractWithSigner.burn(recipient, amout);
        // Wait for the transaction to be confirmed
        await tx.wait();
        console.log("Transaction successful");
      }
    } else {
      console.log("Install MetaMask");
    }
  };

  return (
    <div className="bg-white py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Burn $MING</h2>
        <p className="mt-4 text-lg text-gray-500">
          Burn $MING to your ancestors for blessing, or a past-away celebrity.
          {/* ... other elements ... */}
        </p>
        <div className="mt-8">
          <input
            type="text"
            placeholder="Name, information of the person"
            className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm text-black"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount of $MING"
            className="mt-4 p-3 block w-full border border-gray-300 rounded-md shadow-sm text-black"
            value={mingAmount}
            onChange={(e) => setMingAmount(e.target.value)}
          />
          <button
            className="mt-6 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleBurnClick}
          >
            BURN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Burn;
