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
import Transactions from "./Transaction";
import AddProfileDialog from "./AddProfileDialog";
import { getImageUrl, sortData } from "../../app/public_api";
import ViewProfileDialog from "./ViewProfileDialog";
import LoadingDialog from "./LoadingDialog";

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

const GhostProfile = ({ profile, refreshProfile }) => {
  const bannerFileInputRef = useRef(null);
  const portraitFileInputRef = useRef(null);
  const [uploading, setIsUploading] = useState(false);

  const [viewProfileDialogStatus, setViewProfileDialogStatus] = useState({
    open: false,
    type: 1,
    values: [],
  });

  const [dialogStatus, setDialogStatus] = useState({
    open: false,
    type: 1,
    init: "",
    values: [],
    editable: true,
  });

  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // const [dialogType, setDialogType] = useState(1);
  // const [dialogInitValue, setDialogInitValue] = useState("");

  function dismissVoteProfileDialog() {
    setDialogStatus((prevStatus) => ({
      ...prevStatus,
      open: false,
      type: 1,
      init: "",
      values: [],
      editable: true,
    }));
  }

  function dismissViewProfileDialog() {
    setViewProfileDialogStatus((prevStatus) => ({
      ...prevStatus,
      open: false,
      type: 1,
      values: [],
    }));
  }

  function displayViewProfileDialog(type, values) {
    console.log("displayViewProfileDialog:", type, values);

    setViewProfileDialogStatus((prevStatus) => ({
      ...prevStatus,
      open: true,
      type: type,
      values: values,
    }));
  }

  const handleDialogClose = () => {};

  function displayAddProfileDialog(type, initValue, values, editable) {
    console.log("displayAddProfileDialog:", type, initValue, values, editable);

    setDialogStatus((prevStatus) => ({
      ...prevStatus,
      open: true,
      type: type,
      init: initValue,
      values: values,
      editable: editable,
    }));
  }

  async function handleImageSelect(type, values, e) {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const response = await fetch("/api/uploadFile", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("ipfshash:", data.IpfsHash);
      setIsUploading(false);
      displayAddProfileDialog(
        type,
        { key: data.IpfsHash, value: 0 },
        values,
        false
      );
    }
  }

  function onEditBio() {
    if (profile.address) {
      if (profile.bios.length > 0) {
        displayViewProfileDialog(3, profile.bios);
      } else {
        displayAddProfileDialog(
          3,
          { key: "", value: 0 },
          profile.bios,
          true
        );
      }
    }
  }

  function onEditPortrait() {
    if (profile.address) {
      if (profile.portraits.length > 0) {
        displayViewProfileDialog(1, profile.portraits);
      } else {
        portraitFileInputRef.current.click();
      }
    }
  }

  function onEditBanner() {
    if (profile.address) {
      if (profile.banners.length > 0) {
        displayViewProfileDialog(1, profile.banners);
      } else {
        bannerFileInputRef.current.click();
      }
    }
  }

  function getWinner(array) {
    if (array.length > 0) {
      return sortData(array)[0].key;
    } else {
      return undefined;
    }
  }

  return (
    <div>
      <Banner
        style={{
          backgroundImage: `url(${getImageUrl(getWinner(profile.banners))})`,
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageSelect(1, profile.banners, e)}
          ref={bannerFileInputRef}
          style={{ display: "none" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageSelect(2, profile.portraits, e)}
          ref={portraitFileInputRef}
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
          <ProfileAvatar src={getImageUrl(getWinner(profile.portraits))}>
            <EditIconButton
              className="edit-icon"
              size="small"
              onClick={onEditPortrait}
            >
              <EditIcon />
            </EditIconButton>
          </ProfileAvatar>
        </Grid>
        <Grid item sx={{ flexGrow: 1, marginLeft: 2, marginTop: "50px" }}>
          <Typography variant="h5" style={{ marginBottom: "-6px" }}>
            {profile.name || "loading..."}
          </Typography>
          <Typography variant="caption" style={{ marginBottom: "-4px" }}>
            {profile.address || "loading..."}
          </Typography>
          <Typography variant="body2">
            {profile.address == ""
              ? "loading..."
              : "Holding: " + profile.amount + " $MING"}
          </Typography>
        </Grid>
        {/* <EditButton variant="contained">Edit profile</EditButton> */}
      </Grid>

      <Grid item sx={{ flexGrow: 1, marginLeft: 2, position: "relative" }}>
        <Typography variant="h6">Bio</Typography>
        <BioBox>
          <Typography
            variant="body1"
            sx={{ flexGrow: 1, flexBasis: "auto", minWidth: 0 }}
          >
            {getWinner(profile.bios) || "Edit Bio"}
          </Typography>
          <EditBioIconButton
            className="edit-icon"
            size="small"
            onClick={() => onEditBio()}
          >
            <EditIcon />
          </EditBioIconButton>
          <ViewProfileDialog
            address={profile.address}
            open={viewProfileDialogStatus.open}
            onClose={() => {
              dismissViewProfileDialog();
            }}
            onUpdate={() => refreshProfile(viewProfileDialogStatus.type)}
            values={viewProfileDialogStatus.values}
            type={viewProfileDialogStatus.type}
            onVote={(item) => {
              dismissViewProfileDialog();

              displayAddProfileDialog(
                viewProfileDialogStatus.type,
                item,
                viewProfileDialogStatus.values,
                false
              );
            }}
            onAdd={() => {
              dismissViewProfileDialog();

              if (viewProfileDialogStatus.type == 3) {
                displayAddProfileDialog(
                  viewProfileDialogStatus.type,
                  { key: "", value: 0 },
                  viewProfileDialogStatus.values,
                  true
                );
              } else if (viewProfileDialogStatus.type == 1) {
                bannerFileInputRef.current.click();
              } else if (viewProfileDialogStatus.type == 2) {
                portraitFileInputRef.current.click();
              }
            }}
          />
          <AddProfileDialog
            address={profile.address}
            open={dialogStatus.open}
            onClose={() => {
              dismissVoteProfileDialog();
            }}
            onUpdate={() => refreshProfile(dialogStatus.type)}
            initValue={dialogStatus.init}
            values={dialogStatus.values}
            type={dialogStatus.type}
            editable={dialogStatus.editable}
          />
          <LoadingDialog
            content="Uploading to IPFS. Please wait..."
            open={uploading}
          />
        </BioBox>
      </Grid>

      {/* transactions */}
      <Typography variant="h6" sx={{ marginLeft: 2, marginTop: 4 }}>
        Transactions
      </Typography>
      <List sx={{ marginLeft: 2, marginRight: 2 }}>
        {profile.transactions && <Transactions data={profile.transactions} />}
      </List>

      {/* Collections */}
      <Grid container spacing={3} sx={{ p: 2, paddingTop: 3 }}>
        {profile.collections &&
          profile.collections.map((image, index) => (
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

GhostProfile.displayName = "GhostProfile";
export default GhostProfile;
