"use client";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import i18next from "../../app/i18n";
import MingCoin from "../../abi/MingCoin.json";
import { getContractValueFromDisplayable } from "@/app/public_api";
const abi = MingCoin.abi;
const { ethers } = require("ethers");

export default function BurningDialog({
  openModal,
  onModalClose,
  address,
  onBurning,
}) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState(false);
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

          const amountOfMing = getContractValueFromDisplayable(amount);
          const tx = await contractWithSigner.burnToAddress(
            address,
            amountOfMing,
            message
          );

          onBurning();

          // Wait for the transaction to be confirmed
          await tx.wait();
          setLoading(false);

          onModalClose(1);
          // window.href.navigate("/profile?address=" + address);
        } catch (error) {
          console.log("Transaction failed:", error);
          setLoading(false);
          onModalClose(-1);
        }
      }
    } else {
      console.log("Install MetaMask");
    }
  };

  return (
    <Modal
      show={openModal}
      size="md"
      onClose={() => {
        onModalClose(0);
      }}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
            {i18next.t("dialog.burn.title")}
          </h3>
          <div>
            <div className="mb-2 block">
              <Label value={i18next.t("dialog.burn.amount2burn")} />
            </div>
            <TextInput
              id="amount"
              type="number"
              placeholder="44444"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
            />
          </div>

          {displayMessage ? (
            <div>
              <div className="mb-2 block">
                <Label value={i18next.t("home.burn.form.message")} />
              </div>
              <TextInput
                className="mt-0"
                placeholder={i18next.t("home.burn.form.message.hint")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          ) : (
            <div
              class="text-left text-blue-700  cursor-pointer"
              onClick={() => {
                setDisplayMessage(true);
              }}
            >
              {i18next.t("home.burn.add.message")}
            </div>
          )}

          <div className="w-full">
            <Button onClick={handleBurnClick} disabled={loading}>
              {loading
                ? i18next.t("home.button.burning")
                : i18next.t("home.button.burn")}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
