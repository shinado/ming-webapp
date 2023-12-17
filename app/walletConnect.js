import { useState, useEffect } from "react";
import BigNumber from "bignumber.js";
const { ethers } = require("ethers");
const { abi } = require("./abi/MingCoin.json");
import { useStatus } from "./WalletStatus"; // adjust the path as needed

const WalletConnect = ({ onBurning, onWalletConnected = () => {}, isLoading = false }) => {
  const { connecting, status, checkStatus, connectWallet } = useStatus();
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    onWalletConnected(status.address, status.balance);
  }, [status.balance]);

  const handleGetMing = async () => {
    try {
      const response = await fetch("/api/checkFundStatus");
      const data = await response.json();

      console.log("isFundOver: ", data.isFundOver);
      if (data.isFundOver === "true") {
        window.open(
          "https://app.uniswap.org/tokens/ethereum/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "_blank"
        );
      } else {
        window.location.href = "/fund";
      }
    } catch (error) {
      console.error("Error checking fund status:", error);
    }
  };

  const renderButton = () => {
    if (status.address === "") {
      return (
        <button
          className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={connectWallet}
          disabled={connecting}
        >
          {connecting ? "Connecting..." : "Connect Wallet"}
        </button>
      );
    } else if (status.balance !== "0") {
      return (
        <button
          className="mt-8 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onBurning}
          disabled={loading}
        >
          Burn $MING
        </button>
      );
    } else {
      return (
        <button
          className="mt-8 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleGetMing}
        >
          Get $MING Now
        </button>
      );
    }
  };

  return <div>{renderButton()}</div>;
};

export default WalletConnect;
