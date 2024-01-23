import React from "react";

import { Spinner, Modal } from "flowbite-react";

const LoadingDialog = ({ content, open, handleClose }) => {
  return (
    <Modal onClose={handleClose} show={open} size="md" popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <Spinner />
          <div className="mt-4">{content}</div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingDialog;
