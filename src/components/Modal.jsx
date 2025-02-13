import React, { useEffect, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import "./Modal.css";

const Modal = ({ modalOpen,modaltype, setModalOpen }) => {
  return (
    <div
      className={`modal-box ${modalOpen ? "show" : ""}`}
      onClick={() => setModalOpen(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
      <RiCloseCircleFill size={30} color="black" className="icon-close" onClick={() => setModalOpen(false)}/>
        <h2>{modaltype === "expense" ? "Add expense" : "Add receive"}</h2>
        <input type="text" placeholder="Discriptions"/>
        <input type="text" placeholder="Amount"/>
        <button>{modaltype === "expense" ? "Add expense" : "Add receive"}</button>
      </div>
    </div>
  );
};

export default Modal;
