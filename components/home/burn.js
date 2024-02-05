import React, { useState, useEffect, forwardRef } from "react";
import WalletConnect from "./walletConnect";
import MingCoin from "../../abi/MingCoin.json";
const abi = MingCoin.abi;
const { ethers } = require("ethers");
import { Tooltip } from "flowbite-react";
import Link from "next/link";
import ReactPlayer from "react-player";
import i18next from "../../app/i18n";
import DateInput from "@/components/home/DateInput";
import "../../app/globals.css";
import { useStatus } from "../../app/WalletStatus"; 
import LoadingText from "../LoadingText";

const Burn = forwardRef((props, ref) => {
  const { chain } = useStatus();
  const [playVideo, setPlayVideo] = useState(false);

  const [birthDate, setBirthDate] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [personName, setPersonName] = useState("");
  const [mingAmount, setMingAmount] = useState("");
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState(false);

  const [loading, setLoading] = useState(false);
  const [birthDateNA, setBirthDateNA] = useState(false);
  const [deathDateNA, setDeathDateNA] = useState(false);

  const onWalletConnected = (address, balance) => {
    // setMyAddress(address);
    // setBalance(balance);
  };

  const burnOnBTC = async () => {
    if (typeof window.okxwallet !== "undefined") {
      
    } else {
    }
  };

  const burnOnETH = async () => {
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

          const lifespan =
            birthDateNA && deathDateNA
              ? ""
              : " (" +
                (birthDateNA ? "NA" : birthDate) +
                " - " +
                (deathDateNA ? "NA" : deathDate) +
                ")";

          const personInfo = personName + lifespan;
          const amout = ethers.parseEther(mingAmount);

          const tx = await contractWithSigner.burn(personInfo, amout, message);

          setPlayVideo(true);

          // Wait for the transaction to be confirmed
          await tx.wait();
          const address = await contractWithSigner.getAddressByName(personInfo);
          console.log("ghost address:", address);
          setLoading(false);

          window.location.href = "/profile?address=" + address;
          // window.href.navigate("/profile?address=" + address);
        } catch (error) {
          console.log("Transaction failed:", error);
          setLoading(false);
        }
      }
    } else {
      console.log("Install MetaMask");
    }
  };

  const handleBurnClick = async () => {
    setLoading(true);
    if (chain == "eth") {
      burnOnETH();
    } else {
      burnOnBTC();
    }
  };

  const baseClassName = " relative flex justify-center items-center h-full";
  const className = " bg-slate-900 px-4 sm:px-6 lg:px-8 py-10" + baseClassName;
  return (
    <div ref={ref} className="relative h-full md:h-screen">
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          overflow: "hidden", // Prevent content from spilling out when height is 0
        }}
        className={playVideo ? "fadeIn" : "fadeOut"}
      >
        {playVideo && (
          <div className="video-container">
            <ReactPlayer
              url="/burning-fire.mp4"
              playing={playVideo}
              loop
              className="react-player"
            />
          </div>
        )}
      </div>

      {playVideo && (
        //help me GPT: set the div's height to 100% of the parent
        <div
          className={baseClassName}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden", // Prevent content from spilling out when height is 0
          }}
        >
          <LoadingText
            textArray={[
              i18next.t("burning.loading.1"),
              i18next.t("burning.loading.2"),
              i18next.t("burning.loading.3"),
              i18next.t("burning.loading.4"),
              i18next.t("burning.loading.5"),
            ]}
            style={{
              position: "relative",
            }}
          />
        </div>
      )}

      <div className={(playVideo ? "fadeOut" : "fadeIn") + className}>
        {/* set max width for this div */}
        <div className="w-full max-w-3xl text-center">
          <h2 className="text-5xl font-extrabold text-white">
            {i18next.t("home.burn.title")}
          </h2>
          <p className="mt-4 text-lg text-white">
            {i18next.t("home.burn.sub")}
          </p>
          <p className="text-base text-white-500">
            {i18next.t("home.burn.content.dk")}
            <Link href="/deaderboard">
              {i18next.t("home.burn.content.deaderboard")}
            </Link>
          </p>

          <div className="mt-8">
            <p className="mt-1 text-md font-bold text-white text-left">
              {i18next.t("home.burn.form.name")}
            </p>
            <input
              type="text"
              placeholder={i18next.t("home.burn.form.name.hint")}
              // className="border border-gray-300 rounded-md shadow-sm text-white"
              class="mt-2 p-3 text-sm rounded-lg block w-full bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row mt-4">
              <div className="mr-6">
                <p className="mt-1 text-md font-bold text-white text-left">
                  {i18next.t("home.burn.form.birthday")}
                </p>
                {!birthDateNA && (
                  <DateInput onDateChange={(date) => setBirthDate(date)} />
                )}

                <div class="flex items-center mt-1">
                  <input
                    type="checkbox"
                    checked={birthDateNA}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {
                      //convert to bool
                      setBirthDateNA(e.target.checked);
                    }}
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-sm font-medium text-gray-300"
                  >
                    {i18next.t("home.burn.form.na")}
                  </label>
                </div>
              </div>

              <div className="">
                <p className="mt-1 text-md font-bold text-white text-left">
                  {i18next.t("home.burn.form.deathday")}
                </p>
                {!deathDateNA && (
                  <DateInput onDateChange={(date) => setDeathDate(date)} />
                )}

                <div class="flex items-center mt-1">
                  <input
                    type="checkbox"
                    checked={deathDateNA}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={(e) => {
                      setDeathDateNA(e.target.checked);
                    }}
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-sm font-medium text-gray-300"
                  >
                    {i18next.t("home.burn.form.na")}
                  </label>
                </div>
              </div>
            </div>

            <p className="mt-4 text-md font-bold text-white text-left">
              {i18next.t("home.burn.form.amount")}
            </p>
            <input
              type="number"
              placeholder="444444"
              class="mt-2 p-3 text-sm rounded-lg block w-full bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
              // className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm text-white"
              value={mingAmount}
              onChange={(e) => setMingAmount(e.target.value)}
            />

            {displayMessage ? (
              <>
                <p className="mt-4 text-md font-bold text-white text-left">
                  {i18next.t("home.burn.form.message")}
                </p>
                <input
                  placeholder={i18next.t("home.burn.form.message.hint")}
                  class="mt-2 p-3 text-sm rounded-lg block w-full bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </>
            ) : (
              <div
                class="mt-2 text-left text-blue-700  cursor-pointer"
                onClick={() => {
                  setDisplayMessage(true);
                }}
              >
                {i18next.t("home.burn.add.message")}
              </div>
            )}

            <WalletConnect
              onBurning={handleBurnClick}
              onWalletConnected={(address, balance) =>
                onWalletConnected(address, balance)
              }
              isLoading={loading}
            />

            <div className="flex justify-center items-center ">
              <Tooltip
                className="mt-2 text-center max-w-3xl"
                content={i18next.t("home.burn.form.learn.desc")}
                trigger="hover"
              >
                <p className="mt-2 text-center text-sm text-gray-400 cursor-pointer">
                  {i18next.t("home.burn.form.learn")}
                </p>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * Your code shows that you are using the forwardRef API in React and assigning it to a constant named Burn.
 * This approach is generally correct, but the error you're encountering suggests that the component might be
 *  missing an explicit display name, which is particularly important when using higher-order components or
 * APIs like forwardRef.
 * To resolve this, you can explicitly set the displayName property on your component.
 * Here's how you can modify your code:
 */
Burn.displayName = "Burn";
export default Burn;
