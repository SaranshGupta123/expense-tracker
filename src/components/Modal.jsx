import React, { useEffect, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import "./Modal.css";

const Modal = ({
  modalOpen,
  modaltype,
  setModalOpen,
  receivehandler,
  Expensehandler,
}) => {
  const [Discriptions, setDiscriptions] = useState("");
  const [Amount, setAmount] = useState("");
  const Buttonclick = () => {
    if (!Discriptions || !Amount) {
      return;
    }
    if(modaltype==="expense"){
      Expensehandler(Discriptions , Amount);
    }
    if(modaltype==="receive"){
      receivehandler(Discriptions , Amount);
    }
    setModalOpen(false)
  };
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Allow scrolling
    }

    // Cleanup function to reset overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen]);
  return (
    <div
      className={`modal-box ${modalOpen ? "show" : ""}`}
      onClick={() => setModalOpen(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <RiCloseCircleFill
          size={30}
          color="black"
          className="icon-close"
          onClick={() => setModalOpen(false)}
        />
        <h2>{modaltype === "expense" ? "Add expense" : "Add receive"}</h2>
        <input
          type="text"
          placeholder="Discriptions"
          value={Discriptions}
          onChange={(e) => setDiscriptions(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={Buttonclick}>
          {modaltype === "expense" ? "Add expense" : "Add receive"}
        </button>
      </div>
    </div>
  );
};

export default Modal;
