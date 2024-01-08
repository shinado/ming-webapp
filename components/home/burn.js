import React, { useState, useEffect, forwardRef } from "react";
import WalletConnect from "./walletConnect";
import MingCoin from "../../abi/MingCoin.json";
const abi = MingCoin.abi;
const { ethers } = require("ethers");
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the datepicker
import ReactPlayer from "react-player";
import i18next from "../../app/i18n";
import DateInput from "@/components/home/DateInput";
import "../../app/globals.css";
import LoadingText from "../LoadingText";

const Burn = forwardRef((props, ref) => {
  const [balance, setBalance] = useState("");
  const [myAddress, setMyAddress] = useState("");

  const [playVideo, setPlayVideo] = useState(false);

  const [personName, setPersonName] = useState("");
  const [mingAmount, setMingAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const onWalletConnected = (address, balance) => {
    setMyAddress(address);
    setBalance(balance);
  };

  const handleBurnClick = async () => {
    setPlayVideo(true);

    // setLoading(true);
    // if (typeof window.ethereum !== "undefined") {
    //   const provider = new ethers.BrowserProvider(window.ethereum);
    //   // const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   if (provider) {
    //     try {
    //       const contract = new ethers.Contract(
    //         process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
    //         abi,
    //         provider
    //       );

    //       const signer = await provider.getSigner();
    //       const contractWithSigner = contract.connect(signer);

    //       const personInfo =
    //         personName + " (" + birthDate + " - " + deathDate + ")";
    //       const amout = ethers.parseEther(mingAmount);

    //       const tx = await contractWithSigner.burn(
    //         personName,
    //         personInfo,
    //         amout
    //       );

    //       setPlayVideo(true);

    //       // Wait for the transaction to be confirmed
    //       await tx.wait();
    //       const address = await contractWithSigner.getAddressByName(personInfo);
    //       console.log("ghost address:", address);
    //       setLoading(false);

    //       window.location.href = "/profile?address=" + address;
    //       // window.href.navigate("/profile?address=" + address);
    //     } catch (error) {
    //       console.log("Transaction failed:", error);
    //       setLoading(false);
    //     }
    //   }
    // } else {
    //   console.log("Install MetaMask");
    // }
  };

  const baseClassName = " relative flex justify-center items-center h-full";
  const className = " bg-white px-4 sm:px-6 lg:px-8" + baseClassName;
  return (
    <div ref={ref} className="relative h-screen">
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
          <ReactPlayer
            url="/burnings-2.mp4"
            playing={playVideo}
            loop
            width="100%"
            height="100%"
          />
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
              "Generating ghost address...",
              "Burning to ghost address...",
              "Waiting for Bank of Hell to comfirm...",
              "Bank of Hell returns OK...",
              "Waiting for transaction to complete...",
              "Waiting for transaction to complete...",
              "Waiting for transaction to complete...",
              "Waiting for transaction to complete...",
              "Waiting for transaction to complete...",
              "Waiting for transaction to complete..."
            ]}
            style={{
              position: "relative",
            }}
          />
        </div>
      )}

      {/* help me GPT: make the child elements centered */}
      <div
        className={(playVideo ? "fadeOut" : "fadeIn") + className}
        // style={{
        //   position: "relative",
        //   height: "100%",
        //   width: "100%",
        //   overflow: "hidden", // Prevent content from spilling out when height is 0
        // }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-gray-900">
            {i18next.t("home.burn.title")}
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            {i18next.t("home.burn.sub")}
          </p>
          <p className="text-lg text-gray-500">
            {i18next.t("home.burn.content")}
            {/* Visit <a href="/hallOfFame">Hall of Fame</a> or check out{" "}
              <a href={"/history?address=" + myAddress}>my burning history</a>. */}
          </p>
          <p className="text-lg text-gray-500">My $MING: {balance}</p>

          <div className="mt-8">
            <p className="mt-1 text-md font-bold text-black text-left">
              {i18next.t("home.burn.form.name")}
            </p>
            <input
              type="text"
              placeholder={i18next.t("home.burn.form.name.hint")}
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
            />
            <div className="mt-4 block w-full " style={{ display: "flex" }}>
              <div className="">
                <p className="mt-1 text-md font-bold text-black text-left">
                  {i18next.t("home.burn.form.birthday")}
                </p>
                <DateInput onDateChange={(date) => setBirthDate(date)} />
                {/* <DatePicker
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black text-left"
                    selected={birthDate}
                    onChange={(date) => setBirthDate(date)}
                  /> */}
              </div>
              <div className="ml-6">
                <p className="mt-1 text-md font-bold text-black text-left">
                  {i18next.t("home.burn.form.deathday")}
                </p>
                <DateInput onDateChange={(date) => setDeathDate(date)} />
                {/* <DatePicker
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black"
                    selected={deathDate}
                    onChange={(date) => setDeathDate(date)}
                  /> */}
              </div>
            </div>

            <p className="mt-4 text-md font-bold text-black text-left">
              {i18next.t("home.burn.form.amount")}
            </p>
            <input
              type="number"
              placeholder="444444"
              className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm text-black"
              value={mingAmount}
              onChange={(e) => setMingAmount(e.target.value)}
            />
            <WalletConnect
              onBurning={handleBurnClick}
              onWalletConnected={(address, balance) =>
                onWalletConnected(address, balance)
              }
              isLoading={loading}
            />
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
