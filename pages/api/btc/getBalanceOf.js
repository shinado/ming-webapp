import { sendGetRequest } from './okx';

export default async function handler(req, res) {
  const { tick, userAddress } = req.query;

  try {
    const params = {
      address: userAddress,
      token: tick
    }
    const path = `/api/v5/explorer/brc20/address-balance-list`;
    const response = await sendGetRequest(path, params);

    if (!response.ok) {
      res
        .status(response.status)
        .json({ error: `HTTP error! status: ${response.status}` });
    } else {
      const data = await response.json();

      if (data.code == "0") {
        const balance = data.data.balance; 
        res.status(200).json({ balance });
      } else {
        const msg = data.msg;
        res.status(data.code).json({ msg });
      }
    }
  } catch (error) {
    console.error("Error fetching total funds:", error);
    res.status(500).json({ error: "Error fetching total funds: " + error });
  }
}
