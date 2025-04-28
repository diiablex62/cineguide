import React from "react";

const ModalPassword = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.50)" }}
    >
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        {children}
      </div>
    </div>
  );
};

export default ModalPassword;
