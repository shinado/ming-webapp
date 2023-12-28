"use client";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GhostProfile from "./GhostProfile";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBurningInfo } from "../public_api";

const sampleUser = {
  name: "George Washington",
  id: "George Washington (February 22, 1732 – December 14, 1799)",
  address: "0x62a033f8C1eE5131f59D3907994cE12E020cFf5D",
  portrait: "/usd.webp",
  banner: "/banner.png",
  collections: [
    "/banner.png",
    "/banner.png",
    // ... more images
  ],
};

function MyComponent() {
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address");

  const [profile, setProfile] = useState({});
  useEffect(() => {
    getBurningInfo(address).then((result) => {
      console.log("result:", result);
      // setProfile(result);
    });
  }, []);

  return (
    <div>
      <GhostProfile user={sampleUser}/>
    </div>
  );
}

function Hall() {
  return (
    <Router>
      <Routes>
        <Route path="/hall" element={<MyComponent />} />
      </Routes>
    </Router>
  );
}

export default Hall;
