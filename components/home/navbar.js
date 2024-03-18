"use client";

import { useEffect, useState } from "react";
import { useStatus } from "../../app/WalletStatus"; 
import { Button, Avatar, Dropdown, Navbar } from "flowbite-react";
import "../../app/globals.css";
import { getDisplayableValueFromContract } from "@/app/public_api";
import i18next from "../../app/i18n";
import i18n from "i18next";

function displayAddress(addr) {
  if (addr.length >= 10) {
    return addr.substring(0, 4) + "..." + addr.substring(addr.length - 4);
  } else {
    return addr;
  }
}

export default function Navigation({ selected}) {
  console.log("selected: ", selected);
  const { connecting, status, checkStatus, connectWallet, disconnect, chain, changeChain} = useStatus();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setAddress(displayAddress(status.address));
    setBalance(getDisplayableValueFromContract(status.balance));
  }, [status.balance, status.address]);

  const handleChainSelection = (chain) => () => {
    changeChain(chain);
    // onChainSelected(chain);
  };

  const trigger = (
    <div className="flex cursor-pointer">
      <img
        src="/ic_wallet.png"
        className="w-5 h-5" // Adjust size as needed
      />
    </div>
  );

  const chainSelection = (
    <div className="mr-4">
      <Dropdown
        dismissOnClick={true}
        renderTrigger={() => (
          <div className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded">
            <img
              src={`/logo_${chain}.png`}
              alt="Edit"
              className="w-5 h-5" // Adjust size as needed
            />
            <img
              src={`/ic_dropdown.png`}
              alt="Edit"
              className="ml-2 w-4 h-4" // Adjust size as needed
            />
          </div>
        )}
      >
        <Dropdown.Item onClick={handleChainSelection("eth")}>
          <div className="flex items-center">
            <img src="/logo_eth.png" className="w-5 h-5" />
            <span className="ml-2 block text-sm font-bold">Ethereum</span>
          </div>
        </Dropdown.Item>
        <Dropdown.Item onClick={handleChainSelection("btc")}>
          <div className="flex items-center">
            <img src="/logo_btc.png" className="w-5 h-5" />
            <span className="ml-2 block text-sm font-bold">Bitcoin</span>
          </div>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );


  const dropdown = (
    <div>
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Button outline gradientDuoTone="cyanToBlue" size="xs">
            {address}
          </Button>
        }
      >
        <Dropdown.Header>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/ic_wallet.png"
                alt="Edit"
                className="w-4 h-4" // Adjust size as needed
              />
              <span className="ml-2 block text-sm font-bold">
                {i18next.t("nav.address")}
              </span>
            </div>
            <span className="block truncate-text text-sm font-medium ml-4">
              {address}
            </span>
          </div>

          <div className="mt-2 flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="/ic_balance.png"
                alt="Edit"
                className="w-4 h-4" // Adjust size as needed
              />
              <span className="ml-2 block text-sm font-bold">
                {i18next.t("nav.balance")}
              </span>
            </div>
            <span className="block truncate text-sm font-medium ml-4">
              {balance}
            </span>
          </div>
        </Dropdown.Header>

        <Dropdown.Item
          className="flex justify-between items-center"
          onClick={() => {
            window.location.href = "/history";
          }}
        >
          <div className="flex items-center">
            <img
              src="/ic_history.png"
              alt="Edit"
              className="w-4 h-4" // Adjust size as needed
            />
            <span className="ml-2 block text-sm font-bold">
              {i18next.t("nav.history")}
            </span>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          className="flex justify-between items-center"
          onClick={() => {
            window.location.href = "/freemint";
          }}
        >
          <div className="flex items-center">
            <img
              src="/ic_mint.png"
              alt="Edit"
              className="w-4 h-4" // Adjust size as needed
            />
            <span className="ml-2 block text-sm font-bold">
              {i18next.t("nav.min")}
            </span>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          className="flex justify-between items-center"
          onClick={() => {
            setLanguage("zh");
            i18n.changeLanguage("zh", (err, t) => {
              if (err) console.log("something went wrong loading", err);
              else console.log(t("home.roadmap.title"));
            });
          }}
        >
          <div className="flex items-center">
            <img
              src="/ic_lang.png"
              alt="Edit"
              className="w-4 h-4" // Adjust size as needed
            />
            <span className="ml-2 block text-sm font-bold">
              {i18next.t("nav.language")}
            </span>
          </div>
          <span className="block truncate-text text-sm font-medium ml-4">
            {language}
          </span>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          className="flex justify-between items-center"
          onClick={() => {
            disconnect();
          }}
        >
          <div className="flex items-center">
            <img
              src="/ic_logout.png"
              alt="Edit"
              className="w-4 h-4" // Adjust size as needed
            />
            <span className="ml-2 block text-sm font-bold">Disconnect</span>
          </div>
        </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
  );

  const button = (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={connectWallet}
      disabled={connecting}
    >
      {connecting
        ? i18next.t("home.button.connecting")
        : i18next.t("home.button.connect")}
    </button>
  );

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img src="/icon_qin.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          {i18next.t("nav.title")}
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 items-center">
        {chainSelection}
        {address ? dropdown : button}
      </div>
      <Navbar.Collapse className="md:flex hidden">
        <Navbar.Link href="/" active={selected == "home"}>
          {i18next.t("nav.home")}
        </Navbar.Link>

        <Navbar.Link href="/burn" active={selected == "burn"}>
          {i18next.t("nav.burn")}
        </Navbar.Link>
        <Navbar.Link href="/deaderboard" active={selected == "deaderboard"}>
          {i18next.t("nav.deaderboard")}
        </Navbar.Link>
        <Navbar.Link href="/blog" active={selected == "blog"}>
          {i18next.t("nav.blog")}
        </Navbar.Link>
        <Navbar.Link href="/freemint" active={selected == "freemint"}>
          {i18next.t("nav.mint")}
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
