import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import React, { useState } from "react";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modaltype , setModalType] = useState("");
  const onExpenseClick = ()=>{
    setModalOpen(true);
    setModalType("expense");
  }
  const onReceiveClick = ()=>{
    setModalOpen(true);
    setModalType("receive");
  }

  return (
    <>
      <div className="App">
        <Header />
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} modaltype={modaltype} />
        <div className="content">
          <div className="boxes">
            <div className="box-expense" onClick={onExpenseClick}>
              <GiPayMoney size={100} color="red" />
              Expense
            </div>
            <div className="box-receive" onClick={onReceiveClick}>
              <GiReceiveMoney size={100} color="green" />
              Receive
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
