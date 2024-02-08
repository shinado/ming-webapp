import { sendGetRequest } from "./okx";

export default async function handler(req, res) {
  const { tick, userAddress } = req.query;

  try {
    // const getRequestPath = "/api/v5/dex/aggregator/quote";
    // const getParams = {
    //   chainId: 42161,
    //   amount: 1000000000000,
    //   toTokenAddress: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    //   fromTokenAddress: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    // };
    // const response = await sendGetRequest(getRequestPath, getParams);

    // const params = {
    //   address: userAddress,
    //   token: tick,
    // };
    // const path = "/api/v5/explorer/brc20/address-balance-list";
    // const response = await sendGetRequest(path, params);

    const response = await fetch(
      "https://api.hiro.so/ordinals/v1/brc-20/balances/" + userAddress
    );

    if (!response.ok) {
      res
        .status(response.status)
        .json({ error: `HTTP error! status: ${response.status}` });
    } else {
      const data = await response.json();
      console.log("data: ", data);

      let balance = 0;
      data.results.forEach((element) => {
        if (element.ticker.toLowerCase() == tick.toLowerCase()) {
          balance = element.overall_balance.toString().replace(".", "");
        }
      });

      res.status(200).json({ balance });

      // okx
      // if (data.code == "0") {
      //   const balance = data.data.balance;
      //   res.status(200).json({ balance });
      // } else {
      //   const msg = data.msg;
      //   res.status(data.code).json({ msg });
      // }
    }
  } catch (error) {
    console.error("Error fetching total funds:", error);
    res.status(500).json({ error: "Error fetching total funds: " + error });
  }
}
