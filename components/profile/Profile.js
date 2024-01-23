"use client";
import React, { useState, useRef } from "react";

import Transactions from "./Transaction";
import AddProfileDialog from "./AddProfileDialog";
import { getImageUrl, sortData } from "../../app/public_api";
import ViewProfileDialog from "./ViewProfileDialog";
import LoadingDialog from "./LoadingDialog";
import BurningDialog from "./BurningDialog";
import i18next from "../../app/i18n";

const ProfileCard = ({ profile, refreshProfile }) => {
  const bannerFileInputRef = useRef(null);
  const portraitFileInputRef = useRef(null);
  const [uploading, setIsUploading] = useState(false);
  const [isBurningDialogOpen, setIsBurningDialogOpen] = useState(false);

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
    console.log("handleImageSelect:", type, values, e);
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      try {
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
      } catch (e) {
        alert(e);
        setIsUploading(false);
      }
    }
  }

  function onEditBio() {
    if (profile.address) {
      if (profile.bios.length > 0) {
        displayViewProfileDialog(3, profile.bios);
      } else {
        displayAddProfileDialog(3, { key: "", value: 0 }, profile.bios, true);
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
      return "";
    }
  }

  function getImageWithPlaceHolder(array, placeholder) {
    const winner = getWinner(array);
    if (winner) {
      return getImageUrl(winner);
    } else {
      return placeholder;
    }
  }

  const ProfileHeader = ({ name, lifespan, avatarUrl }) => (
    <div className="flex-row sm:flex">
      {/* Container for image and overlay */}
      <div className="relative w-32 h-32 min-w-[128px] mt-[-60px] mr-4">
        {/* Image */}
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-32 h-32 rounded-full object-cover z-0"
        />

        {/* Overlay and edit button */}
        {/* <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full bg-[rgba(51,0,0,0)] group-hover:bg-[rgba(51,0,0,0.5)] transition-opacity duration-300 rounded-full"> */}
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(51,0,0,0.5)] opacity-0 hover:opacity-100 transition-opacity duration-300 flex justify-center items-center rounded-full">
          <button
            className="z-12"
            onClick={() => {
              onEditPortrait();
            }}
          >
            <img src="/ic_edit.png" alt="Edit" className="w-6 h-6 z-12" />
          </button>
        </div>
      </div>

      <div className="mt-2">
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="text-gray-300">{lifespan}</p>
      </div>
    </div>
  );

  const ProfileBanner = ({ imageUrl }) => (
    <div className="group relative w-full z-0" style={{ height: "300px" }}>
      <img
        style={{ height: "300px" }}
        className="absolute top-0 left-0 w-full h-full object-cover bg-black" // Adjusted to fill the parent div
        src={imageUrl}
        alt="Profile"
      />

      <div className="absolute flex justify-center items-center top-0 left-0 w-full h-full bg-[rgba(51,0,0,0)] group-hover:bg-[rgba(51,0,0,0.5)] transition-opacity duration-300">
        {/* Centered button */}
        <button
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => {
            onEditBanner();
          }}
        >
          <img src="/ic_edit.png" alt="Edit" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  const ProfileDetails = ({ wealth, bio }) => (
    <div className="py-4">
      <div className="flex space-x-4">
        <div>
          <p className="text-white font-bold text-sm">
            {i18next.t("profile.page.wealth")}
          </p>
          <p className="text-white font-bold">{wealth} $MING</p>
        </div>

        <button
          onClick={() => {
            setIsBurningDialogOpen(true);
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          {i18next.t("dialog.burn.title")}
        </button>
      </div>

      <div className="group flex items-center space-x-2">
        <div>
          <p className="text-white font-bold text-sm mt-5">
            {i18next.t("profile.page.bio")}
          </p>
          <p className="text-white relative">{bio}</p>
        </div>

        {/* Edit button */}
        <button
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4"
          onClick={() => {
            onEditBio();
            // Handle the edit action
          }}
        >
          <img
            src="/ic_edit.png"
            alt="Edit"
            className="w-6 h-6" // Adjust size as needed
          />
        </button>
      </div>

      {/* transactions */}
      <div>
        <p className="text-white font-bold text-sm mt-5">
          {i18next.t("profile.page.transactions")}
        </p>
        {profile.transactions && <Transactions data={profile.transactions} />}
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden bg-black text-left">
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

      <ProfileBanner
        imageUrl={getImageWithPlaceHolder(
          profile.banners,
          "/background_banner_blur.jpg"
        )}
      />
      <div className="px-10 z-10 relative">
        <ProfileHeader
          name={profile.name}
          lifespan={profile.address}
          avatarUrl={getImageWithPlaceHolder(
            profile.portraits,
            "/icon_avatar.png"
          )}
        />
        <ProfileDetails wealth={profile.amount} bio={getWinner(profile.bios)} />
      </div>

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
        handleClose={() => {
          setIsUploading(false);
        }}
      />
      <BurningDialog
        address={profile.address}
        openModal={isBurningDialogOpen}
        onBurning={() => {}}
        onModalClose={(status) => {
          setIsBurningDialogOpen(false);
          if (status == 1) {
            //refresh transactions
            refreshProfile(4);
          }
        }}
      />
    </div>
  );
};

export default ProfileCard;
