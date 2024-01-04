import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const { abi } = require("../../app/abi/MingCoin.json");
const { ethers } = require("ethers");

const EditProfileDialog = ({
  address,
  open,
  onClose,
  onUpdate,
  initValue,
  type,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

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
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          You can either update the profile or vote for an{" "}
          <Link href="#">existing profile</Link>. Learn more about{" "}
          <Link href="#">how votes work</Link>.
        </Typography>
        <TextField
          autoFocus
          InputProps={{ readOnly: type !== 3 }}
          margin="dense"
          id="profile"
          label={contents.label}
          type="text"
          fullWidth
          variant="standard"
          value={value}
          onChange={handleValueChange}
        />

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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditProfileDialog.displayName = "EditProfileDialog";
export default EditProfileDialog;
