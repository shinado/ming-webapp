"use client";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Transactions from "../transaction";

async function getTransactions(address) {
  try {
    const response = await fetch(`/api/getTransactions?from=${address}`);
    if (!response.ok) {
      throw new Error(`response: ${response}`);
    }
    return response.json();
  } catch (error) {
    console.log("error:", error);
  } finally {
  }
}

function MyComponent() {
  const [searchParams] = useSearchParams();
  const address = searchParams.get("address");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions(address).then((result) => {
        setTransactions(result);
    });
  }, []);

  return (
    <div>
      <Transactions data={transactions} />
    </div>
  );
}

function History() {
  return (
    <Router>
      <Routes>
        <Route path="/history" element={<MyComponent />} />
      </Routes>
    </Router>
  );
}

export default History;