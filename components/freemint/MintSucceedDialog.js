import React from "react";
import i18next from "../../app/i18n";
import { Button, Modal } from "flowbite-react";

const MintSucceedDialog = ({ open, amount, handleClose }) => {
  return (
    <Modal onClose={handleClose} show={open} size="md" popup>
      <Modal.Header />
      <Modal.Body>
        <div className="">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {i18next.t("freemint.successful.title")}
          </h3>
          <div className="mt-2">{i18next.t("freemint.successful.body") + amount + " $MING! "}</div>
          <div className="mt-8 text-sm font-bold">
            {i18next.t("freemint.successful.next.title")}
          </div>
          <div className="text-sm">
            {i18next.t("freemint.successful.next.body")}
          </div>
          {/* <div>{i18next.t("freemint.mybalance") + balance}</div> */}

          <div className="w-full flex mt-6">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                window.location.href = "/burn";
                handleClose();
              }}
            >
              {i18next.t("global.burn")}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
              onClick={() => {
                // handleBatchMint();
                window.location.href = "/deaderboard";
                handleClose();
              }}
            >
              {i18next.t("global.visit.deaderboard")}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MintSucceedDialog;
