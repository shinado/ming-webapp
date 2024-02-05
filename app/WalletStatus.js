import React, { createContext, useState, useContext } from "react";
import getBalance from "./okx";

const WalletStatus = createContext({
  status: { address: "", balance: "" },
  connecting: false,
});
export const useStatus = () => useContext(WalletStatus);

export const StatusProvider = ({ children }) => {
  const [chain, setChain] = useState("btc");

  const [status, setStatus] = useState({
    address: "",
    balance: "",
  });

  const [connecting, setConnecting] = useState(false);

  // Function to toggle theme
  const changeChain = (chain) => {
    setStatus({
      address: ".....",
      balance: 0,
    });
    setChain(chain);
    checkStatus(chain);
  };

  //get balance
  const onAddressChanged = async (address) => {
    console.log("address changed: " + address);

    if (address == "") {
      setStatus({
        address: "",
        balance: 0,
      });
      setConnecting(false);
    } else {
      if (chain == "btc") {
        // const response = await fetch(
        //   "/api/btc/getBalanceOf?userAddress=" + address + "&token=ming"
        // );

        const data = await getBalance("ming", address);
        const balance = data.balance;

        setStatus({
          address: address,
          balance: balance,
        });
        setConnecting(false);
      } else if (chain == "eth") {
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
        setConnecting(false);
      }
    }
  };

  // Function to update status
  const checkStatus = async (chain) => {
    console.log("checking status on ", chain);
    if (chain == "eth") {
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
    } else if (chain == "btc") {
      if (window.okxwallet) {
        const accounts = await window.okxwallet.bitcoin.requestAccounts();
        if (accounts.length > 0) {
          onAddressChanged(accounts[0]);
        } else {
          onAddressChanged("");
        }
      }
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
                  rpcUrls: ["https://rpc.ankr.com/eth_goerli"],
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
    // firebase.analytics().logEvent("connect_wallet_click");
    setConnecting(true);

    if (chain == "btc") {
      if (typeof window.okxwallet !== "undefined") {
        try {
          const result = await okxwallet.bitcoin.connect();
          const address = result.address;
          onAddressChanged(address);
        } catch (e) {
          alert(e);
          setConnecting(false);
        }
      } else {
        alert("OKX wallet not installed");
        setConnecting(false);
      }
    } else if (chain == "eth") {
      if (typeof window.ethereum !== "undefined") {
        try {
          // Request account access
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          await switchNetwork("0x5");
          onAddressChanged(accounts[0]);
        } catch (error) {
          alert("Error connecting to wallet:", error);
          setConnecting(false);
        }
      } else {
        alert("MetaMask not installed");
        setConnecting(false);
      }
    }
  };

  return (
    <WalletStatus.Provider
      value={{
        connecting,
        status,
        checkStatus,
        connectWallet,
        chain,
        changeChain,
      }}
    >
      {children}
    </WalletStatus.Provider>
  );
};
