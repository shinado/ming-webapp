import React, { useState, useEffect, forwardRef } from "react";
import BigNumber from "bignumber.js";
const { ethers } = require("ethers");

import MingCoin from "./abi/MingCoin.json";
import WalletConnect from "./walletConnect";
const abi = MingCoin.abi;

const Burn = forwardRef((props, ref) => {
  const [balance, setBalance] = useState("");
  console.log("ref is: ", ref);

  // useEffect(() => {
  //   setBalance(props.mingBalance);
  // }, [props.mingBalance]);

  const fetchMingBalance = async (address) => {
    console.log("fetchMingBalance()");
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider) {
        const contract = new ethers.Contract(
          process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
          abi,
          provider
        );

        const balance = await contract.balanceOf(address);
        console.log("balance: " + balance);
        setBalance(BigNumber(balance).dividedBy(1e18).toString());
      } else {
        console.log("provider not found.");
      }
    } else {
      console.log("wallet not installed.");
    }
  };

  const [personName, setPersonName] = useState("");
  const [mingAmount, setMingAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBurnClick = async () => {
    setLoading(true);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider) {
        try {
          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
            abi,
            provider
          );

          const signer = await provider.getSigner();
          const contractWithSigner = contract.connect(signer);

          // Convert the amount to Wei (1 ETH = 1e18 Wei)
          const amout = ethers.parseEther(mingAmount);
          const tx = await contractWithSigner.burn(personName, amout);
          // Wait for the transaction to be confirmed
          await tx.wait();
          console.log("Transaction successful");
          setLoading(false);
          fetchMingBalance();
        } catch (error) {
          console.log("Transaction failed:", error);
          setLoading(false);
        }
      }
    } else {
      console.log("Install MetaMask");
    }
  };

  return (
    <div ref={ref} className="bg-white py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Burn $MING</h2>
        <p className="mt-4 text-lg text-gray-500">
          Burn $MING to your ancestors for blessing, or a past-away celebrity.
          Visit <a href="/hallOfFame">Hall of Fame</a>
        </p>
        <p className="mt-1 text-lg text-gray-500">
          Your current $MING: {balance}
        </p>

        <div className="mt-8">
          <input
            type="text"
            placeholder="George Washington (February 22, 1732 – December 14, 1799)"
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
          <WalletConnect
            onBurning={handleBurnClick}
            onWalletConnected={(address, balance) => setBalance(balance)}
            isLoading={loading}
          />
          {/* <button
            className="mt-6 bg-red-600 disabled: hover:bg-red-800 disabled:bg-gray-200 disabled:text-gray-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleBurnClick}
            disabled={loading}
          >
            BURN
          </button> */}
        </div>
      </div>
    </div>
  );
});

/**
 * Your code shows that you are using the forwardRef API in React and assigning it to a constant named Burn. 
 * This approach is generally correct, but the error you're encountering suggests that the component might be
 *  missing an explicit display name, which is particularly important when using higher-order components or 
 * APIs like forwardRef.
 * To resolve this, you can explicitly set the displayName property on your component. 
 * Here's how you can modify your code:
 */
Burn.displayName = "Burn";
export default Burn;
