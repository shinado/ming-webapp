import React from "react";

import { Spinner, Modal } from "flowbite-react";

const LoadingDialog = ({ content, open }) => {
  return (
    <Modal show={open} size="md" popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <Spinner />
          <div>{content}</div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingDialog;
