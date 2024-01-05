import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextVotings from "./TextVotings";
import ImageVotings from "./ImageVotings";

const { abi } = require("../../app/abi/MingCoin.json");
const { ethers } = require("ethers");

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
      title: "Edit Banner",
      label: "IPFS CID",
    },
    2: {
      title: "Edit Portrait",
      label: "IPFS CID",
    },
    3: {
      title: "Edit Bio",
      label: "Bio",
    },
  }[type];

  let desc = "";
  if (type == 1) {
    desc =
      values.length == 0 ? (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Upload a profile for banner.
        </Typography>
      ) : (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Anyone with $MING is able to vote for the profile. The one with most votes will be displayed on the profile page.
          You can vote for an existing banner or{" "}
          <Link onClick={onAdd}>add a new one</Link>. Learn more about{" "}
          <Link href="#">how votes work</Link>.
        </Typography>
      );
  } else if (type == 2) {
    desc =
      values.length == 0 ? (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Upload a profile for portrait.
        </Typography>
      ) : (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Anyone with $MING is able to vote for the profile. The one with most votes will be displayed on the profile page.
          You can vote for an existing portrait or{" "}
          <Link onClick={onAdd}>add a new one</Link>. Learn more about{" "}
          <Link href="#">how votes work</Link>.
        </Typography>
      );
  } else if (type == 3) {
    desc =
      values.length == 0 ? (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Add a bio.
        </Typography>
      ) : (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Anyone with $MING is able to vote for the bio. The one with most votes will be displayed on the profile page.
          You can vote for an existing bio or <Link href="">add a new one</Link>
          . Learn more about <Link href="#">how votes work</Link>.
        </Typography>
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
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{contents.title}</DialogTitle>
      <DialogContent>
        {desc}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewProfileDialog;
