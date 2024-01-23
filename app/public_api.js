const { ethers, parseUnits } = require("ethers");
const { abi } = require("../abi/MingCoin.json");
import BigNumber from "bignumber.js";

export function sortData(data) {
  return [...data].sort((a, b) => {
    return new BigNumber(b.value).minus(new BigNumber(a.value)).toNumber();
  });
}

export function getDisplayableValueFromContract(amount) {
  return BigNumber(amount).dividedBy(1e18).toString();
}

export function getContractValueFromDisplayable(amount) {
  return parseUnits(amount, 18);
}

// export async function getFundingAmount() {
//   return getBalanceOfERC20(
//     process.env.NEXT_PUBLIC_FUND_CONTRACT_ADDRESS,
//     process.env.NEXT_PUBLIC_WETH_CONTRACT_ADDRESS
//   );
// }

// export async function getBalanceOfWETH(userAddress) {
//   return getBalanceOfERC20(
//     userAddress,
//     process.env.NEXT_PUBLIC_WETH_CONTRACT_ADDRESS
//   );
// }

// export async function getBalanceOfMing(userAddress) {
//   return getBalanceOfERC20(
//     userAddress,
//     process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS
//   );
// }

// export async function getBalanceOfERC20(userAddress, contractAddress) {
//   console.log("getBalanceOfERC20(%s, %s)", userAddress, contractAddress);
//   if (typeof window.ethereum !== "undefined") {
//     const provider = new ethers.BrowserProvider(window.ethereum);
//     if (provider) {
//       const contract = new ethers.Contract(contractAddress, abi, provider);
//       console.log("balanceOf(%s, %s)", userAddress, contractAddress);
//       const balance = await contract.balanceOf(userAddress);
//       console.log("balance:", balance);
//       return BigNumber(balance).dividedBy(1e18).toString();
//     } else {
//       console.log("provider not found.");
//       return "";
//     }
//   } else {
//     console.log("wallet not installed.");
//     return "";
//   }
// }

export async function getTotalMinted() {
  console.log("getTotalMinted()");
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_INFURA_URL
    );
    // const provider = new ethers.BrowserProvider(window.ethereum);
    if (provider) {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
        abi,
        provider
      );
      const total = await contract.totalMinted();
      console.log("minted:", total);
      return getDisplayableValueFromContract(total);
    } else {
      console.log("provider not found.");
      return "";
    }
  } else {
    console.log("wallet not installed.");
    return "";
  }
}

export async function getBurningHistory(address) {
  console.log("getBurningHistory(%s)", address);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_INFURA_URL
    );
    if (provider) {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
        abi,
        provider
      );
      return contract.getBurningHistory(address);
    } else {
      console.log("provider not found.");
      return "";
    }
  } else {
    console.log("wallet not installed.");
    return "";
  }
}

export async function getProfileList(type, address) {
  console.log("getProfileList(%s, %s)", type, address);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_INFURA_URL
    );
    if (provider) {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
        abi,
        provider
      );
      return contract.getProfileList(type, address);
    } else {
      console.log("provider not found.");
      return "";
    }
  } else {
    console.log("wallet not installed.");
    return "";
  }
}

export async function getBaseProfile(address) {
  console.log("getBaseProfile(%s)", address);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_INFURA_URL
    );
    if (provider) {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
        abi,
        provider
      );
      return contract.getBaseProfile(address);
    } else {
      console.log("provider not found.");
      return "";
    }
  } else {
    console.log("wallet not installed.");
    return "";
  }
}

export function getImageUrl(ipfs) {
  const url =
    "https://azure-capable-tarsier-228.mypinata.cloud/ipfs/" +
    ipfs +
    "?pinataGatewayToken=Y1SFs71_pbEHov9sKJ2CrI2NAtBdbDDXdCScS9EYWtQWuBGEsESQT1Ag4eCJuN_H";
  return url;
}
