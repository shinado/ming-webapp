import React, { useEffect, useState } from "react";

import TextVotings from "./TextVotings";
import ImageVotings from "./ImageVotings";

import {
  Card,
  Button,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import Image from "next/image";

const { abi } = require("../../abi/MingCoin.json");
const { ethers } = require("ethers");
import { createTheme, ThemeProvider } from "@mui/material/styles";
import i18next from "../../app/i18n";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const ViewProfileDialog = ({
  address,
  open,
  onClose,
  onUpdate,
  values,
  type,
  onVote,
  onAdd,
}) => {
  const contents = {
    1: {
      title: i18next.t("dialog.edit.banner"),
      label: "",
    },
    2: {
      title: i18next.t("dialog.edit.avatar"),
      label: "",
    },
    3: {
      title: i18next.t("dialog.edit.bio"),
      label: i18next.t("profile.page.bio"),
    },
  }[type];

  let desc = "";
  if (type == 1) {
    desc =
      values.length == 0 ? (
        <div variant="body1" sx={{ marginBottom: 2 }}>
          Upload a profile for banner.
        </div>
      ) : (
        <div variant="body1" sx={{ marginBottom: 2 }}>
          {i18next.t("dialog.edit.profile.body") + " "}
          <a href="#">{i18next.t("dialog.how.votes.work")}</a>.
        </div>
      );
  } else if (type == 2) {
    desc =
      values.length == 0 ? (
        <div variant="body1" sx={{ marginBottom: 2 }}>
          Upload a profile for avatar.
        </div>
      ) : (
        <div variant="body1" sx={{ marginBottom: 2 }}>
          {i18next.t("dialog.edit.profile.body") + " "}
          <a href="#">{i18next.t("dialog.how.votes.work")}</a>.
        </div>
      );
  } else if (type == 3) {
    desc =
      values.length == 0 ? (
        <div variant="body1" sx={{ marginBottom: 2 }}>
          Add a bio.
        </div>
      ) : (
        <div variant="body1" sx={{ marginBottom: 2 }}>
          {i18next.t("dialog.edit.profile.body") + " "}
          <a href="#">{i18next.t("dialog.how.votes.work")}</a>.
        </div>
      );
  }

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleVote = async (value) => {
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

          console.log("updateProfile(%s, %s, %s)", type, address, value);
          const tx = await contractWithSigner.updateProfile(
            type,
            address,
            value,
            ethers.parseEther(amount.toString())
          );
          // Wait for the transaction to be confirmed
          await tx.wait();
          onUpdate(value);

          setLoading(false);
        } catch (error) {
          console.log("Transaction failed:", error);
          setLoading(false);
        }
      }
    } else {
      console.log("Install MetaMask");
    }

    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <Modal
      onClose={handleClose}
      show={open}
      size="6xl"
      popup
      className="dark:bg-black"
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {contents.title}
          </h3>
          <div>{desc}</div>
          {type == 3 ? (
            <TextVotings
              data={values}
              onVote={(item) => {
                onVote(item);
              }}
            />
          ) : (
            <ImageVotings
              data={values}
              onVote={(item) => {
                onVote(item);
              }}
            />
          )}

          <div className="w-full">
            <Button onClick={onAdd}>Add</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewProfileDialog;
