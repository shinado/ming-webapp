"use client";
import React, { useState, useRef } from "react";
import {
  Box,
  Paper,
  Grid,
  Avatar,
  Typography,
  Button,
  IconButton,
  List,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";
import Transactions from "../../app/transaction";
import { getImageUrl, getProfileList } from "../../app/public_api";
import EditProfileDialog from "./EditProfileDialog";
const axios = require("axios");

const Banner = styled(Paper)({
  position: "relative",
  height: 300,
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden", // Ensure the pseudo-element doesn't overflow the banner boundaries
  "&:hover": {
    "&::before": {
      opacity: 0.5, // Show dim overlay on hover
    },
    "& .edit-icon": {
      visibility: "visible", // Ensure the icon is visible on hover
      opacity: 1,
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0, // Hidden by default
    transition: "opacity 0.3s ease-in-out",
    zIndex: 1, // Above the banner, below the icon
  },
});

const ProfileAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  border: "3px solid white",
  zIndex: 2,
  overflow: "hidden", // Ensure the pseudo-element doesn't overflow the banner boundaries
  "&:hover": {
    "&::before": {
      opacity: 0.5, // Show dim overlay on hover
    },
    "& .edit-icon": {
      visibility: "visible", // Ensure the icon is visible on hover
      opacity: 1,
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0, // Hidden by default
    transition: "opacity 0.3s ease-in-out",
    zIndex: 3, // Above the banner, below the icon
  },
});

const BioBox = styled(Box)({
  display: "flex",
  cursor: "pointer",
  "&:hover": {
    "&::before": {
      opacity: 0.5, // Show dim overlay on hover
    },
    "& .edit-icon": {
      visibility: "visible", // Ensure the icon is visible on hover
      opacity: 1,
    },
  },
});

const EditBioIconButton = styled(IconButton)({
  position: "absolute",
  zIndex: 4, // Above the dim overlay
  visibility: "hidden", // Hide by default
  opacity: 0,
  color: "white",
  transition: "visibility 0s, opacity 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "grey",
  },
});

// Ensure the IconButton has a higher zIndex than the ::before pseudo-element
const EditIconButton = styled(IconButton)({
  position: "absolute",
  top: "50%", // Center vertically
  left: "50%", // Center horizontally
  zIndex: 4, // Above the dim overlay
  visibility: "hidden", // Hide by default
  opacity: 0,
  color: "white",
  transition: "visibility 0s, opacity 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "grey",
  },
});

const EditButton = styled(Button)({
  position: "absolute",
});

const GhostProfile = ({ user }) => {
  const fileInputRef = useRef(null);

  const [dialogStatus, setDialogStatus] = useState({
    open: false,
    type: 1,
    init: "",
  });
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // const [dialogType, setDialogType] = useState(1);
  // const [dialogInitValue, setDialogInitValue] = useState("");

  const handleDialogClose = () => {
    setDialogStatus((prevStatus) => ({
      ...prevStatus,
      open: false,
    }));
  };


  const refreshProfile = async (type) => {
    getProfileList(type, user.address).then((result) => {
      if (result.length > 0) {
        const winner = [...result].sort((a, b) => {
          return BigNumber(b.value).minus(a.value);
        });
        console.log("winner:", winner[0].key);

        if (type == 3) {
          user.bio = winner[0].key;
        } else if (type == 2) {
          user.portrait = getImageUrl(winner[0].key);
        } else if (type == 1) {
          user.banner = getImageUrl(winner[0].key);
        }
      }
    });
  };

  function displayEditProfileDialog(type, initValue) {
    console.log("displayEditProfileDialog:", type, initValue);

    setDialogStatus((prevStatus) => ({
      ...prevStatus,
      open: true,
      type: type,
      init: initValue,
    }));
  }

  async function handleImageSelect(type, e) {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const response = await fetch("/api/uploadFile", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("ipfshash:", data.IpfsHash);
      displayEditProfileDialog(type, data.IpfsHash);
    }
  }

  function onEditBanner() {
    fileInputRef.current.click();
  }

  return (
    <div>
      {/* Banner */}
      {/* Banner */}
      <Banner style={{ backgroundImage: `url(${user.banner})` }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageSelect(1, e)}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <EditIconButton
          className="edit-icon"
          size="small"
          onClick={onEditBanner}
        >
          <EditIcon />
        </EditIconButton>
      </Banner>

      {/* User Info */}
      <Grid
        container
        sx={{ position: "relative", marginTop: "-60px", padding: 2 }}
      >
        <Grid item>
          <ProfileAvatar src={user.portrait}>
            <EditIconButton className="edit-icon" size="small">
              <EditIcon />
            </EditIconButton>
          </ProfileAvatar>
        </Grid>
        <Grid item sx={{ flexGrow: 1, marginLeft: 2, marginTop: "50px" }}>
          <Typography variant="h5" style={{ marginBottom: "-6px" }}>
            {user.name}
          </Typography>
          <Typography variant="caption" style={{ marginBottom: "-4px" }}>
            {user.address}
          </Typography>
          <Typography variant="body2">Holding: {user.amount} $MING</Typography>
        </Grid>
        {/* <EditButton variant="contained">Edit profile</EditButton> */}
      </Grid>

      {/* <Grid item sx={{ flexGrow: 1, marginLeft: 2 }}>
        <Typography variant="body1">{user.name}</Typography>
      </Grid> */}

      {/* <Grid item sx={{ flexGrow: 1, marginLeft: 2 }}>
        <Typography variant="body1">{user.bio}</Typography>
      </Grid> */}

      <Grid item sx={{ flexGrow: 1, marginLeft: 2, position: "relative" }}>
        <Typography variant="h6">Bio</Typography>
        <BioBox>
          <Typography
            variant="body1"
            sx={{ flexGrow: 1, flexBasis: "auto", minWidth: 0 }}
          >
            {user.bio || "Edit Bio"}
          </Typography>
          <EditBioIconButton
            className="edit-icon"
            size="small"
            onClick={() => displayEditProfileDialog(3, user.bio)}
          >
            <EditIcon />
          </EditBioIconButton>
          <EditProfileDialog
            address={user.address}
            open={dialogStatus.open}
            onClose={handleDialogClose}
            onUpdate={() => refreshProfile(dialogStatus.type)}
            initValue={dialogStatus.init}
            type={dialogStatus.type}
          />
        </BioBox>
      </Grid>

      {/* transactions */}
      <Typography variant="h6" sx={{ marginLeft: 2, marginTop: 4 }}>
        Transactions
      </Typography>
      <List sx={{ marginLeft: 2, marginRight: 2 }}>
        {user.transactions && <Transactions data={user.transactions} />}
      </List>

      {/* Collections */}
      <Grid container spacing={3} sx={{ p: 2, paddingTop: 3 }}>
        {user.collections &&
          user.collections.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <img
                src={image}
                alt={`Collection ${index}`}
                style={{ width: "100%" }}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default GhostProfile;
