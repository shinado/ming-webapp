"use client";
import React, { useState } from "react";
import {
  Paper,
  Grid,
  Avatar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";

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
  width: 90,
  height: 90,
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
  },
});

// Ensure the IconButton has a higher zIndex than the ::before pseudo-element
const EditIconButton = styled(IconButton)({
  position: "absolute",
  top: '50%', // Center vertically
  left: '50%', // Center horizontally
//   top: 16,
//   right: 16,
  zIndex: 2, // Above the dim overlay
  visibility: "hidden", // Hide by default
  opacity: 0,
  color: "white",
  transition: "visibility 0s, opacity 0.3s ease-in-out",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "grey",
  },
});

const EditButton = styled(Button)({
  position: "absolute",
//   top: "70%",
//   right: "5%",
});

const GhostProfile = ({ user }) => {
  return (
    <div>
      {/* Banner */}
      {/* Banner */}
      <Banner style={{ backgroundImage: `url(${user.banner})` }}>
        <EditIconButton className="edit-icon" size="small">
          <EditIcon />
        </EditIconButton>
      </Banner>

      {/* User Info */}
      <Grid
        container
        sx={{ position: "relative", marginTop: "-45px", padding: 2 }}
      >
        <Grid item>
          <ProfileAvatar src={user.portrait}>
            <EditIconButton className="edit-icon" size="small">
              <EditIcon />
            </EditIconButton>
          </ProfileAvatar>
        </Grid>
        <Grid item sx={{ flexGrow: 1, marginLeft: 2, marginTop: "35px" }}>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="caption">{user.address}</Typography>
        </Grid>
        {/* <EditButton variant="contained">Edit profile</EditButton> */}
      </Grid>

      <Grid item sx={{ flexGrow: 1, marginLeft: 2 }}>
        <Typography variant="body1">{user.id}</Typography>
      </Grid>

      {/* Collections */}
      <Grid container spacing={3} sx={{ p: 2, paddingTop: 3 }}>
        {user.collections && user.collections.map((image, index) => (
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
