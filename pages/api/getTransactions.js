// pages/api/tokenTransfers.js
import Web3 from "web3";
import BigNumber from "bignumber.js";
const { abi } = require("../../abi/MingCoin.json");

const web3 = new Web3(process.env.INFURA_URL);

export default async function handler(req, res) {
  const filter = req.query;
  // const { address } = req.query; // Get the address from the query parameter
  console.log("getTransactions(%s)", filter);

  if (!filter) {
    return res.status(400).json({ message: "Address is required" });
  }
  const tokenAddress = process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS;

  try {
    const tokenContract = new web3.eth.Contract(abi, tokenAddress);
    const events = await tokenContract.getPastEvents("Transfer", {
      filter: filter,
      fromBlock: 0,
      toBlock: "latest",
    });

    const array = events.map(event => {
        return {
            from: event.returnValues.from.toString(),
            to: event.returnValues.to.toString(),
            value: BigNumber(event.returnValues.value).dividedBy(1e18).toString(),
            blockNumber: event.blockNumber.toString(),
            transactionHash: event.transactionHash.toString(),
        };
    });

    res.status(200).json(array);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching transfer events" });
  }
}
