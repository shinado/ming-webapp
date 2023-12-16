import React, { createContext, useState, useContext } from "react";
import BigNumber from "bignumber.js";
const { ethers } = require("ethers");
const { abi } = require("./abi/MingCoin.json");

const WalletStatus = createContext();
export const useStatus = () => useContext(WalletStatus);

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState({
    address: "",
    balance: ""
  });

  const [connecting, setConnecting] = useState(false);

  //get balance
  const onAddressChanged = async (address) => {
    console.log("address changed: " + address);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
        abi,
        provider
      );

      const balance = await contract.balanceOf(address);
      console.log("balance: " + balance);
      const number = BigNumber(balance).dividedBy(1e18).toString();

      setStatus({
        address: address,
        balance: number,
      });
    
    } catch (error) {
      console.error("Error fetching balance:", error);
      setStatus({
        address: address,
        balance: "",
      });
    }
  };

  // Function to update status
  const checkStatus = async () => {
    // Perform your status check logic here
    // For example, fetching data from an API
    if (window.ethereum) {
      try {
        // Request the currently connected accounts
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          // Wallet is connected and at least one account is available
          const account = accounts[0];
          onAddressChanged(account);
        } else {
          // Wallet is not connected
          console.log("Wallet is not connected");
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    } else {
      console.log("Ethereum provider is not available");
    }
  };

  const switchNetwork = async (chainId) => {
    // Check if Goerli network (chainId: 5) is selected
    if (window.ethereum.chainId !== chainId) {
      try {
        // Request to switch to the Goerli testnet
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainId }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            // Request to add the Goerli testnet
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: goerliChainId,
                  chainName: "Goerli Test Network",
                  rpcUrls: [
                    "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID",
                  ],
                  nativeCurrency: {
                    name: "Goerli ETH",
                    symbol: "GOR",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://goerli.etherscan.io"],
                },
              ],
            });
          } catch (addError) {
            console.error("Failed to add Goerli testnet:", addError);
          }
        } else {
          console.error("Failed to switch to Goerli testnet:", switchError);
        }
      }
    }
  };

  const connectWallet = async () => {
    setConnecting(true);
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await switchNetwork("0x5");
        onAddressChanged(accounts[0]);

        setConnecting(false);
      } catch (error) {
        alert("Error connecting to wallet:", error);
        setConnecting(false);
      }
    } else {
      alert("MetaMask not installed");
      setConnecting(false);
    }
  };

  return (
    <WalletStatus.Provider value={{ connecting, status, checkStatus, connectWallet }}>
      {children}
    </WalletStatus.Provider>
  );
};
