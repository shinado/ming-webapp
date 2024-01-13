import React, { useEffect, useState } from "react";

import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";

import {
  getContractValueFromDisplayable,
  getDisplayableValueFromContract,
  getImageUrl,
} from "@/app/public_api";
import BigNumber from "bignumber.js";

const { abi } = require("../../abi/MingCoin.json");
const { ethers } = require("ethers");
import i18next from "../../app/i18n";

const AddProfileDialog = ({
  address,
  open,
  onClose,
  onUpdate,
  initValue,
  values,
  type,
  editable,
}) => {
  const contains = values.some((element) => {
    return element.key == initValue.key;
  });
  console.log("contains", contains);

  const [isVotingEnabled, setVotingEnabled] = useState(false);
  const [value, setValue] = useState("");

  //only used for bio
  useEffect(() => {
    setValue(initValue.key);
    if (contains) setVotingEnabled(true);
  }, [initValue]);

  let contents;
  let body;
  let button;
  let buttoning;

  if (values.length == 0) {
    contents = {
      1: {
        title: i18next.t("dialog.add.banner"),
        label: "",
      },
      2: {
        title: i18next.t("dialog.add.avatar"),
        label: "",
      },
      3: {
        title: i18next.t("dialog.add.bio"),
        label: i18next.t("profile.page.bio"),
      },
    }[type];
    button = "Add";
    buttoning = "Adding";

    body = (
      <div variant="body1" sx={{ marginBottom: 2 }}>
        {i18next.t("dialog.edit.profile.first") + " "}
        <a href="#">{i18next.t("dialog.how.votes.work")}</a>.
      </div>
    );
  } else {
    if (contains) {
      contents = {
        1: {
          title: i18next.t("dialog.vote.banner"),
          label: "",
        },
        2: {
          title: i18next.t("dialog.vote.avatar"),
          label: "",
        },
        3: {
          title: i18next.t("dialog.vote.bio"),
          label: i18next.t("profile.page.bio"),
        },
      }[type];
      button = i18next.t("dialog.vote.button");
      buttoning = i18next.t("dialog.vote.buttoning");
    } else {
      contents = {
        1: {
          title: i18next.t("dialog.add.banner"),
          label: "",
        },
        2: {
          title: i18next.t("dialog.add.avatar"),
          label: "",
        },
        3: {
          title: i18next.t("dialog.add.bio"),
          title: "Add Bio",
          label: i18next.t("profile.page.bio"),
        },
      }[type];
      button = i18next.t("dialog.add.button");
      buttoning = i18next.t("dialog.add.buttoning");
    }

    const topVoted = [...values].sort((a, b) => {
      return BigNumber(b.value).minus(a.value);
    })[0];

    console.log("topVoted", topVoted.value);
    console.log("initValue", initValue.value);

    if (topVoted.key == initValue.key) {
      body = (
        <div variant="body1" sx={{ marginBottom: 2 }}>
          {i18next.t("dialog.edit.profile.ontop") + " "}
          <a href="#">{i18next.t("dialog.how.votes.work")}</a>.
        </div>
      );
    } else if (topVoted.value == 0) {
      body = (
        <div variant="body1" sx={{ marginBottom: 2 }}>
          {i18next.t("dialog.edit.profile.morethan").replace("{diff}", 1) + " "}
          <a href="#">{i18next.t("dialog.how.votes.work")}</a>.
        </div>
      );
    } else if (topVoted.value > initValue.value) {
      const diff =
        getDisplayableValueFromContract(topVoted.value) -
        getDisplayableValueFromContract(initValue.value);
      body = (
        <div variant="body1" sx={{ marginBottom: 2 }}>
          {i18next.t("dialog.edit.profile.morethan").replace("{diff}", diff) + " "}
          <a href="#">{i18next.t("dialog.how.votes.work")}</a>.
        </div>
      );
    }
  }

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleSave = async () => {
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
            getContractValueFromDisplayable(amount.toString())
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

  const addVotes = () => {
    console.log("addVotes");
    setVotingEnabled(true);
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
    <Modal onClose={handleClose} show={open} size="4xl" popup>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {contents.title}
          </h3>
          <div>{body}</div>

          {type == 3 ? (
            editable ? (
              <div>
                <div class="text-base font-bold">{contents.label}</div>
                <Textarea
                  autoFocus
                  margin="dense"
                  id="profile"
                  label={contents.label}
                  type="text"
                  fullWidth
                  value={value}
                  onChange={handleValueChange}
                />
              </div>
            ) : (
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {value}
              </h3>
            )
          ) : type == 1 ? (
            <img class="h-300 max-w-full" src={getImageUrl(value)} />
          ) : (
            <img class="h-300 max-w-full" src={getImageUrl(value)} />
          )}

          {isVotingEnabled ? (
            <div>
              <div class="text-base font-bold">Votes</div>
              <TextInput
                id="amount"
                type="number"
                placeholder="44444"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </div>
          ) : (
            <div class="text-blue-500  cursor-pointer" onClick={addVotes}>
              {i18next.t("dialog.add.votes")}
            </div>
          )}

          <div className="w-full">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? buttoning : button}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddProfileDialog;
