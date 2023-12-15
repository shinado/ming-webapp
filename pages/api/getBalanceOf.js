import BigNumber from "bignumber.js";

export default async function handler(req, res) {
  const { contractAddress, userAddress } = req.query;
  const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

  if (process.env.NODE_ENV === "development") {
    const result = "299554301959564534";
    const balance = toNumber(result);
    res.status(200).json({ contractAddress, balance });
  } else {
    try {
      const etherscanUrl = `https://api.etherscan.io/api?module=account&action=tokenbalance
      &contractaddress=${contractAddress}&address=${userAddress}&tag=latest&apikey=${etherscanApiKey}`;

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
}

function toNumber(weiValue) {
  return BigNumber(weiValue).dividedBy(1e18);
}
