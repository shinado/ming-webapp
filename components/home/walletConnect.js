import { useState, useEffect } from "react";
import { useStatus } from "../../app/WalletStatus"; // adjust the path as needed
import i18next from "../../app/i18n";

const WalletConnect = ({
  onBurning,
  onWalletConnected = () => {},
  isLoading = false,
}) => {
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
        window.location.href = "/freemint";
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
          {connecting ? i18next.t("home.button.connecting") : i18next.t("home.button.connect")}
        </button>
      );
    } else if (status.balance !== "0") {
      return (
        <button
          className="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onBurning}
          disabled={loading}
        >
          {loading ? i18next.t("home.button.burning") : i18next.t("home.button.burn")}
        </button>
      );
    } else {
      return (
        <button
          className="mt-8 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleGetMing}
        >
            {i18next.t("home.button.getming")}
        </button>
      );
    }
  };

  return <div>{renderButton()}</div>;
};

export default WalletConnect;
