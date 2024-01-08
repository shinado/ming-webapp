"use client";
import React, { useState, useEffect, forwardRef } from "react";
import MingCoin from "../../abi/MingCoin.json";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the datepicker
import ReactPlayer from "react-player";
import i18next from "../../app/i18n";
import DateInput from "@/components/home/DateInput";
import "../../app/globals.css";

const FadeDiv = forwardRef((props, ref) => {
  const [balance, setBalance] = useState("");
  const [myAddress, setMyAddress] = useState("");

  const [playVideo, setPlayVideo] = useState(false);

  const [personName, setPersonName] = useState("");
  const [mingAmount, setMingAmount] = useState("");

  const className = " bg-white py-40 px-4 sm:px-6 lg:px-8";
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          top: 0,
          left: 0,
          position: "absolute",
          width: "100%",
          overflow: "hidden", // Prevent content from spilling out when height is 0
        }}
        className={playVideo ? "fadeIn" : "fadeOut"}
      >
        {playVideo && (
          <ReactPlayer
            url="/burnings-3.mp4"
            playing={playVideo}
            loop
            width="100%"
            height="100%"
          />
        )}
      </div>

      <div
        ref={ref}
        className={(playVideo ? "fadeOut" : "fadeIn") + className}
        // className="bg-white py-40 px-4 sm:px-6 lg:px-8"
        style={{
          top: 0,
          left: 0,
          position: "absolute",
          width: "100%",
          overflow: "hidden", // Prevent content from spilling out when height is 0
        }}
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
              </div>
              <div className="ml-6">
                <p className="mt-1 text-md font-bold text-black text-left">
                  {i18next.t("home.burn.form.deathday")}
                </p>
                <DateInput onDateChange={(date) => setDeathDate(date)} />
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
            <button
              className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setPlayVideo(true);
              }}
            >
              Burn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FadeDiv;
