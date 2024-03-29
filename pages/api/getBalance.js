import BigNumber from "bignumber.js";

export default async function handler(req, res) {
  const { contractAddress } = req.query;
  const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

  try {
    const etherscanUrl = process.env.ETHERSCAN_END_POINT + `api?module=account&action=balance&address=${contractAddress}&tag=latest&apikey=${etherscanApiKey}`;
    // //test code
    // const etherscanUrl = `https://jsonplaceholder.typicode.com/posts/1`;

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
        const totalFunds = data.result; // Convert the result to ETH if needed
        res.status(200).json({ contractAddress, totalFunds });
      } else {
        throw new Error("Failed to fetch data from Etherscan");
      }
    }
  } catch (error) {
    console.error("Error fetching total funds:", error);
    res.status(500).json({ error: "Error fetching total funds: " + error });
  }
}

function toNumber(weiValue) {
  return BigNumber(weiValue).dividedBy(1e18);
}
