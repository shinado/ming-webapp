// pages/api/checkFund.js
export default function handler(req, res) {
  // Replace this with actual logic to retrieve isFundOver value
  const isFundOver = getIsFundOverValueFromServer();
  res.status(200).json({ isFundOver });
}

function getIsFundOverValueFromServer() {
  return process.env.IS_FUND_OVER;
}
