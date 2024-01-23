import React from "react";
import { useState, useEffect } from "react";
import i18next from "../../app/i18n";
import { TextInput, Button, Modal } from "flowbite-react";
const { ethers } = require("ethers");
import Link from "next/link";
import { getContractValueFromDisplayable } from "@/app/public_api";
const { abi } = require("../../abi/MingCoin.json");

function getMintAmount(eth) {
  if (eth <= 0) {
    return "";
  } else if (eth >= 20) {
    return i18next.t("freemint.batch.exceed");
  } else {
    return i18next.t("freemint.you.receive") + eth * 106666666 + " $MING";
  }
}

const BatchMintDialog = ({ open, handleClose, onMintSuccessful }) => {
  const [ethAmount, setEthAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBatchMint = async () => {
    setIsLoading(true);
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
        const fundingContract = contract.connect(signer);
        // Convert the amount to Wei (1 ETH = 1e18 Wei)
        const amountInWei = getContractValueFromDisplayable(ethAmount);
        try {
          const tx = await fundingContract.batchMint({
            value: amountInWei,
          });
          // Wait for the transaction to be confirmed
          await tx.wait();
          setIsLoading(false);
          
          //show successful dialog
          const amountMinted = ethAmount * 106666666;
          onMintSuccessful(amountMinted);
          handleClose();
        } catch (e) {
          alert("Error: " + e);
          setIsLoading(false);
        }
      }
    } else {
      console.log("Install MetaMask");
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={handleClose} show={open} size="xl" popup>
      <Modal.Header />
      <Modal.Body>
        <div className="">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            {i18next.t("freemint.batch.title")}
          </h3>
          <div className="mt-6">
            {i18next.t("freemint.batch.body")}
            <Link href={process.env.NEXT_PUBLIC_WHITEPAPER}>
              {i18next.t("global.readwhitepaper")}
            </Link>
          </div>
          <div className="text-sm">{i18next.t("freemint.batch.note")}</div>

          <div className="text-sm font-bold mt-6">
            {i18next.t("freemint.batch.pay")}
          </div>

          <div className="w-full flex mt-1">
            <TextInput
              autoFocus
              margin="dense"
              id="fund"
              label="batch"
              type="number"
              fullWidth
              value={ethAmount}
              placeholder="ETH"
              onChange={(e) => {
                setEthAmount(e.target.value);
              }}
            />
            <Button
              className="ml-2"
              onClick={() => {
                handleBatchMint();
              }}
              disabled={isLoading}
            >
              {isLoading
                ? i18next.t("freemint.batch.buttoning")
                : i18next.t("freemint.batch.button")}
            </Button>
          </div>

          <div className="text-sm mt-2">{getMintAmount(ethAmount)}</div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BatchMintDialog;
