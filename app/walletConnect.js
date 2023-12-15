import { useState } from "react";

const WalletConnect = ({ onBurning }) => {
  const [userAddress, setUserAddress] = useState("");
  const [mingBalance, setMingBalance] = useState(0);

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

  const connectWalletHandler = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAddress(accounts[0]);

        await switchNetwork("0x5");

        const response = await fetch(
          "/api/getBalanceOf?contractAddress=" +
            process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS
        );
        const data = await response.json();
        setMingBalance(data.balance);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      console.log("Install MetaMask");
    }
  };

  const renderButton = () => {
    if (!userAddress) {
      return (
        <button
          className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={connectWalletHandler}
        >
          Connect Wallet
        </button>
      );
    } else if (!mingBalance) {
      return (
        <button
          className="mt-8 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onBurning}
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
