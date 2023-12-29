import React, { useState, useEffect, forwardRef } from "react";
import WalletConnect from "./walletConnect";
import MingCoin from "./abi/MingCoin.json";
const abi = MingCoin.abi;
const { ethers } = require("ethers");
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the datepicker

function formatDate(date) {
  if (!date) return '';

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}


const Burn = forwardRef((props, ref) => {
  const [balance, setBalance] = useState("");
  // useEffect(() => {
  //   setBalance(props.mingBalance);
  // }, [props.mingBalance]);

  const [birthDate, setBirthDate] = useState();
  const [deathDate, setDeathDate] = useState();
  const [personName, setPersonName] = useState("");
  const [mingAmount, setMingAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBurnClick = async () => {
    setLoading(true);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider) {
        try {
          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_MING_CONTRACT_ADDRESS,
            abi,
            provider
          );

          const signer = await provider.getSigner();
          const contractWithSigner = contract.connect(signer);

          const personInfo =
            personName + " (" + formatDate(birthDate) + " - " + formatDate(deathDate) + ")";
          // Convert the amount to Wei (1 ETH = 1e18 Wei)
          const amout = ethers.parseEther(mingAmount);
          const tx = await contractWithSigner.burn(
            personName,
            personInfo,
            amout
          );
          // Wait for the transaction to be confirmed
          await tx.wait();
          const address = await contractWithSigner.getAddressByName(personInfo);
          console.log("ghost address:", address);
          setLoading(false);

          window.location.href = "/profile?address=" + address;
          // window.href.navigate("/profile?address=" + address);
        } catch (error) {
          console.log("Transaction failed:", error);
          setLoading(false);
        }
      }
    } else {
      console.log("Install MetaMask");
    }
  };

  // Custom Input Component with forwardRef
  const CustomInput = React.forwardRef(
    ({ value, onClick, placeholder }, ref) => (
      <button className="custom-input" onClick={onClick} ref={ref}>
        {value || placeholder}
      </button>
    )
  );

  return (
    <div ref={ref} className="bg-white py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Burn $MING</h2>
        <p className="mt-4 text-lg text-gray-500">
          Burn $MING to your ancestors for blessing, or a past-away celebrity.
          Visit <a href="/hallOfFame">Hall of Fame</a>
        </p>
        <p className="mt-1 text-lg text-gray-500">
          Your current $MING: {balance}
        </p>

        <div className="mt-8">
          <p className="mt-1 text-md font-bold text-black text-left">Name</p>
          <input
            type="text"
            placeholder="George Washington"
            className="mt-2 p-3 block w-full border border-gray-300 rounded-md shadow-sm text-black"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
          />
          <div className="mt-4 block w-full " style={{ display: "flex" }}>
            <div className="">
              <p className="mt-1 text-md font-bold text-black text-left">
                Date of birth
              </p>
              <DatePicker
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black text-left"
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
              />
            </div>
            <div className="ml-6">
              <p className="mt-1 text-md font-bold text-black text-left">
                Date of death
              </p>
              <DatePicker
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black"
                selected={deathDate}
                onChange={(date) => setDeathDate(date)}
              />
            </div>
          </div>

          <p className="mt-4 text-md font-bold text-black text-left">
            Amount to burn
          </p>
          <input
            type="number"
            placeholder="Amount of $MING"
            className="p-3 block w-full border border-gray-300 rounded-md shadow-sm text-black"
            value={mingAmount}
            onChange={(e) => setMingAmount(e.target.value)}
          />
          <WalletConnect
            onBurning={handleBurnClick}
            onWalletConnected={(address, balance) => setBalance(balance)}
            isLoading={loading}
          />
          {/* <button
            className="mt-6 bg-red-600 disabled: hover:bg-red-800 disabled:bg-gray-200 disabled:text-gray-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleBurnClick}
            disabled={loading}
          >
            BURN
          </button> */}
        </div>
      </div>
    </div>
  );
});

/**
 * Your code shows that you are using the forwardRef API in React and assigning it to a constant named Burn.
 * This approach is generally correct, but the error you're encountering suggests that the component might be
 *  missing an explicit display name, which is particularly important when using higher-order components or
 * APIs like forwardRef.
 * To resolve this, you can explicitly set the displayName property on your component.
 * Here's how you can modify your code:
 */
Burn.displayName = "Burn";
export default Burn;
