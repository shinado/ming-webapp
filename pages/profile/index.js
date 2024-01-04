"use client";
import React from "react";
import "../../app/globals.css"; // Adjust the path to your global CSS file
import { useRouter } from "next/router";
import GhostProfile from "./GhostProfile";
import { useEffect, useState } from "react";
import {
  getBaseProfile,
  getImageUrl,
  getProfileList,
} from "../../app/public_api";
import BigNumber from "bignumber.js";

async function getTransactions(address) {
  try {
    const response = await fetch(`/api/getTransactions?to=${address}`);
    if (!response.ok) {
      throw new Error(`response: ${response}`);
    }
    return response.json();
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
    bio: "",
    address: address,
    portrait: "./usd.webp",
    banner: "./banner.png",
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

            const banner = [...banners].sort((a, b) => {
              return BigNumber(b.value).minus(a.value);
            });
            const portrait = [...portraits].sort((a, b) => {
              return BigNumber(b.value).minus(a.value);
            });
            const bio = [...bios].sort((a, b) => {
              return BigNumber(b.value).minus(a.value);
            });

            // Update the profile state only once with all the new values
            setProfile((prevProfile) => ({
              ...prevProfile,
              banner: banner[0] == null ? "" : getImageUrl(banner[0].key),
              portrait: portrait[0] == null ? "" : getImageUrl(portrait[0].key),
              bio: bio[0] == null ? "" : bio[0].key,
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

  return (
    <div>
      <GhostProfile user={profile} />
    </div>
  );
}
