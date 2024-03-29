import React, { createContext, useState, useContext } from "react";

const WalletStatus = createContext({
  status: { address: "", balance: "" },
  connecting: false,
});
export const useStatus = () => useContext(WalletStatus);

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState({
    address: "",
    balance: "",
  });

  const [connecting, setConnecting] = useState(false);

  //get balance
  const onAddressChanged = async (address) => {
    console.log("address changed: " + address);
    const response = await fetch(
      "/api/getBalanceOf?userAddress=" +
        address +
        "&contractAddress=" +
        process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS
    );
    const data = await response.json();
    const balance = data.balance;

    setStatus({
      address: address,
      balance: balance,
    });
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
          onAddressChanged("");
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
        onAddressChanged("");
      }
    } else {
      console.log("Ethereum provider is not available");
      onAddressChanged("");
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
                  chainId: chainId,
                  chainName: "OP Sepolia",
                  rpcUrls: ["https://sepolia.optimism.io/"],
                  nativeCurrency: {
                    name: "Sepolia ETH",
                    symbol: "ETH",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://sepolia-optimistic.etherscan.io/"],
                },
              ],
            });
          } catch (addError) {
            console.error("Failed to add Sepolia testnet:", addError);
          }
        } else {
          console.error("Failed to switch to Goerli testnet:", switchError);
        }
      }
    }
  };

  const connectWallet = async () => {
    // firebase.analytics().logEvent("connect_wallet_click");
    setConnecting(true);

    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        //op sepolia
        await switchNetwork("0xAA37DC");
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
    <WalletStatus.Provider
      value={{ connecting, status, checkStatus, connectWallet }}
    >
      {children}
    </WalletStatus.Provider>
  );
};
