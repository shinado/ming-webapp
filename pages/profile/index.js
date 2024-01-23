"use client";
import React from "react";
import "../../app/globals.css"; // Adjust the path to your global CSS file
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getBaseProfile,
  getBurningHistory,
  getProfileList,
} from "../../app/public_api";
import BigNumber from "bignumber.js";
import ProfileCard from "@/components/profile/Profile";

async function getTransactions(address) {
  try {
    const list = await getBurningHistory(address);
    return list;
  } catch (error) {
    console.log("error:", error);
  } finally {
  }
}

export default function Profile() {
  const router = useRouter();
  const { isReady, address } = router.query; // Get the 'address' parameter from the URL

  const [profile, setProfile] = useState({
    name: "",
    displayName: "",
    address: "",
    portraits: [],
    banners: [],
    bios: [],
    amount: "",
    transactions: [],
    collections: [],
  });

  useEffect(() => {
    if (address) {
      Promise.all([
        getProfileList(1, address),
        getProfileList(2, address),
        getProfileList(3, address),
        getBaseProfile(address),
        getTransactions(address),
      ])
        .then(
          ([
            banners,
            portraits,
            bios,
            baseProfileResult,
            transactionsResult,
          ]) => {
            // Process the profileListResult to find the winner
            console.log("banners:", banners);
            console.log("bios:", bios);

            // Update the profile state only once with all the new values
            setProfile((prevProfile) => ({
              ...prevProfile,
              banners: banners,
              portraits: portraits,
              bios: bios,
              address: address, //reset address to make sure it is loaded
              name: baseProfileResult.name,
              displayName: baseProfileResult.displayName,
              amount: BigNumber(baseProfileResult.amount)
                .dividedBy(1e18)
                .toString(),
              transactions: transactionsResult,
            }));
          }
        )
        .catch((error) => {
          // Handle any errors that occur during the fetch
          console.error("Error fetching data:", error);
        });
    }
  }, [isReady, address]); // Ensure the useEffect runs again if the address changes

  const refreshProfile = async (type) => {
    if (type == 4) {
      Promise.all([getBaseProfile(address), getTransactions(address)])
        .then(([baseProfileResult, transactionsResult]) => {
          // Update the profile state only once with all the new values
          setProfile((prevProfile) => ({
            ...prevProfile,
            amount: BigNumber(baseProfileResult.amount)
              .dividedBy(1e18)
              .toString(),
            transactions: transactionsResult,
          }));
        })
        .catch((error) => {
          // Handle any errors that occur during the fetch
          console.error("Error fetching data:", error);
        });
    } else {
      getProfileList(type, profile.address).then((result) => {
        if (type == 3) {
          setProfile((prevProfile) => ({
            ...prevProfile,
            bios: result,
          }));
        } else if (type == 2) {
          setProfile((prevProfile) => ({
            ...prevProfile,
            portraits: result,
          }));
        } else if (type == 1) {
          setProfile((prevProfile) => ({
            ...prevProfile,
            banners: result,
          }));
        }
      });
    }
  };

  return (
    <div>
      {/* <ProfileCard profile={
        {
          name: "George Washington",
          address: "0x1234567890123456789012345678901234567890",
          imageUrl: "/banner.png",
          avatarUrl: "/usd.webp",
          bio: "bakafjwejrjierhiew ehrj",
          wealth: 444,
        }
      } /> */}
      <ProfileCard profile={profile} refreshProfile={refreshProfile} />
    </div>
  );
}
