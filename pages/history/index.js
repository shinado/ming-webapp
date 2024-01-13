"use client";
import React from "react";
import "../../app/globals.css"; // Adjust the path to your global CSS file
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Transactions from "../../components/profile/Transaction";

async function getTransactions(address) {
  try {
    const response = await fetch(`../api/getTransactions?from=${address}`);
    if (!response.ok) {
      throw new Error(`response: ${response}`);
    }
    return response.json();
  } catch (error) {
    console.log("error:", error);
  } finally {
  }
}

export default function History() {
  const router = useRouter();
  const { isReady, address } = router.query; // Get the 'address' parameter from the URL

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (address) {
      getTransactions(address).then((result) => {
        setTransactions(result);
      });
    }
  }, [isReady, address]);

  return (
    <div className="App flex mt-10 items-left min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-left my-6">Transactions</h1>
        <Transactions data={transactions} />
      </div>
    </div>
  );
}
