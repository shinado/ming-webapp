"use client";

export default async function handler(req, res) {
  const { contractAddress, userAddress } = req.query;
  const etherscanApiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

  try {
    const etherscanUrl = process.env.ETHERSCAN_END_POINT + `api?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${userAddress}&tag=latest&apikey=${etherscanApiKey}`;
    console.log(etherscanUrl);

    const response = await fetch(etherscanUrl);
    if (!response.ok) {
      res
        .status(response.status)
        .json({ error: `HTTP error! status: ${response.status}` });
    } else {
      const data = await response.json();

      // //test code
      // const totalFunds = 1;
      // res.status(200).json({ contractAddress, totalFunds });
      if (data.status === "1" && data.message === "OK") {
        const balance = data.result; // Convert the result to ETH if needed
        res.status(200).json({ contractAddress, balance });
      } else {
        throw new Error("Failed to fetch data from Etherscan");
      }
    }
  } catch (error) {
    console.error("Error fetching total funds:", error);
    res.status(500).json({ error: "Error fetching total funds: " + error });
  }
}
