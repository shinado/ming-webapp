"use client";

import { useEffect, useState } from "react";
import { useStatus } from "../../app/WalletStatus"; // adjust the path as needed
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import "../../app/globals.css";
import { getDisplayableValueFromContract } from "@/app/public_api";
import i18next from "../../app/i18n";
import i18n from "i18next";

function displayAddress(addr) {
  if (addr.length >= 10) {
    return addr.substring(0, 5) + "..." + addr.substring(addr.length - 5);
  } else {
    return addr;
  }
}

function handleAccountsChanged(accounts) {
  checkStatus();
}

function disconnect() {
  // If you're using a provider like MetaMask, you can reset it
  if (window.ethereum) {
    window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    window.ethereum = null;
  }
}

export default function Navigation({ selected }) {
  console.log("selected: ", selected);
  const { connecting, status, checkStatus, connectWallet } = useStatus();
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setAddress(displayAddress(status.address));
    setBalance(getDisplayableValueFromContract(status.balance));
  }, [status.balance, status.address]);

  const dropdown = (
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline
        label={<Avatar alt="User settings" img="/icon_avatar.png" rounded />}
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
      className="flex md:order-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
      {address ? dropdown : button}
      <Navbar.Collapse>
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
