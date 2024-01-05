import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";
import { getContractValueFromDisplayable, getDisplayableValueFromContract, getImageUrl } from "@/app/public_api";
import BigNumber from "bignumber.js";

const { abi } = require("../../app/abi/MingCoin.json");
const { ethers } = require("ethers");

const Banner = styled(Paper)({
  position: "relative",
  height: 250,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const Portrait = styled(Avatar)({
  width: 240,
  height: 240,
  border: "3px solid white",
});

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
    if(contains) setVotingEnabled(true); 
  }, [initValue]);

  let contents;
  let body;
  let button;
  let buttoning;

  if (values.length == 0) {
    contents = {
      1: {
        title: "Add Banner",
        label: "IPFS CID",
      },
      2: {
        title: "Add Avatar",
        label: "IPFS CID",
      },
      3: {
        title: "Add Bio",
        label: "Bio",
      },
    }[type];
    button = "Add";
    buttoning = "Adding";

    body = (
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        You are the first one to edit the profile! Learn more about{" "}
        <Link href="#">how votes work</Link>.
      </Typography>
    );
  } else {
    if (contains) {
      contents = {
        1: {
          title: "Vote Banner",
          label: "IPFS CID",
        },
        2: {
          title: "Vote Avatar",
          label: "IPFS CID",
        },
        3: {
          title: "Vote Bio",
          label: "Bio",
        },
      }[type];
      button = "Vote";
      buttoning = "Voting";
    } else {
      contents = {
        1: {
          title: "Add Banner",
          label: "IPFS CID",
        },
        2: {
          title: "Add Avatar",
          label: "IPFS CID",
        },
        3: {
          title: "Add Bio",
          label: "Bio",
        },
      }[type];
      button = "Add";
      buttoning = "Adding";
    }

    const topVoted = [...values].sort((a, b) => {
      return BigNumber(b.value).minus(a.value);
    })[0];

    if (topVoted.key == initValue.key) {
      body = (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          This profile is already on top. Learn more about{" "}
          <Link href="#">how votes work</Link>.
        </Typography>
      );
    } else if (topVoted.value == 0) {
      body = (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          You'll need at least 1 vote to change the profile! Learn more about{" "}
          <Link href="#">how votes work</Link>.
        </Typography>
      );
    } else if (topVoted.value > initValue.value) {
      const diff = getDisplayableValueFromContract(topVoted.value - initValue.value);
      body = (
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          You'll need more than {diff} votes to change the profile! Learn more about{" "}
          <Link href="#">how votes work</Link>.
        </Typography>
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
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{contents.title}</DialogTitle>
      <DialogContent>
        {body}

        {type == 3 ? (
          editable ? (
            <TextField
              autoFocus
              margin="dense"
              id="profile"
              label={contents.label}
              type="text"
              fullWidth
              variant="standard"
              value={value}
              onChange={handleValueChange}
            />
          ) : (
            <Typography variant="body2" sx={{ marginBottom: 2 }}>
              {value}
            </Typography>
          )
        ) : type == 1 ? (
          <Banner
            style={{
              backgroundImage: `url(${getImageUrl(value)})`,
            }}
          />
        ) : (
          <Portrait src={getImageUrl(value)} />
        )}

        {isVotingEnabled ? (
          <TextField
            margin="dense"
            id="amount"
            label="Votes"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={handleAmountChange}
          />
        ) : (
          <Button onClick={addVotes}>Add Votes</Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? buttoning : button}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProfileDialog;
